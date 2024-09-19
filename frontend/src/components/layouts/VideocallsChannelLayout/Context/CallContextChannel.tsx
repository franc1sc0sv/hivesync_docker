import React, { createContext, useState, useEffect, useRef } from "react";
import Peer, { MediaConnection } from "peerjs";
import { useSession } from "../../../../store/user";
import { useSocketContext } from "../../../../context/useSocket";
import { useFetchID } from "../../../../hooks/useFecthID";
import { get_call_data } from "../../../../api/calls";
import { LoadingPage } from "../../../routes/loadingPage";
import { useAudioDetection } from "../../../../hooks/useAudioDetection";
import { useChannelList } from "../../ServerLayout/hooks/useChannelList";

enum CallStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  ENDED = "ENDED",
}

type Call = {
  id: string;
  roomId: string;
  status: CallStatus;
  startedAt: Date;
  participants: Participant[];
  creator_id: string;
} | null;

type Participant = {
  id: string;
  userId: string;
  callId: string;
  isMicrofoneActive: boolean;
  IsCameraActive: boolean;
  joinedAt: Date;
  user: UserInfo;
};

interface CallContextType {
  callId: string | null;
  status: Call;

  mediaStream: MediaStream | null;

  startCall: (roomId: string) => void;
  acceptCall: () => void;
  endCall: () => void;

  toggleAudio: () => void;
  toggleVideo: () => void;

  localVideoRef: React.RefObject<HTMLVideoElement>;

  isMicrophoneActive: boolean;
  isCameraActive: boolean;
  isTalking: boolean;

  CallParticipants: CallParticipantsParams[];
}

type InputData = {
  IsCameraActive: boolean;
  isMicrofoneActive: boolean;
  userId: string;
  roomId: string;
  callId?: string;
};

export type CallParticipantsParams = {
  userId: string;
  user: UserInfo;
  callControls: {
    IsCameraActive: boolean;
    isMicrofoneActive: boolean;
  };
  isUserTalking: boolean;
  videoRef: React.RefObject<HTMLVideoElement> | null;
  mediaStream: MediaStream | null;
};

export const CallContext = createContext<CallContextType | undefined>(
  undefined
);

