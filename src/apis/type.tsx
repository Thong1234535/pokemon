import { Type } from "../types/Types";

export const fetchTypes = async (): Promise<any> => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type/');
    if (!response.ok) {
      throw new Error('Network Error');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetching Type failed: ', error);
    throw error;
  }
};

export const fetchTypeInfo = async (urls: string[]): Promise<Type[]> => {
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

    return data.map((type) => ({
      id: type.id,
      name: type.name,
      pokemon: type.pokemon.map((pokemon: any) => pokemon.pokemon),
    }));
  } catch (error) {
    console.error('Fetching Type info failed: ', error);
    throw error;
  }
};
