import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TiMessages, TiGroup, TiThList, TiWorld, TiClipboard, TiTick } from 'react-icons/ti';

const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  },
  float: {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  }
}

interface TypewriterProps {
  text: string;
  delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [text, delay, currentIndex]);

  return <span>{displayText}</span>;
}

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    { src: "/Screenshot1.png", text: "Chat en tiempo real" },
    { src: "/Screenshot2.png", text: "Gestión de notificaciones" },
    { src: "/Screenshot3.png", text: "Creación de grupos personalizados" },
    { src: "/Screenshot4.png", text: "Interfaz intuitiva y fácil de usar" },
    { src: "/Screenshot5.png", text: "Colaboración sin límites" },
    { src: "/Screenshot1.png", text: "Traducción instantánea" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg mt-16">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * (100 / images.length)}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-1/3 flex-shrink-0 p-2 relative">
            <img
              src={image.src}
              alt={`Screenshot ${index + 1}`}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#6B2A8A] text-white p-2 rounded-full"
        onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#6B2A8A] text-white p-2 rounded-full"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
      >
        &#10095;
      </button>
    </div>
  );
}

const CompanyLogos = () => {
  const companies = [
    { name: "Apple", logo: "/apple-logo.png" },
    { name: "Google", logo: "/google.png" },
    { name: "GitHub", logo: "/github.png" },
    { name: "Spotify", logo: "/spotify.png" },
    { name: "NVIDIA", logo: "/nvidia.png" },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8 text-center text-[#fffff]">Elegido por las empresas más reconocidas.</h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {companies.map((company, index) => (
          <motion.img
            key={index}
            src={company.logo}
            alt={`${company.name} logo`}
            className="h-12 w-auto transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-[#2E2934] p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
  >
    <Icon className="mx-auto w-12 h-12 text-light_purple mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export const IndexPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-between text-white overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, #000000, #19161D, #2E2934, #6B2A8A, #2E2934, #000000)`,
      }}
    >
      <header className="flex justify-between items-center py-6 px-8">
        <img src="/hivesyncLogo.png" alt="HiveSync Logo" className="h-8 w-auto sm:h-10 lg:h-12" />
        <div className="flex space-x-4">
          <Link to="/login">
            <motion.button
              {...animations.scale}
              className="px-4 py-2 sm:px-6 sm:py-2 border-2 border-light_purple rounded-full text-xs sm:text-sm font-medium hover:bg-light_purple transition-colors"
            >
              Iniciar sesión
            </motion.button>
          </Link>
          <Link to="signup">
            <motion.button
              {...animations.scale}
              className="px-4 py-2 sm:px-6 sm:py-2 bg-light_purple rounded-full text-xs sm:text-sm font-medium hover:bg-light_purple transition-colors"
            >
              Empieza ahora
            </motion.button>
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
          initial="initial"
          animate="animate"
          variants={animations.fadeIn}
        >
          <Typewriter text="HiveSync" />
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
          initial="initial"
          animate="animate"
          variants={animations.fadeIn}
        >
          <Typewriter text="La colaboración del futuro, hoy." delay={30} />
        </motion.p>
        <motion.div
          className="text-sm sm:text-md md:text-lg text-gray-300 mb-12 max-w-3xl"
          initial="initial"
          animate="animate"
          variants={animations.fadeIn}
        >
          <p className="mb-4">
            Lleva la colaboración a un nuevo nivel con HiveSync, tu aliado digital.
          </p>
          <p>
            Crea grupos personalizados, explora espacios colaborativos y aprovecha nuestra interfaz intuitiva para llevar la eficiencia de tu equipo al siguiente nivel. Todo en un solo lugar y sin complicaciones.
          </p>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          initial="initial"
          animate="animate"
          variants={animations.fadeIn}
        >
          {/* <Link to="signup">
            <motion.button
              {...animations.scale}
              className="px-8 py-3 bg-[#6B2A8A] rounded-full text-base sm:text-lg font-medium hover:bg-[#8A4BA8] transition-colors"
            >
              Prueba lagratis
            </motion.button>
          </Link> */}
          <motion.button
            {...animations.scale}
            className="px-8 py-3 bg-light_purple rounded-full text-base sm:text-lg font-medium  transition-colors"
            onClick={() => {
              const flashCardsElement = document.getElementById('flash-cards');
              if (flashCardsElement) {
                flashCardsElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Descubre más
          </motion.button>
        </motion.div>

        <ImageCarousel />

        <Link to="signup">
          <motion.button
            {...animations.scale}
            className="mt-8 px-8 py-3 bg-light_purple rounded-full text-base sm:text-lg font-medium hover:bg-primary transition-colors"
          >
            Prueba estas herramientas hoy
          </motion.button>
        </Link>

        <motion.section
          id="flash-cards" // Asegúrate de que este id esté correctamente asignado
          className="mt-24 w-full max-w-6xl"
          initial="initial"
          animate="animate"
          variants={animations.fadeIn}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Características Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={TiMessages}
              title="Chat en Tiempo Real"
              description="Mantén la conversación fluida con mensajería instantánea, ideal para equipos en constante movimiento."
            />
            <FeatureCard
              icon={TiTick}
              title="Gestión de Tareas y Proyectos"
              description="Controla tus proyectos de principio a fin con herramientas de organización y asignación de tareas."
            />
            <FeatureCard
              icon={TiWorld}
              title="Traducción Instantánea"
              description="Conéctate con tu equipo global gracias a la traducción automática, sin importar el idioma."
            />
            <FeatureCard
              icon={TiGroup}
              title="Creación de Grupos Personalizados"
              description="Divide y organiza a tu equipo en grupos personalizados para una colaboración más efectiva."
            />
            <FeatureCard
              icon={TiThList}
              title="Interfaz Intuitiva y Personalizable"
              description="Una interfaz intuitiva que se adapta a tu estilo de trabajo y hace que todo sea más simple"
            />
            <FeatureCard
              icon={TiClipboard}
              title="Todo en un Solo Lugar"
              description="Accede a todas tus herramientas desde un solo lugar y mantén tu flujo de trabajo organizado."
            />
          </div>
        </motion.section>

        <CompanyLogos />
      </main>

      <motion.div
        className="relative h-80 sm:h-96 md:h-120 mt-12 overflow-hidden"
        initial="initial"
        animate="animate"
        variants={animations.fadeIn}
      >
        {['esferaN.png', 'esfera.png', 'cono.png', 'moneda.png'].map((img, index) => (
          <motion.img
            key={img}
            src={`/${img}`}
            alt={img.replace('.png', '')}
            className={`absolute w-16 sm:w-20 md:w-24 lg:w-32`}
            variants={animations.float}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeatType: "reverse"
              }
            }}
            style={{
              zIndex: 4 - index,
              filter: `brightness(${100 + index * 10}%) hue-rotate(${index * 30}deg)`,
              left: `${15 + index * 20}%`,
              top: `${20 + (index % 2) * 40}%`,
            }}
          />
        ))}
      </motion.div>

      <footer className="py-6 px-4 text-center text-xs sm:text-sm text-gray-400">
        <p>© 2024 HiveSync. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-[#6B2A8A] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#6B2A8A] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#6B2A8A] transition-colors">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};
