import { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../api/pokemon';
import { Pokemon } from 'pokenode-ts';

export const usePokemonDetails = (name: string) => {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPokemonDetailsByName = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchPokemonDetails(name);
        console.log('result', result);

        setPokemonDetails(result);
      } catch (err) {
        console.error('Failed to load Pokémon details:', error);
        setError('Failed to load Pokémon details');
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonDetailsByName();
  }, [name]);

  return { pokemonDetails, isLoading, error };
};
