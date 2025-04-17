import { motion } from 'framer-motion';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { PokemonStat, PokemonType, TYPE_COLORS } from '../types/pokemonDetails';
import { useEffect, useState } from 'react';
import { extractSpriteUrls } from '../utils/image';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import Button from './common/Button';
import LoadingSpinner from './common/LoadingSpinner';
import toast, { Toaster } from 'react-hot-toast';
import { FiAlertCircle } from 'react-icons/fi';

interface IPokemonStatsProps {
  name: string;
}

// Stat display names
const STAT_NAMES: Record<PokemonStat, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Attack',
  'special-defense': 'Sp. Defense',
  speed: 'Speed',
};

export const PokemonStats: React.FC<IPokemonStatsProps> = ({ name }) => {
  const { pokemonDetails, isLoading, error } = usePokemonDetails(name);
  const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);
  const [currentName, setCurrentName] = useState(name);

  const spriteUrls = pokemonDetails ? extractSpriteUrls(pokemonDetails.sprites) : [];

  const heightInMeters = pokemonDetails ? pokemonDetails.height / 10 : 0;
  const weightInKg = pokemonDetails ? pokemonDetails.weight / 10 : 0;
  const maxStat = pokemonDetails
    ? Math.max(...pokemonDetails.stats.map((stat) => stat.base_stat))
    : 0;

  useEffect(() => {
    if (name === currentName) return;

    setCurrentName(name);

    if (spriteUrls.length > 0) {
      setCurrentSpriteIndex(0);
    }
  }, [name]);

  useEffect(() => {
    if (error) {
      toast(
        <div className="flex items-center gap-2">
          <FiAlertCircle className="text-red-500" size={20} />
          <span>{error}</span>
        </div>,
        {
          position: 'bottom-right',
        }
      );
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <LoadingSpinner variant="page" />
        <h3 className="heading-3 mt-4">{`Loading ${name} Details...`}</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">Failed to fetch details</p>
      </div>
    );
  }

  if (!pokemonDetails) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
        <p className="text-yellow-700">No details found for {name}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Toaster />

      {/* Pokemon Image and Info */}
      <section className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-300  opacity-30 rounded-lg"></div>

        {spriteUrls.length > 0 && (
          <div className="relative flex justify-center items-center">
            <motion.img
              key={spriteUrls[currentSpriteIndex]}
              src={spriteUrls[currentSpriteIndex]}
              alt={`${name} sprite`}
              className="w-48 h-48 mx-auto mb-2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Image Buttons */}
            {spriteUrls.length > 1 && (
              <>
                <Button
                  onClick={() =>
                    setCurrentSpriteIndex((prev) => (prev === 0 ? spriteUrls.length - 1 : prev - 1))
                  }
                  leftIcon={<BiSolidLeftArrow size={16} />}
                  className="absolute left-0 ml-2 p-1 bg-gray-200 hover:bg-gray-300 rounded-full"
                  variant="gray-fill"
                  size="sm"
                />

                <Button
                  onClick={() =>
                    setCurrentSpriteIndex((prev) => (prev === spriteUrls.length - 1 ? 0 : prev + 1))
                  }
                  leftIcon={<BiSolidRightArrow size={16} />}
                  className="absolute right-0 mr-2 p-1 bg-gray-200 hover:bg-gray-300 rounded-full"
                  variant="gray-fill"
                  size="sm"
                />
              </>
            )}
          </div>
        )}

        <div className="text-center mt-2">
          <h2 className="font-retro text-2xl mb-2 capitalize">{name}</h2>
          <span className="text-gray-500 text-sm">
            #{pokemonDetails.id.toString().padStart(3, '0')}
          </span>
        </div>
      </section>

      {/* Type badges */}
      <section className="flex justify-center gap-2 mb-6">
        {pokemonDetails.types.map((typeInfo) => (
          <span
            key={typeInfo.type.name}
            className={`${TYPE_COLORS[typeInfo.type.name as PokemonType] || 'bg-gray-400'} text-white px-3 py-1 rounded-full text-sm capitalize font-medium`}
          >
            {typeInfo.type.name}
          </span>
        ))}
      </section>

      {/* Physical attributes */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        <div className="card text-center">
          <span className="text-gray-500  text-sm">Height</span>
          <p className="font-medium text-lg">{heightInMeters} m</p>
        </div>
        <div className="card text-center">
          <span className="text-gray-500  text-sm">Weight</span>
          <p className="font-medium text-lg">{weightInKg} kg</p>
        </div>
      </section>

      {/* Abilities */}
      <section className="mb-6">
        <h3 className="font-retro text-lg mb-3">Abilities</h3>
        <div className="flex flex-wrap gap-2">
          {pokemonDetails.abilities.map((ability) => (
            <span
              key={ability.ability.name}
              className="bg-gray-200  px-3 py-1 rounded-lg text-sm capitalize"
            >
              {ability.ability.name.replace('-', ' ')}
              {ability.is_hidden && <span className="text-xs ml-1 text-gray-500">(Hidden)</span>}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section>
        <h3 className="font-retro text-lg mb-3">Base Stats</h3>
        <div className="space-y-3">
          {pokemonDetails.stats.map((stat) => (
            <div key={stat.stat.name} className="flex items-center">
              <span className="w-24 text-sm font-medium">
                {STAT_NAMES[stat.stat.name as PokemonStat] || stat.stat.name}
              </span>
              <span className="w-8 text-sm text-right mr-2">{stat.base_stat}</span>
              <div className="flex-1 bg-gray-200  rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-pokebit-yellow"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.base_stat / maxStat) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
