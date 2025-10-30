import type { PokemonData } from "@/interfaces/pokemons-data.interface";
import type {
  PokemonResults,
  Result,
} from "@/interfaces/pokemons-result.interface";
import { ApiError } from "@/utils/apiError";

const baseUrl = "https://pokeapi.co/api/v2";

export async function getPokemons(data: Result[]): Promise<PokemonData[]> {
  const pokemons: PokemonData[] = await Promise.all(
    data.map(async (pokemon: { url: string }) => {
      return (await fetch(pokemon.url)).json();
    })
  );

  if (!pokemons.length) {
    throw new ApiError("Error fetching the pokemons, try again", 500);
  }

  return pokemons;
}

export async function getInitialPokemons(
  pageParam: string
): Promise<{ results: PokemonData[]; nextPage: string }> {
  const res = await fetch(pageParam || `${baseUrl}/pokemon?offset=0&limit=20`);

  if (!res.ok)
    throw new ApiError("Error fetching the initial pokemons, try again", 500);

  const data: PokemonResults = await res.json();

  const detailedPokemons = await getPokemons(data.results);

  if (!detailedPokemons.length)
    throw new ApiError("Error fetching the pokemons, try again", 500);

  return {
    results: detailedPokemons,
    nextPage: data.next,
  };
}

export async function getPokemonByName(name: string): Promise<PokemonData[]> {
  if (!name) return [];

  const res = await fetch(`${baseUrl}/pokemon?limit=1302`);

  if (!res.ok)
    throw new ApiError("Error fetching the pokemons, try again", 500);

  const data: PokemonResults = await res.json();

  const [...resPokemons] = data.results;

  const filteredPokemons = resPokemons
    .filter((pokemon) => {
      if (pokemon.name.startsWith(name.toLowerCase())) {
        return pokemon;
      }
    })
    .slice(0, 10);

  if (!filteredPokemons.length)
    throw new ApiError("Pokemon not found, try again", 404);

  const detailedPokemons = await getPokemons(filteredPokemons);

  return detailedPokemons;
}
