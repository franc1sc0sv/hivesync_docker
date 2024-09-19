export const LOCAL_STORAGE_KEY = 'initialMicrophoneState';

export const INITIAL_MICROPHONE_STATE = (() => {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedState !== null ? JSON.parse(storedState) : false;
})();

export const USER_STATUS_PROFILE = {
    CONNECTED: "Conectado",
    DISCONNECTED: "Desconectado"
  };