import { useState } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonCard } from './PokemonCard';
import { CardGrid } from './common/CardGrid';
import { IPokemonListItem } from '../types/pokemon';

export const PokemonList: React.FC = () => {
  const { pokemons, loadMore, loading } = usePokemonList();
  const [search, setSearch] = useState('');

  const [pokemonSelected, setPokemonSelected] = useState<string | null>(null);

  const handleCardClick = (name: string) => {
    setPokemonSelected((prev) => (prev === name ? null : name));
  };

  // TODO: Improve accessibility
  // TODO: Pass filter to API
  const filteredPokemons: IPokemonListItem[] = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        id="search"
        type="text"
        placeholder="Search Pokémon"
        className="w-full mb-4 px-3 py-2 border rounded"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* TODO: Add option to try fetching again when error */}
      {/* TODO: Add url within .env */}
      <CardGrid
        items={filteredPokemons}
        isLoading={loading}
        onLoadMore={loadMore}
        renderItem={(pokemon) => (
          <PokemonCard
            name={pokemon.name}
            imageUrl={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
            isSelected={pokemonSelected === pokemon.name}
            onClick={() => handleCardClick(pokemon.name)}
          />
        )}
      />
    </div>
  );
};
