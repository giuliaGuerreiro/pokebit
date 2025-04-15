import { PokemonClient } from 'pokenode-ts';

/*
  According to the PokéAPI usage guidelines, all resources should be locally cached whenever requested.
  This client (from the pokenode-ts library) automatically handles caching internally.
*/

export const pokeClient = new PokemonClient();
