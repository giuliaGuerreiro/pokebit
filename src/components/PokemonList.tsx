import { useEffect, useRef, useState } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonCard } from './PokemonCard';
import { CardGrid } from './common/CardGrid';
import { IPokemonListItem } from '../types/pokemon';

export const PokemonList: React.FC = () => {
  const { pokemons, loadMore, loading } = usePokemonList();
  const [search, setSearch] = useState('');
  const [pokemonSelected, setPokemonSelected] = useState<string | null>(null);
  const [shouldFocusNextCard, setShouldFocusNextCard] = useState(false);

  const lastCountRef = useRef<number>(0);
  const newItemRef = useRef<HTMLDivElement | null>(null);

  // TODO: Improve accessibility
  // TODO: Pass filter to API
  const filteredPokemons: IPokemonListItem[] = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (name: string) => {
    setPokemonSelected((prev) => (prev === name ? null : name));
  };

  const handleLoadMore = () => {
    const active = document.activeElement;
    const isLoadMoreClick = active?.getAttribute('aria-label') === 'Load more items';

    lastCountRef.current = filteredPokemons.length;

    setShouldFocusNextCard(isLoadMoreClick);
    loadMore();
  };

  useEffect(() => {
    if (!loading && shouldFocusNextCard && newItemRef.current) {
      newItemRef.current.focus();
      newItemRef.current = null;
      setShouldFocusNextCard(false);
    }
  }, [loading, shouldFocusNextCard]);

  return (
    <div className="mt-4">
      {/* TODO: MAKE REUSABLE SEARCH INPUT */}
      <label htmlFor="search" className="sr-only">
        Search for a Pokémon
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search Pokémon"
        className="w-full mb-4 px-3 py-2 border rounded-xl"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* TODO: Add option to try fetching again when error */}
      {/* TODO: Add url within .env */}
      <div aria-live="polite" className="sr-only">
        {loading ? 'Loading more Pokémons...' : ''}
      </div>
      <CardGrid
        items={filteredPokemons}
        isLoading={loading}
        onLoadMore={handleLoadMore}
        renderItem={(pokemon, index) => {
          const isFirstNew =
            index === lastCountRef.current && index >= 0 && index < filteredPokemons.length;

          return (
            <PokemonCard
              name={pokemon.name}
              imageUrl={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
              isSelected={pokemonSelected === pokemon.name}
              onClick={() => handleCardClick(pokemon.name)}
              cardRef={isFirstNew ? newItemRef : undefined}
            />
          );
        }}
      />
    </div>
  );
};
