import { IPokemonListResponse } from '../types/pokemon';
import { pokeClient } from './pokeClient';

export async function fetchPokemonList(offset = 0, limit = 20): Promise<IPokemonListResponse> {
  try {
    return await pokeClient.listPokemons(offset, limit);
  } catch (error) {
    console.error('Failed to fetch Pokémon list:', error);
    throw new Error('Failed to fetch Pokémon list');
  }
}
