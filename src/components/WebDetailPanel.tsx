import { motion } from 'framer-motion';
import { PokemonStats } from './PokemonStats';

interface IWebDetailPanelProps {
  name: string;
  onClose: () => void;
}

export const WebDetailPanel: React.FC<IWebDetailPanelProps> = ({ name, onClose }) => (
  <motion.div
    className="fixed right-0 top-0 h-full w-[400px] bg-white dark:bg-zinc-800 shadow-lg p-6 z-50"
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
  >
    <button onClick={onClose} className="mb-4">
      Close
    </button>
    <PokemonStats name={name} />
  </motion.div>
);
