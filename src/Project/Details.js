import Show from './Show';
import React ,{useState,useEffect} from "react";
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
     {loading && <><div id="loaders" className="my-48 font-bold text-lg flex justify-center md:my-32">Page is Loading...</div></>}
 {showpage===true && <> <div className="w-full flex flex-row flex-wrap justify-around my-4 gap-x-4 gap-y-4 md:flex-row md:gap-x-2 md:flex-wrap md:justify-start
 ">
     {pokemon.map((item,index) => { return (
    <>
    {item.map((item)=>{
    if(item.id<650)
    return(<>
        <div id="card" className="mx-4 border-4  rounded-lg shadow-lg shadow-slate-500/30 hover:scale-105 font-bold hover:ease-in-out duration-300">
  <img src={item.sprites.other.dream_world.front_default} onClick={()=>go(item.id)} className="h-32 w-32"/>
<div className="flex rounded-sm justify-center"><h2 className="text-sm font-bold md:text-xl ">{item.name[0].toUpperCase()+item.name.slice(1)}</h2>
         </div> 

    </div>
    </>)})}
    {index===pokemon.length-1 &&     <> <div className="w-full justify-center flex "> <img src="images/5.png" style={{display:`${disable?"none":"block"}`}}
    className="h-8 w-8 md:mx-8 md:h-12 md:w-12 "
    onClick={func}/></div></>}
        {index===pokemon.length-1 && subloading &&
      <div id="loaers" className="my-2  flex justify-center w-full font-bold text-lg flex justify-center md:text-xl ">Items are Loading...</div>
    }
    </>)})}
    </div> </>}
  {showpage===false && <Show 
 searchdata={pokemon}  id={showid}  setPage={setShowpage} />}
  </>)
};
export default Details;