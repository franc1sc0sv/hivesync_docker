import React, { useState } from 'react';
import { requestPasswordReset } from '../../../api/resetPassword'; 
import { GoBackTriangle } from '../../../components/Icons/goBackTriangle';
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate

export const RecoverPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();  // Usa el hook useNavigate para la navegación

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            await requestPasswordReset({ email });
            setMessage('Correo de restablecimiento enviado');
        } catch (err) {
            setError('Error al solicitar el restablecimiento de contraseña. Intenta de nuevo.');
        }
    };

    const handleGoBack = () => {
        navigate('/');  // Navega a la página principal
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{
            background: 'linear-gradient(to bottom, #000000, #19161D, #2E2934)'
        }}>
            <div 
                className="absolute top-4 left-4 cursor-pointer" 
                onClick={handleGoBack}  // Añade el evento de clic para navegar
            >
                <GoBackTriangle size={40} color='#fff' />
            </div>

            <div className="w-full max-w-md mx-4 sm:mx-8 lg:max-w-lg bg-[#19161D] p-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        Restablecer Contraseña
                    </h1>
                    <div className="bg-[#45156B] h-1 w-16 mx-auto rounded-full"></div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-white text-sm text-center">{error}</p>}
                    {message && <p className="text-white text-sm text-center">{message}</p>}
                    <div className="relative">
                        <label htmlFor="email" className="text-white text-sm mb-1 block">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-4 text-white bg-[#2E2934] border-none rounded-md focus:ring-2 focus:ring-[#45156B] placeholder-gray-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full py-4 text-white bg-[#45156B] rounded-md hover:bg-[#382C6C] transition"
                    >
                        Enviar Correo de Restablecimiento
                    </button>
                </form>
            </div>
        </div>
    );
};
