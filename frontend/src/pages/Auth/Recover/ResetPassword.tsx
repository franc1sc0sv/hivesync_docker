import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../../api/resetPassword'; // La función que interactúa con el backend
import { RiEyeCloseLine, RiEyeLine, RiArrowRightSLine } from 'react-icons/ri';

import { GoBackTriangle } from '../../../components/Icons/goBackTriangle';
import { useNavigate } from 'react-router-dom';

export const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Token no válido o inexistente.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('Token no válido.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await resetPassword(token, newPassword);
      setSuccess('Contraseña restablecida con éxito.');
      setError(null);
    } catch (error) {
      setError('Error al restablecer la contraseña. Intenta de nuevo.');
      setSuccess(null);
    }
  };

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const iconStyles = "absolute right-3 top-1/2 text-xl cursor-pointer text-white transform -translate-y-[30%]";

  const handleGoBack = () => {
    navigate('/login');  // Navega a la página principal
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'linear-gradient(to bottom, #000000, #19161D, #2E2934)' }}>
      <div
        className="absolute top-4 left-4 cursor-pointer"
        onClick={handleGoBack}  // Añade el evento de clic para navegar
      >
        <GoBackTriangle size={40} color='#fff' />
      </div>
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-[#19161D] p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Restablecer Contraseña
          </h1>
          <div className="bg-[#45156B] h-1 w-16 mx-auto rounded-full"></div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-white bg-red-500 p-3 rounded-md text-sm">{error}</p>}
          {success && <p className="text-white bg-green-500 p-3 rounded-md text-sm">{success}</p>}
          <div className="relative">
            <label className="text-white text-sm mb-1 block">Nueva Contraseña</label>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Su contraseña"
              className="w-full p-4 text-white bg-[#2E2934] border-none rounded-md focus:ring-2 focus:ring-[#45156B] placeholder-gray-400"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {showNewPassword ? (
              <RiEyeLine size={24} className={iconStyles} onClick={toggleNewPasswordVisibility} />
            ) : (
              <RiEyeCloseLine size={24} className={iconStyles} onClick={toggleNewPasswordVisibility} />
            )}
          </div>
          <div className="relative">
            <label className="text-white text-sm mb-1 block">Confirmar Contraseña</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme su contraseña"
              className="w-full p-4 text-white bg-[#2E2934] border-none rounded-md focus:ring-2 focus:ring-[#45156B] placeholder-gray-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {showConfirmPassword ? (
              <RiEyeLine size={24} className={iconStyles} onClick={toggleConfirmPasswordVisibility} />
            ) : (
              <RiEyeCloseLine size={24} className={iconStyles} onClick={toggleConfirmPasswordVisibility} />
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full py-4 text-white bg-[#45156B] rounded-md hover:bg-[#382C6C] transition"
          >
            Restablecer Contraseña
            <RiArrowRightSLine size={24} className="ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};
