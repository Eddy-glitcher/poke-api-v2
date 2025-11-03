import type { PokemonData } from '@/interfaces/pokemons-data.interface'
import './pokemonCard.scss'
import { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GlobalContext } from '@/contexts/global.context';
import { pokemonImage } from '@/utils/pokemon-image';

type PokemonCardProps = {
  pokemon: PokemonData;
};

function PokemonCard({pokemon}: PokemonCardProps) {

  const transformPokemonId = (id : number): string =>{
    if(id < 10) return `#00${id}`
    if(id >= 10 && id <= 99) return `#0${id}`
    return `#${id}`;
  }

  const transformPokemonName = (name: string): string =>{
    return name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  }

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData>();

  const { setBlockScroll } = useContext(GlobalContext);

  const selectPokemon = (pokemon: PokemonData)=>{
    setSelectedPokemon(pokemon);
  }

  return (
    <>
      <section className='card' onClick={()=>{ selectPokemon(pokemon); setBlockScroll(true);}}>
        <article>
          <picture>
            <img src={pokemonImage(pokemon.sprites)} alt={`${pokemon.name} image`} loading='lazy' fetchPriority={pokemon.id == 1 ? 'high' : 'auto'} width="100%" height="100%"/>
          </picture>
          <h3>{transformPokemonName(pokemon.name)}</h3>
          <span>{transformPokemonId(pokemon.id)}</span>
          <ul>
            {pokemon.types.map((type,i) => (                
              <li key={i} className={type.type.name} >{type.type.name}</li>
            ))}
          </ul>
        </article>
      </section>

      <AnimatePresence>
          {selectedPokemon && (
              <motion.section className='card-info'
                  key={'card-details'}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
              >
              <section className='card card--content'>
                <article>
                  <h2>{transformPokemonName(pokemon.name)}</h2>
                  <span className='card__id'>{transformPokemonId(pokemon.id)}</span>

                  <button type="button" aria-label="close card" onClick={()=>{setSelectedPokemon(undefined); setBlockScroll(false)}}>
                    <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
                    </svg>
                  </button>

                  <picture>
                    <img src={pokemonImage(pokemon.sprites)} alt={`${pokemon.name} image`}/>
                  </picture>

                  <ul>
                    {pokemon.types.map((type,i) => (                
                      <li key={i} className={type.type.name}>{type.type.name}</li>
                    ))}
                  </ul>

                  <ul className='pokemon-info'>
                    <li>
                      <span>{`${pokemon.height / 10}m`}</span>
                      <span>Height</span>
                    </li>
                    <li>
                      <span>{`${pokemon.weight / 10}kg`}</span>
                      <span>Weight</span>
                    </li>
                  </ul>
                </article>

                <article>
                  <h3>Base Stats</h3>
                  <ul className='pokemon__stats'>
                    {pokemon.stats.map((stat,i) => (  
                      <div key={i} className='pokemon-stat'>
                        <span>{stat.stat.name}</span>
                        <span>{stat.base_stat}</span>
                        <li>
                          <div style={{width: `${(stat.base_stat / 255) * 100}%`}}></div>
                        </li>
                      </div>
                    ))}
                  </ul>
                  <h3>Abilities</h3>
                  <ul className='pokemon__abilities'>
                      {pokemon.abilities.map((abilities,i) => (  
                        <li key={i}>
                          {abilities.ability.name}
                        </li>
                    ))}
                  </ul>
                </article>
              </section>
              </motion.section>
          )}
      </AnimatePresence>
    </>
  )
}

export default PokemonCard
