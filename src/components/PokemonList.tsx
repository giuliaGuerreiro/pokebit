import { useEffect, useRef, useState } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonCard } from './PokemonCard';
import { CardGrid } from './common/CardGrid';
import { PokemonDetailsPanel } from './PokemonDetailsPanel';
import { motion, AnimatePresence } from 'framer-motion';
import SearchInput from './common/SearchInput';
import { getPokemonImageUrl } from '../utils/image';
import { FiAlertTriangle } from 'react-icons/fi';
import Button from './common/Button';
import toast, { Toaster } from 'react-hot-toast';
import { FiAlertCircle } from 'react-icons/fi';

export const PokemonList: React.FC = () => {
  const {
    pokemons,
    loadMore,
    loading,
    searchPokemons,
    resetSearch,
    isSearching,
    isFirstLoad,
    error,
  } = usePokemonList();
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

  const handleClearSearch = () => {
    setSearch('');
    if (search && isSearching) {
      resetSearch();
    }
  };

  const handleSelectHistory = (term: string) => {
    setSearch(term);
    searchPokemons(term);
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

  return (
    <div className="flex h-full overflow-hidden gap-4">
      <Toaster />

      {/* Main content - shrinks when details panel is open */}
      <motion.div
        className="flex flex-col overflow-hidden"
        layout
        animate={{
          flex: selectedPokemon ? '1 1 auto' : '1 1 100%',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* Search input area */}
        <div className="shrink-0 p-1">
          <SearchInput
            id="pokemon-search"
            placeholder="Search Pokémon"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onClearInput={handleClearSearch}
            onSearch={handleSearch}
            isHistoryEnabled
            historyKey="pokemon-search-history"
            onSelectHistory={handleSelectHistory}
          />
        </div>

        {/* Cards grid container */}
        <div className="flex-1 overflow-hidden pb-16 md:pb-0">
          {error ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FiAlertTriangle size={150} className="text-red-500 mb-4" />
              <p className="mb-2">Oops! Failed to load Pokémons.</p>
              <Button variant="tertiary" onClick={resetSearch}>
                Try Again
              </Button>
            </div>
          ) : pokemons.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
                alt="No Pokémon found"
                className="w-48 h-48 mb-4"
              />
              <p>No Pokémon found matching your search.</p>
            </div>
          ) : (
            <CardGrid
              items={pokemons}
              isLoadingMore={loading}
              isFirstLoad={isFirstLoad}
              onLoadMore={handleLoadMore}
              isDetailPanelOpen={selectedPokemon !== null}
              renderItem={(pokemon, index) => {
                const isFirstNew =
                  index === lastCountRef.current && index >= 0 && index < pokemons.length;
                return (
                  <PokemonCard
                    name={pokemon.name}
                    imageUrl={getPokemonImageUrl(pokemon.url)}
                    isSelected={selectedPokemon === pokemon.name}
                    onClick={() => handleCardClick(pokemon.name)}
                    cardRef={isFirstNew ? newItemRef : undefined}
                  />
                );
              }}
            />
          )}
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
