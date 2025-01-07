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
    <div className="flex flex-col  my-36 gap-y-8 lg:flex-row 
    md:justify-center md:gap-x-28 md:my-28">
    <div className="flex flex-row gap-x-2 justify-center">
  <h2 className="text-black font-bold text-lg md:text-xl ">Select Points:</h2>
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
      <h2 className="text-black font-bold text-lg md:text-xl ">Select Modes:</h2>
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
      <div className="w-full  flex justify-center"> <p className=" text-lg font-bold md:text-xl ">You choose {parameter} with {round} point(s).</p></div>
         {load && <><div className="font-bold w-full  flex justify-center">Loading...</div></>}
      {loads &&  <><div className=" font-bold w-full flex justify-center ">Loading...</div></>}

        <div className="w-full h-48 flex justify-center items-center md:my-8 ">
        <div className='w-full flex justify-around gap-x-32 md:gap-x-32 md:justify-center'>{load==false && <> <div className="flex-col justify-center ">
        {player.map((i,ind)=>{
        if(ind===player.length-1)
          return(<>
           <img src={i.image} id="player-image" className="w-24 h-24 md:w-32 md:h-32"></img>
         <div className='flex justify-center md:text-xl'><p className="font-bold">{i.name}</p></div>
         <div className='flex justify-center md:text-xl '>
    {parameter==="Attack" && <h3 className="font-bold ">Attack-:{i.attack}</h3>}
    {parameter==="Defense" && <h3 className="font-bold ">Defense-:{i.defense}</h3>}
      {parameter==="Speed" && <h3 className="font-bold ">Speed-:{i.speed}</h3>}</div>
          </>)
          
        })}

      </div>
      </>}
      {load==false && <> <div className="flex-col justify-center">
        {computer.map((i,ind)=>{
        if(ind===player.length-1)
          return(<>
           <img src={i.image} className="w-24 h-24 md:w-32 md:h-32"></img>
           <div className='flex justify-center md:text-xl '><p className="font-bold">{i.name}</p></div>
           <div className='flex justify-center md:text-xl'>{parameter==="Attack" && <h3 className="font-bold  md:text-xl ">Attack-:{i.attack}</h3>}
    {parameter==="Defense" && <h3 className="font-bold md:text-xl ">Defense-:{i.defense}</h3>}
      {parameter==="Speed" && <h3 className="font-bold md:text-xl  ">Speed-:{i.speed}</h3>}</div>
    
          </>)
        })}
      </div>
      </>}
        </div>
        
        
        
        
        </div>
     <div className="  justify-around gap-x-32 w-full flex md:gap-x-44 md:justify-center md:my-8 md:text-xl ">
       <h1 className="font-bold">Player-:{pcount}</h1>
    <h1 className="font-bold">Computer-:{ccount}</h1></div>
     <div className="w-full flex flex-row flex-wrap my-2 justify-center items-start gap-x-4 gap-y-4  md:my-12">{ (pcount!=round && ccount!=round && load===false) && pokemons.map((i)=>{
        if(playerchoice!==i.id)
        return(
        <>
        <img src={i.sprites.other.dream_world.front_default} className="h-16 w-16 md:w-28 md:h-28" id="iamg" onClick={()=>increase(i.id)} />
        </>
        )
      })}
      {ccount==round && round!=0 && <><div className='flex justify-center'><h2 className="text-lg font-bold md:text-xl  ">Computer Win!!!</h2></div></>}
      {pcount==round && round!=0 &&
     <><div className='flex justify-center'><h2 id="pinfo" className="text-lg font-bold md:text-xl ">Player Win!!!</h2></div></>}
     {click==false && <><div className='flex items-center'><button className="w-24 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded-full" onClick={fun}>Play</button></div></>}
      </div>
       </>}
    
  </>
  );
};
export default Play;