import { Pokemon, Type } from "./Types";

export interface TypeBarProps {
    types: Type[]; 
    searched_pokemons: Pokemon[];
    setType: (index: number) => void;
}

export interface PokemonListProps {
    pokemons: Pokemon[]; 
}