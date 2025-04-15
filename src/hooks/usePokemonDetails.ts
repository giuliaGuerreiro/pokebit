import { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../api/pokemon';
import { Pokemon } from 'pokenode-ts';

export const usePokemonDetails = (name: string) => {
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchPokemonDetails(name);
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError('Failed to load Pokémon details');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, [name]);

  return { data, loading, error };
};
