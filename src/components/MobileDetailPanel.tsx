import { PokemonStats } from './PokemonStats';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface IMobileDetailPanelProps {
  name: string;
  onClose: () => void;
}

export const MobileDetailPanel: React.FC<IMobileDetailPanelProps> = ({ name, onClose }) => (
  <div className="fixed inset-0 z-50 flex">
    <motion.div
      className="absolute inset-0 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    />

    <motion.div
      className="absolute inset-y-0 right-0 w-full bg-white shadow-lg p-6 z-10 overflow-y-auto"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
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
  </div>
);
