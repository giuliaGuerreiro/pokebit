import { PokemonList } from '../components/PokemonList';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-full px-2 py-4">
      <h1 id="pokemon-heading" className="font-retro text-xl shrink-0">
        Pokémon List
      </h1>

      <section
        aria-labelledby="pokemon-heading"
        id="pokemon-list"
        className="flex-1 flex flex-col overflow-hidden"
      >
        <PokemonList />
      </section>
    </div>
  );
};

export default Home;
