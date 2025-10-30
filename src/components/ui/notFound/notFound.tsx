import "./notFound.scss";

function PokemonNotFound() {
  return (
    <>
      <section className="not-found">
        <picture>
            <img src="/images/not-found.png" alt="pokemon not found"/>
        </picture>
        <h2>Pokemon not found</h2>
      </section>
    </>
  );
}

export default PokemonNotFound;
