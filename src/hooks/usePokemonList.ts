import { useEffect, useState, useRef } from 'react';
import { fetchPokemonList } from '../api/pokemon';
import { IPokemonListItem } from '../types/pokemon';

export const usePokemonList = (limit = 20) => {
  const [allSearchedPokemons, setAllSearchedPokemons] = useState<IPokemonListItem[]>([]);
  const [pokemons, setPokemons] = useState<IPokemonListItem[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const offsetRef = useRef(offset);
  const isSearchingRef = useRef(isSearching);
  const allSearchedPokemonsRef = useRef(allSearchedPokemons);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  useEffect(() => {
    isSearchingRef.current = isSearching;
  }, [isSearching]);

  useEffect(() => {
    allSearchedPokemonsRef.current = allSearchedPokemons;
  }, [allSearchedPokemons]);

  const loadMore = async () => {
    setLoading(true);
    setError(null);

    try {
      const currentOffset = offsetRef.current;
      const currentIsSearching = isSearchingRef.current;
      const currentAllSearchedPokemons = allSearchedPokemonsRef.current;

      if (currentIsSearching) {
        const nextBatch = currentAllSearchedPokemons.slice(currentOffset, currentOffset + limit);
        setPokemons((prev) => [...prev, ...nextBatch]);
        setOffset((prev) => prev + limit);
      } else {
        const data = await fetchPokemonList(currentOffset, limit);

        setPokemons((prev) => [...prev, ...data.results]);
        setOffset((prev) => prev + limit);
      }
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setError('Error fetching Pokémon');
    } finally {
      setLoading(false);
      setIsFirstLoad(false);
    }
  };

  const searchPokemons = async (term: string) => {
    setLoading(true);
    setIsSearching(true);
    setSearchTerm(term);
    try {
      const data = await fetchPokemonList(0, 2000);
      const filtered = data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
      setAllSearchedPokemons(filtered);
      setPokemons(filtered.slice(0, limit));
      setOffset(limit);
    } catch (error) {
      console.error('Error searching Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
    setAllSearchedPokemons([]);
    setPokemons([]);
    setOffset(0);

    isSearchingRef.current = false;
    offsetRef.current = 0;
    allSearchedPokemonsRef.current = [];

    setTimeout(() => loadMore(), 0);
  };

  useEffect(() => {
    if (!isSearching) {
      loadMore();
    }
  }, []);

  return {
    pokemons,
    loading,
    loadMore,
    searchPokemons,
    resetSearch,
    searchTerm,
    isSearching,
    isFirstLoad,
    error,
  };
};
