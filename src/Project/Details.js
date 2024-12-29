import Show from './Show';
import React ,{useState,useEffect} from "react";
import './Details.css';
const Details = () => {
 const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subloading,setSubloading]=useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [offset,setOffset]=useState(0);
  const [showid,setShowid]=useState(-1);
  const [showpage,setShowpage]=useState(true);
  const [disable,setDisable]=useState(false);
  const API = "https://pokeapi.co/api/v2/pokemon?limit=5";
  // subscribe to thapa technical youtube channel: https://www.youtube.com/thapatechnical

  const fetchPokemon = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=10`);
      const data = await res.json();
      //   console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      //   console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      if(offset>=639){
        setPokemon([...pokemon,detailedResponses]);
     // alert("Your Data is Loading");
      setLoading(false);
      setSubloading(false);
      setDisable(true);
    }
    else{
      setPokemon([...pokemon,detailedResponses]);
    //  alert("Your Data is Loading");
      setLoading(false);
      setSubloading(false);
      setDisable(false);
    }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };
  useEffect(()=>{
    if(offset<649){
    fetchPokemon()
    }
  },[offset])
  const func=()=>{
    if(offset<649){
    setOffset(offset+10);
    setDisable(true);
    setSubloading(true);
    }
  }
  const go=(id)=>{
    setShowid(id);
    setShowpage(false);
  }
  return(<>
     <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
     {loading && <><div id="loaders"></div></>}
 {showpage===true && <> <div id="team">
     {pokemon.map((item,index) => { return (
    <>
    {item.map((item)=>{
    if(item.id<650)
    return(<>
        <div id="card">
  <div id="image-box"><img src={item.sprites.other.dream_world.front_default} onClick={()=>go(item.id)} /></div>
 <div id="pokemon-name-box" ><h2 id="pokemon-name">{item.name[0].toUpperCase()+item.name.slice(1)}</h2></div>
          
            
    </div>
    </>)})}
    {index===pokemon.length-1 &&           <img src="images/5.png" style={{display:`${disable?"none":"block"}`}}id="more-btn" onClick={func}/>}
        {index===pokemon.length-1 && subloading &&
      <div id="loaers"></div>
    }
    </>)})}
    </div> </>}
  {showpage===false && <Show 
 searchdata={pokemon}  id={showid}  setPage={setShowpage} />
}
  </>)
};
export default Details;
