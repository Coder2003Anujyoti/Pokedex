import React,{ useState, useEffect } from 'react'; 
import './Play.css';
const Play = () => {
  const [round,setRound]=useState(0);
  const [over,setOver]=useState(false);
  const [parameter,setParameter]=useState("");
  const [overs,setOvers]=useState(false);
  const [count,setCount]=useState(0);
  const [player,setPlayer]=useState([]);
  const [computer,setComputer]=useState([]);
  const [load,setLoad]=useState(false);
  const [pcount,setPcount]=useState(0);
  const [ccount,setCcount]=useState(0);
  const [counts,setCounts]=useState(0);
  const [winner,setWinner]=useState("");
  const [pnumber,setPnumber]=useState(-1);
  const [cnumber,setCnumber]=useState(-1);
  const [pokemons,setPokemons]=useState([]);
  const [playerchoice,setPlayerchoice]=useState(-1);
  const [rand,setRand]=useState(0);
  const [loads,setLoads]=useState(false);
  const [click,setClick]=useState(false);
  const url="https://pokeapi.co/api/v2/pokemon/";
  const fetchAll=async()=>{
    try {
     let offset=Math.floor(Math.random()*440);
      const resmain = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&&limit=10`);
      const resdata = await resmain.json();
      //   console.log(data);

      const detailedPokemonData = resdata.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      //   console.log(detailedPokemonData);

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemons(detailedResponses);
      setLoads(false);
      setRand(offset);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchData=async(p,c)=>{
    try{
    const [res,ress]=await Promise.all([fetch(url+p),fetch(url+c)]) ;
    const data=await res.json();
    const datas=await ress.json();
    let item={
      name:data.name[0].toUpperCase()+data.name.slice(1),
      image:data.sprites.other.dream_world.front_default,
      attack:data.stats[1].base_stat,
      defense:data.stats[2].base_stat,
      speed:data.stats[5].base_stat
    };
    let items={
      name:datas.name[0].toUpperCase()+datas.name.slice(1),
      image:datas.sprites.other.dream_world.front_default,
      attack:datas.stats[1].base_stat,
      defense:datas.stats[2].base_stat,
      speed:datas.stats[5].base_stat
    };
    setComputer([...computer,items]);
    setPlayer([...player,item]);
    setPnumber(p);
    setCnumber(c);
    setTimeout(()=>{
     setCounts(counts+1);
    },100);
    }
    catch(err){
      alert(err);
    }
  }
  useEffect(()=>{
    if(click===true)
    fetchAll();
  },[click]);
  const fun=()=>{
    setLoads(true);
    setClick(true);
  }
  useEffect(()=>{
    if(counts>0){
      const ppoint=player.map((i,ind)=>{
        if(ind===player.length-1 && parameter==="Attack"){
          return i.attack;
        }
        else if(ind===player.length-1 && parameter==="Defense"){
          return i.defense;
        }
        else if(ind===player.length-1 && parameter==="Speed"){
          return i.speed;
        }
      });
      const cpoint=computer.map((i,ind)=>{
        if(ind===computer.length-1 && parameter==="Attack"){
          return i.attack;
        }
        else if(ind===computer.length-1 && parameter==="Defense"){
          return i.defense;
        }
        else if(ind===computer.length-1 && parameter==="Speed"){
          return i.speed;
        }
      });
      
      if(ppoint[0]===cpoint[0]){
        setPcount(pcount);
        setCcount(ccount);
        setLoad(false);
      }
    if(ppoint[0]>cpoint[0]){
        setPcount(pcount+1);
        setCcount(ccount);
        setLoad(false);
      }
    if(ppoint[0]<cpoint[0]){
        setPcount(pcount);
        setCcount(ccount+1);
        setLoad(false);
      }
      
    }
  },[counts])
  const toss=(e)=>{
    setRound(e.target.value);
    setOver(true);
  }
  const tosses=(e)=>{
    setParameter(e.target.value);
    setOvers(true);
  }
  const increase=(id)=>{
    setPlayerchoice(id);
    setCount(count+1);
    setLoad(true);
    setPlayer([]);
    setComputer([]);
  }
  useEffect(()=>{
    setTimeout(()=>{
    if(count>0){
    let c=Math.floor(Math.random()*9)+(rand+1);
    if(playerchoice===c && c!==rand+10)
    {
      c=playerchoice+1;
      
    }
    if(playerchoice===c && c===rand+10){
      c=rand+1;
    }
    fetchData(playerchoice,c);
    }},1000);
  },[count])
  const my={
    display:`${load?"none":"flex"}`
  }
  if(pcount===round && round>0){
    alert(true)
  }
  else if(ccount===round && round>0){
    alert(false)
  }
  
  return (
    <>
      <meta name="viewport" content= "width=device-width, user-scalable=no" />
      {(round===0 || parameter==="") && <>
  <h2 id="points">Select Points:</h2>
  <select id="select-points" onChange={(e)=>toss(e)}>
    <option disabled={over}>Select</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="25">25</option>
      <option value="30">30</option>
    </select>
      <h2 id="modes">Select Modes:</h2>
  <select id="select-modes" onChange={(e)=>tosses(e)}>
    <option disabled={overs}>Select</option>
      <option value="Attack">Attack</option>
      <option value="Defense">Defense</option>
      <option value="Speed">Speed</option>
    </select>
    </>}
{load && <><div id="loads"></div></>}
{loads &&  <><div id="loads"></div></>}
    {(round!==0 && parameter!=="") && <>
      {(round!==0 && parameter!==""   && click===false ) && <><button id="play-button" onClick={fun}>Play</button></>}
      {(round!==0 && parameter!=="" && pcount!=round && ccount!=round && load===false) &&  <div id="player-option">{pokemons.map((i)=>{
        if(playerchoice!==i.id)
        return(
        <>
        <img src={i.sprites.other.dream_world.front_default} id="iamg" onClick={()=>increase(i.id)} />
        </>
        )
      })}</div>}
       <p id="choose-text">You choose {parameter} with {round} point(s).</p>
       <h1 id="p-icon">Player-:{pcount}</h1>
       <h1 id="c-icon">Computer-:{ccount}</h1>
    {load==false && <> <div id="player-card">
        {player.map((i,ind)=>{
        if(ind===player.length-1)
          return(<>
           <img src={i.image} id="player-image"></img>
          <p>{i.name}</p>
    {parameter==="Attack" && <h3>Attack-:{i.attack}</h3>}
    {parameter==="Defense" && <h3>Defense-:{i.defense}</h3>}
      {parameter==="Speed" && <h3>Speed-:{i.speed}</h3>}
          </>)
          
        })}

      </div>
      </>}
        {load==false && <> <div id="computer-card">
        {computer.map((i,ind)=>{
        if(ind===player.length-1)
          return(<>
           <img src={i.image} id="computer-image"></img>
           <p>{i.name}</p>
    {parameter==="Attack" && <h3>Attack-:{i.attack}</h3>}
    {parameter==="Defense" && <h3>Defense-:{i.defense}</h3>}
      {parameter==="Speed" && <h3>Speed-:{i.speed}</h3>}
          </>)
        })}
      </div>
      </>}
      {ccount==round && round!=0 && <><h2 id="cinfo">Computer Win!!!</h2><button id="reload-btn" onClick={()=>window.location.reload()}>Restart</button></>}
      {pcount==round && round!=0 &&
     <><h2 id="pinfo">Player Win!!!</h2><button id="reload-btn" onClick={()=>window.location.reload()}>Restart</button></>}
    </>}
  </>
  );
};
export default Play;