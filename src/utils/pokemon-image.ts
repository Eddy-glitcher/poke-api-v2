import type { Sprites } from "@/interfaces/pokemons-data.interface";

export function pokemonImage(sprites: Sprites): string{
    return (
        sprites?.other?.['official-artwork']?.front_default ||
        sprites?.other?.['dream_world']?.front_default ||
        '/images/placeholder.png'
    );
}