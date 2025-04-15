import { PokemonList } from '../components/PokemonList';

const Home: React.FC = () => {
  return (
    <div className="px-2 py-4">
      <h1 id="pokemon-heading" className="font-retro text-xl mb-4">
        Pokémon List
      </h1>

      <section aria-labelledby="pokemon-heading" id="pokemon-list">
        <PokemonList />
      </section>
    </div>
  );
};

export default Home;
