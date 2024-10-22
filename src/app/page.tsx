"use client"

import React, { useEffect, useState } from 'react'
import TypeBar from "../layouts/TypeBar";
import PokemonList from "../layouts/PokemonList";
import { Pokemon, Type, Entire } from "../types/Types";
import { fetchTypes, fetchTypeInfo, fetchAllPokemons, fetchPokemonInfo } from "../apis";


export default function Home() {
  const [current_page, setCurrentPage] = useState<number>(0);
  const [page_size, setPageSize] = useState<number>(0);
  const [types, setTypes] = useState<Type[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [all_pokemons, setAllPokemons] = useState<Pokemon[]>([]);
  const [searched_pokemons, setSearchedPokemonInfo] = useState<Pokemon[]>([]);

  useEffect(() => {
    setPageSize(48);
    getTypes();
    getAllPokemons();
  }, []);

  useEffect(() => {
    let selectedCount = types.reduce((sum, type) => sum + (type.selected ? 1 : 0), 0);
    
    let pokemonList = types.flatMap((type) => (type.selected ? type.pokemon : []));
  
    let entire: Entire = {};
    
    for (let pokemon of pokemonList) {
      if (entire[pokemon.url]) {
        entire[pokemon.url].count += 1;
      } else {
        entire[pokemon.url] = { count: 1, pokemon };
      }
    }
  
    let pokemonUrls = Object.keys(entire).filter(url => entire[url].count === selectedCount);
    
    let matched = pokemonUrls.map(url => entire[url].pokemon);
    setSearchedPokemonInfo(selectedCount === 0 ? all_pokemons : matched);
  
    let from = current_page * page_size;
    let to = (current_page + 1) * page_size;
    
    let urls = selectedCount > 0
      ? pokemonUrls.slice(from, to)
      : all_pokemons.slice(from, to).map(info => info.url);
  
    getPokemons(urls);
  }, [types, current_page]);

  const getTypes = async () => {
    try {
      const typesData = await fetchTypes();
      const typeUrls = typesData.results.map((item: Type) => item.url);
      const typeInfoData = await fetchTypeInfo(typeUrls);
  
      const results = typeInfoData.map((type) => ({
        id: type.id,
        name: type.name,
        pokemon: type.pokemon
      }));
  
      setTypes(results);
    } catch (error) {
      console.error('Fetching Type data failed:', error);
    }
  };
  
  const setType = (typeId: number) => {
    setTypes((types) =>
      types.map((type, index) =>
        index === typeId ? { ...type, selected: !type.selected } : type
      )
    );
    setCurrentPage(0);
  };
  
  const getAllPokemons = async () => {
    try {
      const pokemonsData = await fetchAllPokemons();
      setAllPokemons(pokemonsData.results);
    } catch (error) {
      console.error('Fetching Pokemon data failed:', error);
    }
  };
  
  const getPokemons = async (urls: string[]) => {
    try {
      const pokemonData = await fetchPokemonInfo(urls);
      setPokemons(pokemonData);
    } catch (error) {
      console.error('Fetching Type data failed:', error);
    }
  };  

  return (
    <div>
      <TypeBar types={types} setType={setType} searched_pokemons={searched_pokemons} />
      <PokemonList pokemons={pokemons} />
      <div className="mt-8 flex justify-center">
        <button className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
          onClick={() => setCurrentPage(current_page - 1)}
          disabled={current_page == 0}
        >
          Prev
        </button>
        <button className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none"
          onClick={() => setCurrentPage(current_page + 1)}
          disabled={current_page == Math.floor(searched_pokemons.length / page_size - 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}