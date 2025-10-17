export type TPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
};

export type TPokemonShortInfo = {
  name: string;
  url: string;
};

export type TPokemons = {
  results: TPokemonShortInfo[];
};
