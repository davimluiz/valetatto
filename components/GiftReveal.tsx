import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, PenTool } from 'lucide-react';
import { generateBirthdayMessage } from '../services/geminiService';
import { GiftData } from '../types';

interface GiftRevealProps {
  data: GiftData;
  onClose: () => void;
}

const GiftReveal: React.FC<GiftRevealProps> = ({ data, onClose }) => {
  const [typedText, setTypedText] = useState('');
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    let i = 0;
    const text = data.description;
    const speed = 40;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [data.description]);

  const handleGeneratePoem = async () => {
    setLoadingAi(true);
    const msg = await generateBirthdayMessage("Kéren", "um Vale Tattoo"); 
    setAiMessage(msg);
    setLoadingAi(false);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#FFFBEB] w-full max-w-md rounded-3xl shadow-2xl p-8 relative border-4 border-yellow-400 overflow-hidden"
        initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ type: "spring", damping: 12 }}
      >
        {/* Decorative corner flowers inside modal */}
        <div className="absolute top-0 right-0 opacity-20 transform translate-x-10 -translate-y-10">
            <svg width="150" height="150" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#FBBF24"/></svg>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-4"
            >
                <h2 className="text-3xl font-serif text-yellow-900 drop-shadow-sm font-bold">
                    {data.title}
                </h2>
                <div className="h-1 w-24 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
            </motion.div>

            <motion.div
                className="bg-white p-4 rounded-2xl shadow-lg border-2 border-dashed border-gray-300 mb-6 relative w-full"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                 <div className="flex flex-col items-center justify-center gap-3">
                     <PenTool className="w-8 h-8 text-gray-800" />
                     <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-inner">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.qrValue)}`} 
                          alt="QR Code" 
                          className="w-40 h-40 object-contain"
                        />
                     </div>
                     <p className="text-xs text-gray-400 font-mono">Scan para ver o studio</p>
                 </div>
            </motion.div>

            <motion.div
                className="font-serif text-xl text-gray-800 mb-6 min-h-[3rem] px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                "{typedText}"
            </motion.div>

            {/* AI Message Section */}
            <div className="w-full mb-6 min-h-[60px]">
                {aiMessage ? (
                    <motion.p
                        className="text-md italic text-yellow-800 font-serif border-l-4 border-yellow-500 pl-4 text-left bg-yellow-50 p-2 rounded-r-lg"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        {aiMessage}
                    </motion.p>
                ) : (
                    <button
                        onClick={handleGeneratePoem}
                        disabled={loadingAi}
                        className="text-sm text-yellow-700 font-bold flex items-center justify-center gap-2 hover:bg-yellow-100 px-4 py-2 rounded-full transition-colors mx-auto"
                    >
                        {loadingAi ? <RefreshCw className="animate-spin w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                        Mensagem Especial para Kéren
                    </button>
                )}
            </div>

            <motion.button
                onClick={onClose}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-10 rounded-full shadow-xl transform transition hover:scale-105 active:scale-95 border-2 border-white/20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
            >
                Fechar 🌻
            </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GiftReveal;