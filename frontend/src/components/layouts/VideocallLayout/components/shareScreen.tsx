import React, { useRef, useEffect } from "react";
import { useScreenShare } from "../../../../store/videoCall/useScreenShare";

export const SharedScreen: React.FC = () => {
  const { screenStream, error } = useScreenShare();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (screenStream && videoRef.current) {
      videoRef.current.srcObject = screenStream;
      videoRef.current.play().catch((err) => {
        console.error("Error al intentar reproducir el video:", err);
      });
    }
  }, [screenStream]);

  return (
    <div className="w-full h-full">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {screenStream ? (
        <div className="w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ) : (
        <p className="text-white">
          Texto de prueba que te informa que no se está compartiendo nada
        </p>
      )}
    </div>
  );
};
