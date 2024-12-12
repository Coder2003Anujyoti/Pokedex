import React ,{useState,useEffect} from "react";
import './Details.css';
const Details = () => {
 const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const API = "https://pokeapi.co/api/v2/pokemon?limit=200";
  // subscribe to thapa technical youtube channel: https://www.youtube.com/thapatechnical

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      //   console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      console.log(detailedResponses);
      setPokemon(detailedResponses);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  useEffect(()=>{fetchPokemon()},[])
  return(<>
     <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
     {loading && <><div id="loaders"></div></>}
   <div id="team">{pokemon.map((pokemon) => { return (
    <>
  <div id="card">
  <div id="image-box"><img src={pokemon.sprites.other.dream_world.front_default} /></div>
 <div id="pokemon-name-box" ><h2 id="pokemon-name">{pokemon.name[0].toUpperCase()+pokemon.name.slice(1)}</h2></div>
          
            <h3 id="attack">{pokemon.stats[1].base_stat}</h3>
            <p id="stats1">Attack</p>
            <h3 id="defense">{pokemon.stats[2].base_stat}</h3>
            <p id="stats2">Defense</p>
            <h3 id="speed">{pokemon.stats[5].base_stat}</h3>
            <p id="stats3">Speed</p>
    </div>
    </>)})}</div>
  </>)
};
export default Details;
