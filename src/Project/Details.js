import React ,{useState,useEffect} from "react";
import './Details.css';
const Details = () => {
 const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [offset,setOffset]=useState(50);
  const [disable,setDisable]=useState(false);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=5";
  // subscribe to thapa technical youtube channel: https://www.youtube.com/thapatechnical

  const fetchPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&&limit=${offset}`);
      const data = await res.json();
      //   console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      //   console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      if(offset>=450){
        setPokemon(detailedResponses);
      setLoading(false);
      setDisable(true);
    }
    else{
      setPokemon(detailedResponses);
      setLoading(false);
      setDisable(false);
    }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  useEffect(()=>{
    if(offset<500){
    fetchPokemon()
    }
  },[offset])
  const func=()=>{
    if(offset<500){
    setOffset(offset+50);
    setDisable(true);
    }
  }
  return(<>
     <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
     {loading && <><div id="loaders"></div></>}
   <div id="team">{pokemon.map((item,index) => { return (
    <>
  <div id="card">
  <div id="image-box"><img src={item.sprites.other.dream_world.front_default} /></div>
 <div id="pokemon-name-box" ><h2 id="pokemon-name">{item.name[0].toUpperCase()+item.name.slice(1)}</h2></div>
          
            <h3 id="attack">{item.stats[1].base_stat}</h3>
            <p id="stats1">Attack</p>
            <h3 id="defense">{item.stats[2].base_stat}</h3>
            <p id="stats2">Defense</p>
            <h3 id="speed">{item.stats[5].base_stat}</h3>
            <p id="stats3">Speed</p>
    </div>
    {index===pokemon.length-1 &&           <img src="images/5.png" style={{display:`${disable?"none":"block"}`}}id="more-btn" onClick={func}/>}
    </>)})}</div>
  </>)
};
export default Details;
