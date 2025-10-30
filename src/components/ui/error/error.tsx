import "./errors.scss";

function Error() {
  return (
    <>
      <section className="error">
        <picture>
          <img src="/images/error-image.png" alt="Error" />
        </picture>

        <h2>¡Oh no! Algo salió mal</h2>
        <p>No pudimos cargar los Pokémon. Vuelve a intentarlo.</p>
      </section>
    </>
  );
}

export default Error;
