export type TPokemonFull = {
  count: number;
  details: TPokemon[];
};

export type TPokemon = {
  abilities: {
    ability: { name: string };
  }[];
  base_experience: number;
  height: number;
  id: number;
  name: string;
  weight: number;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
};

export type TPokemonShortInfo = {
  name: string;
  url: string;
};
