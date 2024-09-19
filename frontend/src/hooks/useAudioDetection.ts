import { useEffect, useRef, useState } from "react";

export const useAudioDetection = (mediaStream: MediaStream | null) => {
  const [isTalking, setIsTalking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (mediaStream && !audioContextRef.current) {
      // Crear el contexto de audio
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      // Crear una fuente de audio del stream del micrófono
      const audioSource = audioContext.createMediaStreamSource(mediaStream);

      // Crear un nodo Analyser para analizar los niveles de audio
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512; // Tamaño del Fast Fourier Transform para obtener la frecuencia
      analyserRef.current = analyser;

      // Conectar la fuente al AnalyserNode
      audioSource.connect(analyser);

      // Crear un array para almacenar los datos de frecuencia
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      dataArrayRef.current = dataArray;

      // Función para analizar el nivel de audio
      const checkAudioLevel = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        // Sumar los valores de la frecuencia para determinar la amplitud
        const sum = dataArrayRef.current.reduce((acc, val) => acc + val, 0);
        const average = sum / dataArrayRef.current.length;

        // Determinar si el usuario está hablando con un umbral de volumen
        const threshold = 10; // Ajusta este valor según sea necesario
        if (average > threshold) {
          setIsTalking(true);
        } else {
          setIsTalking(false);
        }

        requestAnimationFrame(checkAudioLevel);
      };

      // Iniciar el monitoreo
      checkAudioLevel();
    }

    return () => {
      // Cerrar el contexto de audio al desmontar el componente
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [mediaStream]);

  return isTalking;
};
