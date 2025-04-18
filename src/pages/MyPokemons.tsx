import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import emptyPokeballImage from '../assets/empty_pokeball.webp';

const MyPokemons: React.FC = () => {
  return (
    <div className=" h-full">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center bg-white rounded-xl p-10 m-10">
          <motion.div
            className="flex items-center justify-center mb-6 z-10 "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, type: 'spring' }}
          >
            <img
              src={emptyPokeballImage}
              alt="Empty pokeball"
              className="w-24 sm:w-32 md:w-52 h-auto mx-auto"
            />
          </motion.div>

          <motion.h1
            className="text-xl md:text-2xl  text-gray-600 mb-2 text-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            You haven’t caught any Pokémon yet.
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-800 font-bold text-center mb-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Gotta catch ’em all!
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
                Go To Pokemon List
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyPokemons;
