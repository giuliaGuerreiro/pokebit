import { PokemonStats } from './PokemonStats';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface IWebDetailPanelProps {
  name: string;
  onClose: () => void;
}

export const WebDetailPanel: React.FC<IWebDetailPanelProps> = ({ name, onClose }) => (
  <motion.div
    className="h-full bg-white  shadow-lg p-6 z-50 overflow-y-auto"
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: '500px', opacity: 1 }}
    exit={{ width: 0, opacity: 0 }}
    transition={{
      duration: 0.4,
      ease: 'easeInOut',
    }}
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="font-retro text-xl capitalize">{name}</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100  rounded-full transition"
        aria-label="Close details"
      >
        <IoClose size={20} />
      </button>
    </div>
    <PokemonStats name={name} />
  </motion.div>
);
