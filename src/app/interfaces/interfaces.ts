export interface CharacterApi {
  info: CharacterInfo
  results: Character[]
}

export interface CharacterInfo {
  count: number;
  pages: number;
  next: string;
  prev: unknown | null;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string
  };
  location: {
    name: string;
    url: string;
  },
  image: string;
  episode: string[],
  url: string;
  created: string
}

interface EpisodeApi {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: unknown | null;
  };
  results: Episode[]
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string
}
