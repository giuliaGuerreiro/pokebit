import { useEffect, useState } from 'react';
import { fetchPokemonList } from '../api/pokemon';
import { IPokemonListItem } from '../types/pokemon';

export const usePokemonList = (limit = 20) => {
  const [pokemons, setPokemons] = useState<IPokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);

    try {
      const data = await fetchPokemonList(offset, limit);

      setPokemons((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      // TODO: Add notification toast
      console.error('Error fetching Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return { pokemons, loadMore, loading };
};
