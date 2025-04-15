import { useEffect, useState } from 'react';
import { MobileDetailPanel } from './MobileDetailPanel';
import { WebDetailPanel } from './WebDetailPanel';

interface IWebDetailPanelProps {
  name: string;
  onClose: () => void;
}

export const PokemonDetailsPanel: React.FC<IWebDetailPanelProps> = ({ name, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? (
    <MobileDetailPanel name={name} onClose={onClose} />
  ) : (
    <WebDetailPanel name={name} onClose={onClose} />
  );
};
