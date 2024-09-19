import React, { useState } from 'react';
import { OpenAI } from 'openai';
// import { Send, Smile, Bot } from 'lucide-react';
import { SendIcon } from '../../../components/Icons/send';
import { GoDependabot } from "react-icons/go";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { GoBackTriangle } from '../../../components/Icons/goBackTriangle';
import { useNavigate } from 'react-router-dom';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY ?? '',
  dangerouslyAllowBrowser: true,
});
interface Message {
  id: number;
  text: string;
  sent: boolean;
}
export const AIPage: React.FC = () => {

  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const fetchAIResponse = async (userMessage: string): Promise<string> => {
    const safeMessage = userMessage ?? '';
    let retries = 5;
    let delay = 2000;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [{ role: 'user', content: safeMessage }],
          max_tokens: 100,
        });
        return response.choices[0].message.content ?? 'No se recibió una respuesta adecuada de la IA.';
      } catch (error: any) {
        if (error.response && error.response.status === 429) {
          console.warn(`Límite de tasa alcanzado en el intento ${attempt}. Reintentando en ${delay / 1000} segundos...`);
          const jitter = Math.random() * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay + jitter));
          delay *= 2;
        } else {
          console.error('Error al obtener la respuesta de OpenAI:', error);
          return 'Lo siento, no puedo responder en este momento.';
        }
      }
    }
    return 'Lo siento, no puedo responder en este momento después de varios intentos.';
  };
  const handleSendMessage = async (newMessage: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: newMessage, sent: true }
    ]);
    setIsTyping(true);
    const aiResponse = await fetchAIResponse(newMessage);
    setIsTyping(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: aiResponse, sent: false }
    ]);
  };
  const MessageBubble: React.FC<{ message: string; isSent: boolean }> = ({ message, isSent }) => (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`rounded-lg text-start px-4 py-2 max-w-[70%] ${isSent ? 'bg-[#45156B] text-white' : 'bg-[#28242C] text-gray-200'
          }`}
      >
        {message}
      </div>
    </div>
  );
  const TypingIndicator: React.FC = () => (
    <div className="text-gray-400 text-sm text-start italic mb-2w">Escribiendo...</div>
  );
  const InputField: React.FC<{ onSendMessage: (message: string) => void }> = ({ onSendMessage }) => {
    const [message, setMessage] = useState<string>('');
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message);
        setMessage('');
      }
    };
    return (
      <form onSubmit={handleSubmit} className="flex items-center bg-[#28242C] rounded-lg p-2">
        <button type="button" className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
          <FaRegFaceSmileWink className="w-6 h-6" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-grow bg-transparent text-white placeholder-gray-500 outline-none mx-3"
        />
        <button
          type="submit"
          className="bg-[#45156B] text-white rounded-full p-2 hover:bg-opacity-80 transition-colors duration-200"
        >
          <SendIcon size={15} color='#fff' />
        </button>
      </form>
    );
  };

  
  // const Header: React.FC = () => 
  //   <div className="bg-[#28242C] p-4 flex items-center justify-between shadow-md">
  //     <div className="flex items-center gap-2">
  //       <GoDependabot className="w-8 h-8 text-light_purple mr-2" />
  //       <h1 className="text-xl font-bold text-white">ChatGPT</h1>
  //     </div>
  //     <div className="bg-[#28242C] px-3 py-1 rounded-full text-sm text-gray-300">
  //       En línea
  //     </div>
  //   </div>
  
  return (
    <div className="h-full w-full flex flex-col bg-[#19161D] text-white font-sans">
      {/* <Header /> */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message.text} isSent={message.sent} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
      <div className="p-4">
        <InputField onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};