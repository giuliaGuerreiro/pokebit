export interface IPokemonListItem {
  id?: string;
  name: string;
  url: string;
}

export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonListItem[];
}
