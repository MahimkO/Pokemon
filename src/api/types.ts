export type TPokemon = {
  base_experience: number;
  height: number;
  id: number;
  name: string;
  weight: number;
};

export type TPokemonShortInfo = {
  name: string;
  url: string;
};

export type TPokemons = {
  results: TPokemonShortInfo[];
};
