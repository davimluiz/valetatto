import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppState } from '../types';

interface GiftBoxProps {
  appState: AppState;
  onClick: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ appState, onClick }) => {
  // Animation variants
  const boxVariants = {
    idle: { scale: 1, rotate: 0, y: 0 },
    suspense: {
      x: [-2, 2, -2, 2, -1, 1, 0],
      rotate: [-1, 1, -1, 1, 0],
      scale: 1.05,
      transition: { duration: 0.3, repeat: 5 }
    },
    opening: { scale: 1.1, opacity: 0, transition: { duration: 0.5 } },
    revealed: { opacity: 0, scale: 0 }
  };

  const lidVariants = {
    idle: { y: 0 },
    suspense: { y: -3 },
    opening: { y: -200, rotate: -15, opacity: 0, transition: { duration: 0.6 } },
    revealed: { opacity: 0 }
  };

  return (
    <div className="relative flex flex-col items-center justify-center pt-8 pb-10 group">
        {/* Glow effect */}
        <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-yellow-400 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"
            animate={appState === AppState.SUSPENSE ? { opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] } : {}}
        />

        {/* The Box Container - Smaller size */}
        <motion.div
            className="relative w-48 h-48 md:w-60 md:h-60 z-20 cursor-pointer"
            onClick={onClick}
            variants={boxVariants}
            initial="idle"
            animate={appState === AppState.IDLE ? 'idle' : appState === AppState.SUSPENSE ? 'suspense' : 'opening'}
        >
            {/* Box Body */}
            <div className="absolute bottom-0 w-full h-5/6 rounded-sm shadow-2xl flex items-center justify-center overflow-hidden border border-yellow-900/10">
                {/* Gradient Background - Vivid Gold */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-yellow-500 to-orange-500"></div>
                
                {/* Texture pattern */}
                <div className="absolute inset-0 opacity-10" 
                     style={{ 
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2392400e' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` 
                     }}>
                </div>
                
                {/* Vertical Ribbon */}
                <div className="w-12 h-full bg-red-600 absolute left-1/2 -translate-x-1/2 shadow-lg border-x border-red-800/20 flex flex-col items-center justify-center">
                    <div className="w-[1px] h-full bg-red-400/50 absolute left-2"></div>
                    <div className="w-[1px] h-full bg-red-400/50 absolute right-2"></div>
                </div>
            </div>

            {/* Box Lid */}
            <motion.div
                className="absolute top-8 w-[110%] -left-[5%] h-12 rounded-md shadow-2xl z-30"
                style={{ background: 'linear-gradient(to bottom, #F59E0B, #B45309)' }}
                variants={lidVariants}
            >
                 <div className="w-full h-full absolute inset-0 rounded-md border-b-4 border-yellow-900/20"></div>
                 {/* Ribbon on Lid */}
                 <div className="w-12 h-full bg-red-600 absolute left-1/2 -translate-x-1/2 shadow-sm border-x border-red-800/30"></div>
                 
                 {/* Big Bow */}
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 drop-shadow-xl">
                     {/* Left Loop */}
                     <div className="absolute w-12 h-12 border-[10px] border-red-600 rounded-full rounded-br-none rotate-45 left-2 top-5 bg-red-500 shadow-inner"></div>
                     {/* Right Loop */}
                     <div className="absolute w-12 h-12 border-[10px] border-red-600 rounded-full rounded-bl-none -rotate-45 right-2 top-5 bg-red-500 shadow-inner"></div>
                     {/* Center Knot */}
                     <div className="absolute w-8 h-8 bg-red-700 rounded-lg left-1/2 -translate-x-1/2 top-10 z-10 shadow-lg ring-1 ring-red-900/20"></div>
                 </div>
            </motion.div>
        </motion.div>

        {/* Click Instruction Text - Moved down and highlighted */}
        <div className="h-16 flex items-center justify-center mt-12">
          <AnimatePresence>
            {appState === AppState.IDLE && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.button 
                        className="bg-white/95 backdrop-blur-md border-2 border-yellow-500 px-8 py-3 rounded-full shadow-2xl text-yellow-900 font-bold font-serif text-lg tracking-widest uppercase whitespace-nowrap hover:bg-yellow-50 transition-colors ring-4 ring-yellow-200/60"
                        animate={{ 
                            y: [0, -5, 0],
                            scale: [1, 1.05, 1],
                            boxShadow: ["0px 4px 6px rgba(0,0,0,0.1)", "0px 15px 20px rgba(250, 204, 21, 0.4)", "0px 4px 6px rgba(0,0,0,0.1)"]
                        }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        onClick={onClick}
                    >
                        ✨ Clique para abrir ✨
                    </motion.button>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
    </div>
  );
};

export default GiftBox;