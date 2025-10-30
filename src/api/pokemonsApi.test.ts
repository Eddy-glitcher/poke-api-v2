import type { PokemonData } from "@/interfaces/pokemons-data.interface";
import { getInitialPokemons, getPokemons } from "./pokemonsApi";
import * as pokemonApi from "./pokemonsApi";

const mockPokemonList = [
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/1" },
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/2" },
];

const mockPokemons = [
  {
    id: 1,
    name: "pikachu",
    weight: 60,
    height: 4,
    sprites: { front_default: "pikachu.png" },
    types: [{ type: { name: "electric" } }],
  },
  {
    id: 2,
    name: "bulbasaur",
    weight: 80,
    height: 3,
    sprites: { front_default: "bulbasaur.png" },
    types: [{ type: { name: "grass" } }],
  },
] as PokemonData[];

const mockApiResponse = {
  results: mockPokemonList,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
};

const originalFetch = global.fetch;

describe("pokemonApi", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    global.fetch = originalFetch;
  });

  describe("Get Pokemons", () => {
    test("should return a list of pokemons", async () => {
      jest.spyOn(Promise, "all").mockResolvedValueOnce(mockPokemons);

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockPokemons),
      });

      const res = await getPokemons(mockPokemonList);

      expect(res).toEqual(mockPokemons);
    });

    test("should throw a 500 error if the pokemons list are empty", async () => {
      jest.spyOn(Promise, "all").mockResolvedValueOnce([]);

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValueOnce([]),
      });

      await expect(getPokemons(mockPokemonList)).rejects.toMatchObject({
        statusCode: 500,
        message: "Error fetching the pokemons, try again",
      });
    });
  });

  describe("Get Initial Pokemons", () => {
    test("should return the initial list of pokemons", async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockApiResponse,
        })
        .mockResolvedValue({ ok: true, json: () => mockPokemons });

      jest.spyOn(Promise, "all").mockResolvedValueOnce(mockPokemons);

      const results = await getInitialPokemons("");

      expect(results).toEqual({
        results: mockPokemons,
        nextPage: mockApiResponse.next,
      });
      expect(results.results[0].name).toEqual(mockPokemons[0].name);
    });

    test("should throw a 404 error if the initial pokemons list fails", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        results: [],
      });

      await expect(pokemonApi.getInitialPokemons("")).rejects.toMatchObject({
        statusCode: 500,
        message: "Error fetching the initial pokemons, try again",
      });
    });

    test("should throw a 500 error if fetching the full pokemons info fails", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ results: [] }),
      });

      jest.spyOn(pokemonApi, "getPokemons").mockResolvedValueOnce([]);

      await expect(pokemonApi.getInitialPokemons("")).rejects.toMatchObject({
        statusCode: 500,
        message: "Error fetching the pokemons, try again",
      });
    });
  });

  describe("Get Pokemons By Name", () => {
    test("should return a pokemon by name", async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce({ results: mockPokemonList }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockPokemons[0],
        });

      jest.spyOn(pokemonApi, "getPokemons").mockResolvedValueOnce(mockPokemons);
      const res = await pokemonApi.getPokemonByName("pika");

      expect(res[0]).toEqual(mockPokemons[0]);
    });

    test("should throw a 500 error if the pokemon by name fails", async () => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
      });
      await expect(pokemonApi.getPokemonByName("pika")).rejects.toMatchObject({
        statusCode: 500,
        message: "Error fetching the pokemons, try again",
      });
    });
    
    test("should return 404 error if the pokemon does not found", async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce({ results: [] }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => {},
        });
      jest.spyOn(pokemonApi, "getPokemons").mockResolvedValueOnce([]);
      await expect(pokemonApi.getPokemonByName("pika")).rejects.toMatchObject({
        statusCode: 404,
        message: "Pokemon not found, try again",
      });
    });
  });
});
