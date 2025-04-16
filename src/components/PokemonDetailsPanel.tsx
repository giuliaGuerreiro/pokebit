import { useEffect, useState } from 'react';
import { MobileDetailPanel } from './MobileDetailPanel';
import { WebDetailPanel } from './WebDetailPanel';
import { motion } from 'framer-motion';

interface IDetailPanelProps {
  name: string;
  onClose: () => void;
}

export const PokemonDetailsPanel: React.FC<IDetailPanelProps> = ({ name, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <motion.div
      layout
      className={isMobile ? 'fixed inset-0 z-50' : 'h-full'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {isMobile ? (
        <MobileDetailPanel name={name} onClose={onClose} />
      ) : (
        <WebDetailPanel name={name} onClose={onClose} />
      )}
    </motion.div>
  );
};