const formatParticipants = (
  participants: Participant[]
): CallParticipantsParams[] => {
  return participants.map((participant) => ({
    userId: participant.userId,
    callControls: {
      IsCameraActive: participant.IsCameraActive,
      isMicrofoneActive: participant.isMicrofoneActive,
    },
    user: participant.user,
    isUserTalking: false,
    videoRef: null,
    mediaStream: null,
  }));
};

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { fecthData, isLoading } = useFetchID({ api_function: get_call_data });
  const { user } = useSession();
  const { actualChannel } = useChannelList();
  const { socket } = useSocketContext();

  // variables
  const user_id = user?.id as string;
  const url = import.meta.env.VITE_PEER;

  // Call Data
  const [callId] = useState<string>(actualChannel?.id as string);
  const [status, setStatus] = useState<Call>(null);
  const [peer, setPeer] = useState<Peer | null>(null);

  // External users params
  const [CallParticipants, setCallParticipants] = useState<
    CallParticipantsParams[]
  >([]);

  //Media Streams
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  //Calls Controls
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  //Video ref
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  // Talking user status
  const [isTalking, setIsTalking] = useState(false);
  const isUserTalking = useAudioDetection(mediaStream);

  // Voice activation user
  useEffect(() => {
    if (isUserTalking) {
      setIsTalking(true);
    } else {
      setIsTalking(false);
    }
  }, [isUserTalking]);

  // Media stream local user
  useEffect(() => {
    const initMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setMediaStream(stream);
      } catch (err) {
        console.error("Error accessing camera/microphone:", err);
      }
    };

    initMediaStream();
  }, []);

  // fetch de la llamada actual
  useEffect(() => {
    const fetcher = async () => {
      const data = await fecthData(callId);
      setStatus(data);
    };
    fetcher();
  }, [socket]);

  // logica para aceptar o crear la llamada
  useEffect(() => {
    if (!callId) return;

    if (Object.keys(status ?? {}).length === 0) {
      startCall();
      return;
    }

    if (status?.status === CallStatus.ENDED) {
      startCall();
      return;
    }

    acceptCall();
  }, [callId, user_id, mediaStream]);

  //peer to peer conection
  useEffect(() => {
    const peerInstance = new Peer(user_id, {
      host: url,
      port: 9001,
      path: "/peerjs/myapp",
    });

    peerInstance.on("open", (id) => {
      console.log("Peer ID:", id);
      setPeer(peerInstance);
    });

    peerInstance.on("error", (error) => {
      console.error(error.message);
      console.error(error.stack);
      console.error(error.type);
    });

    return () => {
      if (peerInstance) {
        peerInstance.destroy();
        console.log("Peer destroyed on cleanup.");
      }
    };
  }, []);

  useEffect(() => {
    if (peer) {
      peer.on("call", (incomingCall: MediaConnection) => {
        console.log("Incoming call from peer:", incomingCall.peer);

        if (mediaStream) {
          incomingCall.answer(mediaStream);

          incomingCall.on("stream", (stream) => {
            console.log("Recibiendo stream remoto:", incomingCall.peer);

            setCallParticipants((prevParticipants) =>
              prevParticipants.map((participant) => {
                if (participant.userId === incomingCall.peer) {
                  return {
                    ...participant,
                    mediaStream: stream,
                    videoRef:
                      participant.videoRef ||
                      React.createRef<HTMLVideoElement>(),
                  };
                }
                return participant;
              })
            );
          });

          incomingCall.on("close", () => {
            console.log("La llamada ha terminado.");
          });

          incomingCall.on("error", (error) => {
            console.error("Error durante la llamada:", error);
          });
        } else {
          console.error(
            "No hay mediaStream disponible para contestar la llamada."
          );
        }
      });
    }

    if (socket) {
      socket.on(
        "new_peer",
        ({ call, newUser }: { call: Call; newUser: string }) => {
          setStatus(call);
          setCallParticipants(
            formatParticipants(call?.participants as Participant[])
          );

          if (!call) return;
          if (peer && mediaStream) {
            call.participants.forEach((participant) => {
              const callConnection = peer.call(participant.userId, mediaStream);

              if (callConnection) {
                callConnection.on("stream", (remoteStream) => {
                  console.log(
                    "Recibiendo stream remoto del nuevo peer:",
                    remoteStream
                  );

                  // Añadir el stream remoto a la lista de participantes
                  setCallParticipants((prevParticipants) =>
                    prevParticipants.map((participant) => {
                      if (participant.userId === newUser) {
                        return {
                          ...participant,
                          mediaStream: remoteStream,
                          videoRef:
                            participant.videoRef ||
                            React.createRef<HTMLVideoElement>(),
                        };
                      }
                      return participant;
                    })
                  );
                });

                callConnection.on("error", (err) => {
                  console.error("Error en la llamada:", err);
                });
              }
            });
          }
        }
      );

      socket.on("peer_left", ({ call }) => {
        setStatus(call);
        setCallParticipants(
          formatParticipants(call?.participants as Participant[])
        );
      });

      socket.on(
        "newUsersParams",
        ({ participant }: { participant: Participant }) => {
          setCallParticipants((prev) => {
            return prev.map((oldParticipant) => {
              return oldParticipant.userId === participant.userId
                ? {
                    ...oldParticipant,
                    callControls: {
                      IsCameraActive: participant.IsCameraActive,
                      isMicrofoneActive: participant.isMicrofoneActive,
                    },
                  }
                : oldParticipant;
            });
          });
        }
      );
    }
  }, [socket, peer, mediaStream]);

  // update call controlls params

  useEffect(() => {
    if (socket && status?.id) {
      const data: InputData = {
        IsCameraActive: isCameraActive,
        isMicrofoneActive: isMicrophoneActive,
        roomId: callId,
        userId: user_id,
        callId: status.id,
      };

      socket.emit("updateParams", { data });
    }
  }, [isMicrophoneActive, isCameraActive]);

  const startCall = async () => {
    if (!mediaStream || !callId || !socket) return;

    const data: InputData = {
      IsCameraActive: isCameraActive,
      isMicrofoneActive: isMicrophoneActive,
      roomId: callId,
      userId: user_id,
    };

    socket.emit("joinCall", { data, source: "CREATE" }, (response: any) => {
      setStatus(response.call);
      setCallParticipants(
        formatParticipants(response.call?.participants as Participant[])
      );
    });
  };

  const acceptCall = () => {
    if (!mediaStream || !callId || !socket) return;

    const data: InputData = {
      IsCameraActive: isCameraActive,
      isMicrofoneActive: isMicrophoneActive,
      roomId: callId,
      userId: user_id,
    };

    socket.emit(
      "joinCall",
      {
        data,
        source: "ANSWER",
      },
      (response: any) => {
        try {
          setStatus(response.call);
          setCallParticipants(formatParticipants(response.call.participants));
        } catch (error) {
          console.log(error);
        }
      }
    );
  };

  const endCall = () => {
    if (peer && mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setStatus(null);

      if (peer) {
        peer.destroy();
        console.log("Peer destroyed on endCall.");
        setPeer(null);
      }

      if (socket && callId) {
        socket.emit(
          "leaveCall",
          { roomId: callId, userId: user_id },
          (response: any) => {
            setStatus(response.call);
            setCallParticipants(formatParticipants(response.call.participants));
          }
        );
      }
    }
  };

  const toggleAudio = () => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      if (audioTracks.length > 0) {
        const audioTrack = audioTracks[0];
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicrophoneActive(audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      if (videoTracks.length > 0) {
        const videoTrack = videoTracks[0];
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraActive(videoTrack.enabled);
      }
    }
  };

  useEffect(() => {
    if (mediaStream && localVideoRef.current) {
      const videoTracks = mediaStream.getVideoTracks();

      if (videoTracks.length > 0) {
        localVideoRef.current.srcObject = new MediaStream([videoTracks[0]]);
      }
    }
  }, [mediaStream, isCameraActive]);

  // Manejo de video remoto cuando el stream cambia
  useEffect(() => {
    CallParticipants.forEach((participant) => {
      if (participant.mediaStream && participant.videoRef?.current) {
        const videoTracks = participant.mediaStream.getVideoTracks();
        const audioTracks = participant.mediaStream.getAudioTracks();

        if (videoTracks.length > 0 && audioTracks.length > 0) {
          participant.videoRef.current.srcObject = new MediaStream([
            videoTracks[0],
            audioTracks[0],
          ]);
        }
      }
    });
  }, [CallParticipants]);

  if (isLoading) return <LoadingPage />;

  const value = {
    callId,
    status,
    mediaStream,

    startCall,
    acceptCall,
    endCall,

    toggleAudio,
    toggleVideo,

    localVideoRef,

    isMicrophoneActive,
    isCameraActive,
    isTalking,

    CallParticipants,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};
