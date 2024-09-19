import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

interface SocketContextProviderProps {
  children: ReactNode;
  namespace: string;
}

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
  namespace,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const url = import.meta.env.VITE_SOCKET + `${namespace}`;
  useEffect(() => {
    const socketInstance = io(url);
    setSocket(socketInstance);
  }, []);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
