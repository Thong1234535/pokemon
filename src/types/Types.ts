export interface Type {
    id: number;
    name: string;
    url?: string;
    pokemon: Pokemon[];
    selected?: boolean;
}

export interface Pokemon {
    id: number;
    name: string;
    url: string;
    imageUrl: string;
}

export interface Entire {
    [key: string]: {
        count: number,
        pokemon: Pokemon
    }
}