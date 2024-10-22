import { Pokemon } from "../types";

export const fetchAllPokemons = async (): Promise<any> => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1200');
    if (!response.ok) {
      throw new Error('Network Error');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetching Pokemon failed: ', error);
    throw error;
  }
};

export const fetchPokemonInfo = async (urls: string[]): Promise<Pokemon[]> => {
  try {
    const data = await Promise.all(
      urls.map(async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Network Error in ${url}`);
        }
        return await response.json();
      })
    );

    return data.map((pokemon) => ({
      id: pokemon.id,
      url: pokemon.url,
      name: pokemon.name,
      imageUrl: pokemon.sprites.other['official-artwork'].front_default,
    }));
  } catch (error) {
    console.error('Fetching Pokemon info failed: ', error);
    throw error;
  }
};
