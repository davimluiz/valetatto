import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import GiftBox from './components/GiftBox';
import GiftReveal from './components/GiftReveal';
import FallingPetals from './components/FallingPetals';
import FlowerExplosion from './components/FlowerExplosion';
import { AppState, GiftData } from './types';

// Updated Data for Kéren
const GIFT_DATA: GiftData = {
  title: "Vale uma Tattoo de até R$300",
  description: "Você ganhou uma nova arte para eternizar na pele! Escolha seu desenho no Studio Âncora.",
  qrValue: "https://www.instagram.com/studioancoratattoo/"
};

const RealisticSunflowerSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
    <defs>
      <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#5D4037" />
        <stop offset="80%" stopColor="#3E2723" />
        <stop offset="100%" stopColor="#22120E" />
      </radialGradient>
      <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFEB3B" />
        <stop offset="50%" stopColor="#FBC02D" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
      </filter>
    </defs>

    {/* Back Layer Petals */}
    <g filter="url(#shadow)">
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={`back-${i}`}
          d="M100 100 Q120 40 100 10 Q80 40 100 100"
          fill="#E65100" // Darker orange/brown for depth
          transform={`rotate(${i * 22.5} 100 100)`}
        />
      ))}
    </g>

    {/* Middle Layer Petals */}
    <g filter="url(#shadow)">
      {Array.from({ length: 16 }).map((_, i) => (
        <path
          key={`mid-${i}`}
          d="M100 100 Q125 30 100 5 Q75 30 100 100"
          fill="url(#petalGradient)"
          transform={`rotate(${i * 22.5 + 11.25} 100 100)`}
        />
      ))}
    </g>

    {/* Front Layer Petals (Smaller) */}
    <g>
      {Array.from({ length: 12 }).map((_, i) => (
        <path
          key={`front-${i}`}
          d="M100 100 Q115 50 100 30 Q85 50 100 100"
          fill="#FFEB3B"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
    </g>

    {/* Center Disk */}
    <circle cx="100" cy="100" r="35" fill="url(#centerGradient)" stroke="#3E2723" strokeWidth="2" />
    
    {/* Seeds Texture */}
    <g fill="#8D6E63" opacity="0.6">
        {Array.from({ length: 40 }).map((_, i) => {
             const r = Math.sqrt(i) * 4;
             const theta = i * 2.4; 
             const x = 100 + r * Math.cos(theta);
             const y = 100 + r * Math.sin(theta);
             return <circle key={i} cx={x} cy={y} r="1.5" />
        })}
    </g>
  </svg>
);

const SunflowerCorner: React.FC<{ position: string, delay: number, rotationOffset: number }> = ({ position, delay, rotationOffset }) => (
  <motion.div 
    className={`absolute w-48 h-48 md:w-64 md:h-64 pointer-events-none z-0 ${position}`}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
        scale: 1, 
        opacity: 1,
    }}
    transition={{ duration: 1.5, delay, type: "spring" }}
  >
     <motion.div
        animate={{ rotate: [0 + rotationOffset, 5 + rotationOffset, -5 + rotationOffset, 0 + rotationOffset] }}
        transition={{ 
            repeat: Infinity, 
            duration: 6 + Math.random() * 2, 
            ease: "easeInOut",
            delay: Math.random() * 2 
        }}
        className="w-full h-full"
     >
        <RealisticSunflowerSVG />
     </motion.div>
  </motion.div>
);

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);

  const handleBoxClick = () => {
    if (appState !== AppState.IDLE) return;
    setAppState(AppState.SUSPENSE);
    setTimeout(() => {
      setAppState(AppState.OPENING);
      setTimeout(() => {
        setAppState(AppState.REVEALED);
      }, 1500); 
    }, 2000); 
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#FFFBEB]">
      
      {/* Background Ambience */}
      <FallingPetals />
      
      {/* Corner Decorations - Animated & Swaying */}
      <SunflowerCorner position="-top-12 -left-12 origin-top-left" delay={0} rotationOffset={10} />
      <SunflowerCorner position="-top-12 -right-12 origin-top-right" delay={0.2} rotationOffset={-10} />
      <SunflowerCorner position="-bottom-16 -left-12 origin-bottom-left" delay={0.4} rotationOffset={-20} />
      <SunflowerCorner position="-bottom-16 -right-12 origin-bottom-right" delay={0.6} rotationOffset={20} />

      {/* Main Layout */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 h-full min-h-[600px]">
        
        {/* Header - Moved to fixed top position to avoid overlap */}
        <AnimatePresence>
            {(appState === AppState.IDLE || appState === AppState.SUSPENSE) && (
                <motion.div 
                  className="absolute top-10 md:top-16 text-center z-20 w-full px-4"
                  exit={{ opacity: 0, y: -50 }}
                >
                    <h1 className="text-5xl md:text-7xl text-yellow-950 font-serif mb-4 tracking-wide drop-shadow-sm">
                        Feliz Aniversário, <br/> <span className="text-yellow-600 drop-shadow-md">Kéren!</span> 🌻
                    </h1>
                    {/* Subtitle removed as requested */}
                </motion.div>
            )}
        </AnimatePresence>

        {/* The Gift Box - Increased margin to push it down below the text */}
        <div className="relative mt-64 md:mt-52 z-10">
            {appState === AppState.OPENING && <FlowerExplosion />}
            
            <AnimatePresence>
                {appState !== AppState.REVEALED && (
                    <GiftBox appState={appState} onClick={handleBoxClick} />
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* The Reveal Modal */}
      <AnimatePresence>
        {appState === AppState.REVEALED && (
          <GiftReveal data={GIFT_DATA} onClose={handleReset} />
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 text-yellow-900/50 text-sm font-serif italic z-20">
        Com amor, para Kéren
      </div>
    </div>
  );
};

export default App;