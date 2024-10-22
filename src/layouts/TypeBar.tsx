
import React from 'react'
import { TypeBarProps } from '../types/Props';

const TypeBar: React.FC<TypeBarProps> = ({ types, setType, searched_pokemons }) => {

    return (
        <div className="mx-auto max-w-screen-xl">
            <div className="flex items-center mx-4 my-4">
                <div className="mr-2 my-4 font-bold self-start">Types:</div>
                <div>
                    {
                        types.map((type, index) => (
                            <button
                                key={index}
                                className={`px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold ${type.selected ? "text-white bg-red-900" : "text-red-900"}`}
                                onClick={() => setType(index)}
                            >
                                {type.name}
                            </button>
                        ))
                    }
                </div>
            </div>
            {
                searched_pokemons.length
                    ? <div className="my-12 mx-4 font-bold">{`${searched_pokemons.length} results found.`}</div>
                    : <div className="text-center text-3xl mx-auto my-24 font-bold">No results found.</div>
            }
        </div>
    )
}

export default TypeBar;