import "./pokemonList.scss";
import PokemonCard from "../pokemonCard/pokemonCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getInitialPokemons, getPokemonByName } from "@/api/pokemonsApi";
import Loader from "@/components/ui/loader/loader";
import { useDebounce } from "@uidotdev/usehooks";
import PokemonNotFound from "../ui/notFound/notFound";
import Error from "../ui/error/error";

function PokemonList() {
  const [searchValue, setSearchValue] = useState<string>("");

  const debounceSearchItem = useDebounce<string>(searchValue, 300);

  const {
    data: filteredPokemons,
    isLoading: isFilteredPokemonsLoading,
    isFetching: isFilteredPokemonsFetching,
  } = useQuery({
    queryKey: ["filtered-pokemons", debounceSearchItem],
    queryFn: () => getPokemonByName(searchValue),
  });

  const {
    data: pokemons,
    isLoading: isPokemonsLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam }) => getInitialPokemons(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    retry: 1,
  });

  return (
    <>
      <section className="pokemons">
        <section className="pokemons__bar" id="pokemons-bar">
          <form
            role="search"
            className="search__bar"
            onSubmit={(e) => e.preventDefault()}
          >
            <svg
              className="search__bar-icon"
              role="img"
              aria-label="close"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
            </svg>
            <input
              type="text"
              className="search__bar-input"
              placeholder="Search pokémon..."
              aria-label="Search"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            {searchValue.length > 0 && (
              <button
                type="button"
                aria-label="close"
                className="search__bar-btn"
                onClick={() => setSearchValue("")}
              >
                ✖
              </button>
            )}
          </form>
        </section>

        <section className="pokemons__list">
          {searchValue ? (
            isFilteredPokemonsLoading || isFilteredPokemonsFetching ? (
              <section className="pokemons__loader">
                <Loader></Loader>
              </section>
            ) : filteredPokemons && filteredPokemons.length > 0 ? (
              <div className="pokemons__list-cards">
                {filteredPokemons?.map((pokemon) => (
                  <PokemonCard pokemon={pokemon} key={pokemon.id} />
                ))}
              </div>
            ) : (
              <section className="pokemons__error">
                <PokemonNotFound />
              </section>
            )
          ) : isPokemonsLoading ? (
            <section className="pokemons__loader">
              <Loader></Loader>
            </section>
          ) : pokemons && pokemons.pages.length > 0 ? (
            <React.Fragment>
              {pokemons?.pages.map((page, i) => (
                <div key={i} className="pokemons__list-cards">
                  {page.results.map((pokemon) => (
                    <PokemonCard
                      pokemon={pokemon}
                      key={pokemon.id}
                    ></PokemonCard>
                  ))}
                </div>
              ))}
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="pokemons__list-btn"
                arial-label="load more pokemons"
              >
                {isFetchingNextPage ? "Cargando..." : "Cargar más"}
              </button>
            </React.Fragment>
          ) : (
            <section className="pokemons__error">
              <Error />
            </section>
          )}
        </section>
      </section>
    </>
  );
}

export default PokemonList;
