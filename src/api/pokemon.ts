import { IPokemonListItem } from '../types/pokemon';
import { pokeClient } from './pokeClient';

export async function fetchPokemonList(offset = 0, limit = 20): Promise<IPokemonListItem[]> {
  const response = await pokeClient.listPokemons(offset, limit);
  return response.results;
}
