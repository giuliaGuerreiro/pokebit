import { motion } from 'framer-motion';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import { PokemonStat, PokemonType, TYPE_COLORS } from '../types/pokemonDetails';

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pokebit-yellow"></div>
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

  const imageUrl =
    pokemonDetails.sprites.other?.['official-artwork']?.front_default ||
    pokemonDetails.sprites.front_default;
  const heightInMeters = pokemonDetails.height / 10;
  const weightInKg = pokemonDetails.weight / 10;
  const maxStat = Math.max(...pokemonDetails.stats.map((stat) => stat.base_stat));

  return (
    <div className="flex flex-col">
      {/* Pokemon Image and Info */}
      <section className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100  opacity-30 rounded-lg"></div>

        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt={name}
            className="w-48 h-48 mx-auto mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
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
