export type TPokemonFull = {
  count: number;
  details: TPokemon[];
};

export type TPokemon = {
  base_experience: number;
  height: number;
  id: number;
  name: string;
  weight: number;
  sprites: {
    front_default: string;
  };
};

export type TPokemonShortInfo = {
  name: string;
  url: string;
};
