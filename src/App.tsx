import { useContext, useEffect, useState } from "react";
import "./App.scss";
import { AnimatePresence, motion } from "framer-motion";
import PokemonsList from "./components/pokemonList/pokemonList";
import { GlobalContext } from "./contexts/global.context";

function App() {
  const { blockScroll } = useContext(GlobalContext);

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll); // cleanup
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = blockScroll ? "hidden" : "auto";
  }, [blockScroll]);

  const scrollToTop = (): void =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <header className="header">
        <h1>Pokédex</h1>
        <p>Discover and explore the world of pokémon</p>
      </header>

      <main className="main">
        <AnimatePresence>
          {true && (
            <motion.section
              className="home"
              key={"home"}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <PokemonsList></PokemonsList>
              {scrollPosition > 100 && (
                <button
                  className="home__btn"
                  aria-label="go up"
                  onClick={() => scrollToTop()}
                >
                  <svg
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    width="40px"
                    height="40px"
                    fill="none"
                  >
                    <path
                      d="M32 2 L20 22 H28 L16 42 H28 L12 62 L40 38 H28 L44 18 H32 Z"
                      fill="#FFD700"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
