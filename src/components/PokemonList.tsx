import { useEffect, useRef, useState } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonCard } from './PokemonCard';
import { CardGrid } from './common/CardGrid';
import { PokemonDetailsPanel } from './PokemonDetailsPanel';
import { motion, AnimatePresence } from 'framer-motion';

export const PokemonList: React.FC = () => {
  const { pokemons, loadMore, loading, searchPokemons, resetSearch } = usePokemonList();

  const [search, setSearch] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [shouldFocusNextCard, setShouldFocusNextCard] = useState(false);

  const lastCountRef = useRef<number>(0);
  const newItemRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = () => {
    if (!search || search.trim() === '') {
      resetSearch();
    } else {
      searchPokemons(search);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCardClick = (name: string) => {
    setSelectedPokemon((prev) => (prev === name ? null : name));
  };

  const handleLoadMore = () => {
    const active = document.activeElement;
    const isLoadMoreClick = active?.getAttribute('aria-label') === 'Load more items';

    lastCountRef.current = pokemons.length;
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
    <div className="flex h-full pt-4 overflow-hidden gap-4">
      {/* Main content - shrinks when details panel is open */}
      <motion.div
        className="flex flex-col overflow-hidden"
        layout
        animate={{
          flex: selectedPokemon ? '1 1 auto' : '1 1 100%',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* TODO: MAKE REUSABLE SEARCH INPUT */}
        {/* Search input */}
        <div className="shrink-0 mb-4 flex gap-2">
          <label htmlFor="search" className="sr-only">
            Search for a Pokémon
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search Pokémon"
            className="w-full px-3 py-2 border rounded-xl"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* TODO: MAKE REUSABLE BUTTON */}
          <button
            onClick={handleSearch}
            className="btn-primary shrink-0 px-4 py-2 rounded-xl"
            aria-label="Search Pokémon"
          >
            Search
          </button>
        </div>

        {/* Accessibility announcement */}
        <div aria-live="polite" className="sr-only">
          {loading ? 'Loading more Pokémons...' : ''}
        </div>

        {/* TODO: Add option to try fetching again when error */}
        {/* TODO: Add url within .env */}
        {/* Cards grid container */}
        <div className="flex-1 overflow-hidden">
          <CardGrid
            items={pokemons}
            isLoading={loading}
            onLoadMore={handleLoadMore}
            renderItem={(pokemon, index) => {
              const isFirstNew =
                index === lastCountRef.current && index >= 0 && index < pokemons.length;

              return (
                <PokemonCard
                  name={pokemon.name}
                  imageUrl={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                  isSelected={selectedPokemon === pokemon.name}
                  onClick={() => handleCardClick(pokemon.name)}
                  cardRef={isFirstNew ? newItemRef : undefined}
                />
              );
            }}
          />
        </div>
      </motion.div>

      {/* Details panel with animation */}
      <AnimatePresence>
        {selectedPokemon && (
          <PokemonDetailsPanel name={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};
