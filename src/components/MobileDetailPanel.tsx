import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { PokemonStats } from './PokemonStats';

interface IMobileDetailPanelProps {
  name: string;
  onClose: () => void;
}

export const MobileDetailPanel: React.FC<IMobileDetailPanelProps> = ({ name, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-white dark:bg-zinc-900 z-50 p-4 overflow-y-auto"
    initial={{ y: '100%' }}
    animate={{ y: 0 }}
    exit={{ y: '100%' }}
  >
    <button onClick={onClose} className="flex items-center mb-4">
      <FiArrowLeft className="mr-2" /> Back
    </button>
    <PokemonStats name={name} />
  </motion.div>
);
