import React from 'react';
import { motion } from 'framer-motion';
import { Flower, Sun } from 'lucide-react';

const FlowerExplosion: React.FC = () => {
  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const radius = 200 + Math.random() * 300; // Distance to fly
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        const isSun = i % 3 === 0;

        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x,
              y,
              scale: [0, 1.5, 0.5],
              opacity: [1, 1, 0],
              rotate: Math.random() * 720,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
            className="absolute"
          >
            {isSun ? (
              <Sun className="text-yellow-500 w-8 h-8 fill-yellow-400" />
            ) : (
              <Flower className="text-orange-400 w-6 h-6 fill-orange-200" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FlowerExplosion;
