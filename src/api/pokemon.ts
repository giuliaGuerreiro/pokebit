import { Pokemon } from 'pokenode-ts';
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

export async function fetchPokemonDetails(name: string): Promise<Pokemon> {
  try {
    return await pokeClient.getPokemonByName(name);
  } catch (error) {
    console.error(`Failed to fetch details for Pokémon "${name}":`, error);
    throw new Error('Failed to fetch Pokémon details');
  }
}
