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
  const url="https://pokeapi.co/api/v2/pokemon/";
  const fetchPlayer=async(p)=>{
    const res=await fetch(url+p);
    const data=await res.json();
    let item={
      name:data.name[0].toUpperCase()+data.name.slice(1),
      image:data.sprites.other.dream_world.front_default,
      attack:data.stats[1].base_stat,
      defense:data.stats[2].base_stat,
      speed:data.stats[5].base_stat
    }
    setPlayer([...player,item]);
    setTimeout(()=>{
     setCounts(counts+1);
    },100);
  }
  const fetchComputer=async(c)=>{
    const ress=await fetch(url+c);
    const datas=await ress.json();
        let items={
      name:datas.name[0].toUpperCase()+datas.name.slice(1),
      image:datas.sprites.other.dream_world.front_default,
      attack:datas.stats[1].base_stat,
      defense:datas.stats[2].base_stat,
      speed:datas.stats[5].base_stat
    }
    setComputer([...computer,items]);
  }
  useEffect(()=>{
    if(counts>0){
      let ppoint,cpoint;
      if(parameter==="Attack"){
        ppoint=player[player.length-1].attack;
        cpoint=computer[computer.length-1].attack;
      }
      if(parameter==="Defense"){
        ppoint=player[player.length-1].defense;
        cpoint=computer[computer.length-1].defense;
      }
      if(parameter==="Speed"){
   ppoint=player[player.length-1].speed;
        cpoint=computer[computer.length-1].speed;
      }
      
      if(ppoint===cpoint){
        setPcount(pcount);
        setCcount(ccount);
        setLoad(false);
      }
    if(ppoint>cpoint){
        setPcount(pcount+1);
        setCcount(ccount);
        setLoad(false);
      }
    if(ppoint<cpoint){
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
  const increase=()=>{
    setCount(count+1);
    setPlayer([]);
    setComputer([]);
    setLoad(true);
  }
  useEffect(()=>{
    setTimeout(()=>{
    if(count>0){
    let p=Math.floor(Math.random()*200)+1;
    let c=Math.floor(Math.random()*200)+1;
    let prevp=-1;
    let prevc=-1;
    if(p===c){
      p=c+1;
    }
    if(prevp===p){
      p=p+2;
    }
    if(prevc===c){
      c=c+2;
    }
    prevp=p;
     prevc=c;
    fetchPlayer(p);
    fetchComputer(c);
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
    {(round!==0 && parameter!=="") &&  <>
      {(round!==0 && parameter!=="" && pcount!=round && ccount!=round ) && <><button id="play-button" style={my} disabled={load} onClick={increase}>Play Card</button></>}
       <p id="choose-text">You choose {parameter} with {round} points.</p>
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