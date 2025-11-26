import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// High-quality realistic sunflower for background with unique IDs
const RealisticBackgroundSunflowerSVG = () => (
    <svg viewBox="0 0 200 200" fill="none" className="drop-shadow-sm">
        <defs>
            <radialGradient id="fp-centerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#5D4037" />
                <stop offset="80%" stopColor="#3E2723" />
                <stop offset="100%" stopColor="#22120E" />
            </radialGradient>
            <linearGradient id="fp-petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEB3B" />
                <stop offset="50%" stopColor="#FBC02D" />
                <stop offset="100%" stopColor="#F57F17" />
            </linearGradient>
        </defs>

        {/* Back Layer Petals */}
        <g>
            {Array.from({ length: 16 }).map((_, i) => (
                <path
                    key={`fp-back-${i}`}
                    d="M100 100 Q120 40 100 10 Q80 40 100 100"
                    fill="#E65100" 
                    transform={`rotate(${i * 22.5} 100 100)`}
                />
            ))}
        </g>

        {/* Middle Layer Petals */}
        <g>
            {Array.from({ length: 16 }).map((_, i) => (
                <path
                    key={`fp-mid-${i}`}
                    d="M100 100 Q125 30 100 5 Q75 30 100 100"
                    fill="url(#fp-petalGradient)"
                    transform={`rotate(${i * 22.5 + 11.25} 100 100)`}
                />
            ))}
        </g>

        {/* Front Layer Petals */}
        <g>
            {Array.from({ length: 12 }).map((_, i) => (
                <path
                    key={`fp-front-${i}`}
                    d="M100 100 Q115 50 100 30 Q85 50 100 100"
                    fill="#FFEB3B"
                    transform={`rotate(${i * 30} 100 100)`}
                />
            ))}
        </g>

        {/* Center Disk */}
        <circle cx="100" cy="100" r="35" fill="url(#fp-centerGradient)" stroke="#3E2723" strokeWidth="2" />
        
        {/* Seeds Texture */}
        <g fill="#8D6E63" opacity="0.6">
            <circle cx="100" cy="100" r="1.5" />
            <circle cx="95" cy="100" r="1.5" />
            <circle cx="105" cy="100" r="1.5" />
            <circle cx="100" cy="95" r="1.5" />
            <circle cx="100" cy="105" r="1.5" />
        </g>
    </svg>
);

const FallingPetals: React.FC = () => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    // Create an array of 20 items
    setItems(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {items.map((i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            y: -100,
            x: Math.random() * window.innerWidth,
            rotate: 0,
            opacity: 0,
            scale: Math.random() * 0.3 + 0.3, // varied scale
          }}
          animate={{
            y: window.innerHeight + 150,
            x: [
                Math.random() * window.innerWidth, 
                Math.random() * window.innerWidth + (Math.random() > 0.5 ? 100 : -100)
            ],
            rotate: 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear",
          }}
        >
           <div className="w-16 h-16 opacity-80">
                <RealisticBackgroundSunflowerSVG />
           </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FallingPetals;