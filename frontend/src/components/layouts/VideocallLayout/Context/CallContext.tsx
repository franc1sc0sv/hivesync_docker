import React, { createContext, useState, useEffect, useRef } from "react";
import Peer, { MediaConnection } from "peerjs";
import { useSession } from "../../../../store/user";
import { useChat } from "../../ChatLayout/Context/useChat";
import { useSocketContext } from "../../../../context/useSocket";
import { useFetchID } from "../../../../hooks/useFecthID";
import { get_call_data } from "../../../../api/calls";
import { LoadingPage } from "../../../routes/loadingPage";
import { useAudioDetection } from "../../../../hooks/useAudioDetection";

enum CallStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
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
};

interface CallContextType {
  callId: string | null;
  status: Call;

  mediaStream: MediaStream | null;
  remoteStream: MediaStream | null;

  screenStream: MediaStream | null;
  remoteScreenStream: MediaStream | null;

  startCall: (roomId: string) => void;
  acceptCall: () => void;
  endCall: () => void;

  toggleAudio: () => void;
  toggleVideo: () => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;

  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  localScreenRef: React.RefObject<HTMLVideoElement>;
  remoteScreenRef: React.RefObject<HTMLVideoElement>;

  isMicrophoneActive: boolean;
  isCameraActive: boolean;
  isShareScreenActive: boolean;

  friend: UserInfoChat;

  isTalking: boolean;
  isTalkingRemote: boolean;

  isCameraActiveRemote: boolean;
  isMicrophoneActiveRemote: boolean;
  isUserTalkingRemote: boolean;
}

type InputData = {
  IsCameraActive: boolean;
  isMicrofoneActive: boolean;
  userId: string;
  roomId: string;
  callId?: string;
};

export const CallContext = createContext<CallContextType | undefined>(
  undefined
);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [remoteScreenStream, _] = useState<MediaStream | null>(null);

  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isShareScreenActive, setIsShareScreenActive] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localScreenRef = useRef<HTMLVideoElement | null>(null);
  const remoteScreenRef = useRef<HTMLVideoElement | null>(null);

  const [peer, setPeer] = useState<Peer | null>(null);

  const { friend } = useChat();
  const { user } = useSession();

  const [callId] = useState<string>(friend.id_friendship);
  const [friend_id] = useState<string>(friend.id_user);
  const [status, setStatus] = useState<Call>(null);

  const user_id = user?.id as string;

  const { socket } = useSocketContext();

  const { fecthData, isLoading } = useFetchID({ api_function: get_call_data });

  const [isTalking, setIsTalking] = useState(false);
  const [isTalkingRemote, setIsTalkingRemote] = useState(false);

  const isUserTalking = useAudioDetection(mediaStream);
  const isUserTalkingRemote = useAudioDetection(remoteStream);

  // const [isUserTalkingRemote, setisUserTalkingRemote]

  const [isCameraActiveRemote, setIsCameraActiveRemote] =
    useState<boolean>(false);

  const [isMicrophoneActiveRemote, setIsMicrophoneActiveRemote] =
    useState<boolean>(false);

  const url = import.meta.env.VITE_PEER;

  useEffect(() => {
    if (isUserTalking) {
      setIsTalking(true);
    } else {
      setIsTalking(false);
    }

    if (isUserTalkingRemote) {
      setIsTalkingRemote(true);
    } else {
      setIsTalkingRemote(false);
    }
  }, [isUserTalking, isUserTalkingRemote]);

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

  useEffect(() => {
    const fetcher = async () => {
      const data = await fecthData(callId);
      setStatus(data);
    };
    fetcher();
  }, [socket]);

  useEffect(() => {
    if (!callId) return;

    if (
      status?.status === CallStatus.PENDING &&
      status.participants[0].userId !== user_id
    ) {
      acceptCall();
      return;
    }

    startCall();
  }, [callId, user_id, mediaStream]);

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
            console.log("Recibiendo stream remoto:", stream);
            setRemoteStream(stream);
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
      socket.on("new_peer", ({ call }: { call: Call }) => {
        setStatus(call);

        if (!call) return;
        if (peer && mediaStream) {
          const callConnection = peer.call(friend_id, mediaStream);

          if (callConnection) {
            callConnection.on("stream", (remoteStream) => {
              setRemoteStream(remoteStream);
            });

            callConnection.on("error", (err) => {
              console.error("Error en la llamada:", err);
            });
          }
        }
      });

      socket.on("peer_left", ({ call }) => {
        setStatus(call);
      });

      socket.on(
        "newUsersParams",
        ({ participant }: { participant: Participant }) => {
          setIsCameraActiveRemote(participant.IsCameraActive);
          setIsMicrophoneActiveRemote(participant.isMicrofoneActive);
        }
      );
    }
  }, [socket, peer, mediaStream]);

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
        setStatus(response.call);
      }
    );
  };

  const endCall = () => {
    if (peer && mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      setRemoteStream(null);
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

  const startScreenShare = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      setScreenStream(displayStream);
      setIsShareScreenActive(true);

      displayStream.getTracks().forEach((track) => {
        track.onended = () => {
          setScreenStream(null);
          setIsShareScreenActive(false);
        };
      });
    } catch (err) {
      console.error("Error al intentar compartir la pantalla:", err);
      setScreenStream(null);
      setIsShareScreenActive(false);
    }
  };

  const stopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }
    setScreenStream(null);
    setIsShareScreenActive(false);
  };

  useEffect(() => {
    if (mediaStream && localVideoRef.current) {
      const videoTracks = mediaStream.getVideoTracks();

      if (videoTracks.length > 0) {
        localVideoRef.current.srcObject = new MediaStream([videoTracks[0]]);
      }
    }
  }, [mediaStream, isCameraActive]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      const videoTracks = remoteStream.getVideoTracks();
      const audioTracks = remoteStream.getAudioTracks();

      if (videoTracks.length > 0 && audioTracks.length > 0) {
        remoteVideoRef.current.srcObject = new MediaStream([
          videoTracks[0],
          audioTracks[0],
        ]);
      }
    }
  }, [remoteStream, isCameraActiveRemote]);

  useEffect(() => {
    if (screenStream && localScreenRef.current) {
      localScreenRef.current.srcObject = screenStream;
    }
  }, [screenStream]);

  useEffect(() => {
    if (remoteScreenStream && remoteScreenRef.current) {
      remoteScreenRef.current.srcObject = remoteScreenStream;
    }
  }, [remoteScreenStream]);

  if (isLoading) return <LoadingPage />;

  const value = {
    callId,
    status,
    mediaStream,
    remoteStream,
    screenStream,
    remoteScreenStream,
    startCall,
    acceptCall,
    endCall,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    localVideoRef,
    remoteVideoRef,
    localScreenRef,
    remoteScreenRef,
    isMicrophoneActive,
    isCameraActive,
    isShareScreenActive,
    friend,
    isTalking,
    isTalkingRemote,
    isMicrophoneActiveRemote,
    isCameraActiveRemote,
    isUserTalkingRemote,
  };

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
};
