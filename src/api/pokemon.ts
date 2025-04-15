import axios from 'axios';
import { IPokemonListResponse } from '../types/pokemon';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchPokemonList(offset = 0, limit = 20): Promise<IPokemonListResponse> {
  const response = await axios.get<IPokemonListResponse>(`${API_BASE_URL}/pokemon`, {
    params: { offset, limit },
  });
  return response.data;
}
