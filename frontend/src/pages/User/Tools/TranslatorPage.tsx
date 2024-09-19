import { useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoBackTriangle } from '../../../components/Icons/goBackTriangle';

export const TranslatorPage: React.FC = () => {

  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('es');
  const [targetLang, setTargetLang] = useState('en');

  const navigate = useNavigate();

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      alert('Por favor, ingresa algún texto para traducir.');
      return;
    }

    const data = {
      q: sourceText,
      source: sourceLang,
      target: targetLang,
      format: 'text',
    };

    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        null,
        {
          params: {
            q: sourceText,
            source: sourceLang,
            target: targetLang,
            format: 'text',
            key: API_KEY
          }
        }
      );

      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error al realizar la traducción:', error);
      alert('Hubo un error al traducir el texto. Inténtalo de nuevo más tarde.');
    }
  };


  return (
    <div className="min-h-screen flex flex-col  justify-center items-center bg-overlay_1">
      {/* Este div estará en la parte superior hasta que haya scroll */}
      <div className='w-full flex flex-row justify-between items-center  absolute top-0 p-2'>
        <div onClick={() => navigate(-1)}>
          <GoBackTriangle size={40} color='#fff' />

        </div>
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-[#28242C] rounded-2xl shadow-lg mt-6">
        <h1 className="text-2xl font-bold text-center text-[#FFFFFE]">Traductor</h1>

        <div className="flex justify-between space-x-4">
          <TextField
            select
            label="Texto en: "
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            fullWidth
            InputLabelProps={{
              style: { color: '#FFF' },
            }}
            sx={{
              backgroundColor: '#19161D',
              color: '#FFF',
              '& .MuiInputBase-root': {
                color: '#FFFFFE',
              },
              '& .Mui-focused .MuiInputLabel-root': {
                color: '#FFF',
              },
              '& .MuiSvgIcon-root': {
                color: '#FFF',
              },
            }}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">Inglés</MenuItem>
            <MenuItem value="fr">Francés</MenuItem>
          </TextField>

          <TextField
            select
            label="Texto a: "
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            fullWidth
            InputLabelProps={{
              style: { color: '#FFF' },
            }}
            sx={{
              backgroundColor: '#19161D',
              color: '#FFF',
              '& .MuiInputBase-root': {
                color: '#FFFFFE',
              },
              '& .Mui-focused .MuiInputLabel-root': {
                color: '#FFF',
              },
              '& .MuiSvgIcon-root': {
                color: '#FFF',
              },
            }}
          >
            <MenuItem value="es">Español</MenuItem>
            <MenuItem value="en">Inglés</MenuItem>
            <MenuItem value="fr">Francés</MenuItem>
          </TextField>
        </div>

        <textarea
          placeholder="Ingrese el texto a traducir"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          className="min-h-[100px] w-full mt-3 bg-[#19161D] text-[#FFFFFE] border-none rounded-xl placeholder-[#FFFFFE]/50 p-4 resize-none"
        />

        <button
          onClick={handleTranslate}
          className="w-full mt-3 bg-[#45156B] hover:bg-[#9333EA] text-[#FFFFFE] rounded-xl py-2 transition-colors duration-300"
        >
          Traducir
        </button>

        <textarea
          placeholder="Traducción"
          value={translatedText}
          readOnly
          className="min-h-[100px] w-full mt-3 bg-[#19161D] text-[#FFFFFE] border-none rounded-xl placeholder-[#FFFFFE]/50 p-4 resize-none"
        />
      </div>
    </div>

  );
};
