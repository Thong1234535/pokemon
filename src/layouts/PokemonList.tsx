import React from 'react'
import Image from 'next/image';
import { PokemonListProps } from '../types';

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
    return (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {
                pokemons.map((pokemon) => (
                    <div key={pokemon.id}>
                        <div className="h-24 w-24 mx-auto">
                            <Image
                                src={pokemon.imageUrl}
                                alt={pokemon.name}
                                title={pokemon.name}
                                width={100}
                                height={100}
                                loading="lazy"
                            />
                        </div>
                        <div className="text-center">{pokemon.name}</div>
                    </div>
                ))}
        </div>
    )
}

export default PokemonList;