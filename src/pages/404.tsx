import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import pokeballSvg from '../assets/pokeball.svg';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <motion.div
        className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="relative flex items-center justify-center mb-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
        >
          <div className="flex items-center">
            <span className="text-8xl md:text-9xl font-bold text-gray-800">4</span>
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 mx-2 md:mx-3"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <img src={pokeballSvg} alt="Pokeball" className="w-full h-full" />
            </motion.div>
            <span className="text-8xl md:text-9xl font-bold text-gray-800">4</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Uh-oh!
        </motion.h1>

        <motion.p
          className="text-gray-600 text-center mb-8 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          You got lost on your journey!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/">
            <motion.button
              className="px-6 py-2 bg-red-500 text-white rounded-xl flex items-center gap-2 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <FiHome size={18} />
              Go Back Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
