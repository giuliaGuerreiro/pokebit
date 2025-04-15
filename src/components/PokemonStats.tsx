import { motion } from 'framer-motion';
import { usePokemonDetails } from '../hooks/usePokemonDetails';

interface IPokemonStatsProps {
  name: string;
}

export const PokemonStats: React.FC<IPokemonStatsProps> = ({ name }) => {
  const { data, loading, error } = usePokemonDetails(name);

  if (loading) {
    return <p className="text-center">Loading Pokémon details...</p>;
  }

  if (error) {
    return <p className="text-red-600">Failed to fetch details</p>;
  }

  if (!data) {
    return <p className="text-red-600">No details found</p>;
  }

  const imageUrl =
    data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default;

  return (
    <div>
      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt={name}
          className="w-40 h-40 mx-auto mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <h2 className="text-center font-bold text-xl mb-2 capitalize">{name}</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-1">Abilities</h3>
        <ul className="list-disc pl-5">
          {data.abilities.map((a) => (
            <li key={a.ability.name}>{a.ability.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-1">Base Stats</h3>
        <ul>
          {data.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
