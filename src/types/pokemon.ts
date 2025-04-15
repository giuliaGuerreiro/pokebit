export interface IPokemonListItem {
  name: string;
  url: string;
}

export interface IPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonListItem[];
}
