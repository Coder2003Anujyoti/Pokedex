import React,{ useState, useEffect } from 'react'; 

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
     let offset=Math.floor(Math.random()*640);
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
      {(round===0 || parameter==="") && <>
    <div className="flex flex-col  my-36 gap-y-8 md:flex-row 
    md:justify-center md:gap-x-28 md:my-28">
    <div className="flex flex-row gap-x-2 justify-center">
  <h2 className="text-black font-bold text-lg">Select Points:</h2>
  <select className="w-30 h-30 rounded-sm bg-black text-white font-bold rounded-sm"onChange={(e)=>toss(e)}>
    <option disabled={over}>Select</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
      <option value="25">25</option>
      <option value="30">30</option>
    </select>
  </div>
      <div className="flex flex-row gap-x-2 justify-center">
      <h2 className="text-black font-bold text-lg">Select Modes:</h2>
  <select id="select-modes" className="w-30 h-30 rounded-sm bg-black text-white font-bold rounded-sm" onChange={(e)=>tosses(e)}>
    <option disabled={overs}>Select</option>
      <option value="Attack">Attack</option>
      <option value="Defense">Defense</option>
      <option value="Speed">Speed</option>
    </select>
    </div>
    </div>
    </>}


{parameter!='' && round!=''&&
     <>
      <div className="w-full flex justify-center"> <p className=" text-lg font-bold ">You choose {parameter} with {round} point(s).</p></div>
         {load && <><div className="font-bold absolute top-[255px] left-[150px] md:left-[455px] ">Loading...</div></>}
      {loads &&  <><div className=" font-bold absolute top-[255px] left-[150px] md:left-[455px] ">Loading...</div></>}
     <div className="my-60 justify-around w-full flex">
       <h1 className="font-bold">Player-:{pcount}</h1>
    <h1 className="font-bold">Computer-:{ccount}</h1></div>
       </>}
    {load==false && <> <div className="flex-col justify-center absolute top-40 left-[25px] md:left-[180px]">
        {player.map((i,ind)=>{
        if(ind===player.length-1)
          return(<>
           <img src={i.image} id="player-image" className="w-24 h-24"></img>
          <p className="font-bold relative top-12 left-0 md:left-6">{i.name}</p>
    {parameter==="Attack" && <h3 className="font-bold my-12 relative left-0 md:absolute md:left-6">Attack-:{i.attack}</h3>}
    {parameter==="Defense" && <h3 className="font-bold my-12 relative left-0  md:left-6">Defense-:{i.defense}</h3>}
      {parameter==="Speed" && <h3 className="font-bold my-12 relative left-0 md:left-6">Speed-:{i.speed}</h3>}
          </>)
          
        })}

      </div>
      </>}
        {load==false && <> <div className="flex-col justify-center absolute top-40 left-[225px] md:left-[661px]">
        {computer.map((i,ind)=>{
        if(ind===player.length-1)
          return(<>
           <img src={i.image} className="w-24 h-24"></img>
           <p className="font-bold relative top-12 left-0 md:left-6">{i.name}</p>
    {parameter==="Attack" && <h3 className="font-bold my-12 relative left-0 md:left-6">Attack-:{i.attack}</h3>}
    {parameter==="Defense" && <h3 className="font-bold my-12 relative left-0 md:left-6">Defense-:{i.defense}</h3>}
      {parameter==="Speed" && <h3 className="font-bold my-12 relative left-4 md:left-0 md:left-6">Speed-:{i.speed}</h3>}
          </>)
        })}
      </div>
      </>}
          {(round!==0 && parameter!=="") && <>
      {(round!==0 && parameter!==""   && click===false ) && <>
        <div className="absolute top-[490px] md:top-[420px] md:left-[120px]">
        <button className="w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full px-36 mx-32 md:mx-80" onClick={fun}>Play</button></div></>}
      {(round!==0 && parameter!=="" && pcount!=round && ccount!=round && load===false) &&  <div className="w-full flex flex-row flex-wrap absolute top-[420px] mx-0 gap-x-2 gap-y-2 md:px-24 md:gap-x-4 ">{pokemons.map((i)=>{
        if(playerchoice!==i.id)
        return(
        <>
        <img src={i.sprites.other.dream_world.front_default} className="h-16 w-16" id="iamg" onClick={()=>increase(i.id)} />
        </>
        )
      })}</div>}
        {ccount==round && round!=0 && <><h2 className="text-lg font-bold absolute top-[420px] left-[110px] md:left-[420px]">Computer Win!!!</h2></>}
      {pcount==round && round!=0 &&
     <><h2 id="pinfo" className="text-lg font-bold absolute top-[420px] left-[130px] md:left-[420px]">Player Win!!!</h2></>}
    </>}
    
  </>
  );
};
export default Play;