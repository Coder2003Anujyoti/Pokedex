import React,{useState,useEffect} from "react";
const Show = ({searchdata,id,setPage}) => {
  
  const typeColor = {
  bug: "#26de81",
  dragon: "#ffeaa7",
  electric: "#fed330",
  fairy: "#FF0069",
  fighting: "#30336b",
  fire: "#f0932b",
  flying: "#81ecec",
  grass: "#00b894",
  ground: "#EFB549",
  ghost: "#a55eea",
  ice: "#74b9ff",
  normal: "#95afc0",
  poison: "#6c5ce7",
  psychic: "#a29bfe",
  rock: "#2d3436",
  water: "#0190FF",
};

  
  return (
    <>
       
        {id  && <><div className="w-full flex flex-column flex-wrap justify-around my-4   "> {searchdata.map((i,ind)=>{
         return(
         <>
        {i.map((i,ind)=>{
        if(i.id===id)
        return(<>
         <div className="flex flex-col justify-center md:gap-x-8  md:justify-evenly md:flex-row">
                  <div className="rounded-lg" style={{
  backgroundColor:`${typeColor[i.types[0].type.name]}`
}}>
        <img src={i.sprites.other.dream_world.front_default}
          alt={i.name}
          className="w-64 h-64"
        />
        </div>
       <div className="  flex flex-col justify-center text-lg font-bold ">
    <div className="w-full flex justify-center"><p className="text-lg font-bold  md:text-lg">Name-: {i.name[0].toUpperCase()+i.name.slice(1)}</p></div>
           <div className="w-full flex justify-center text-lg font-bold"> <p className="pokemon-info-type">
        Type-: {i.types.map((curType) => curType.type.name).join(", ")}
      </p></div>
     <div className="w-full flex justify-center text-lg font-bold">  <p className="pokemon-info-abilities">
          Ability-: {i.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0,1)
              .join(", ")}
          </p></div>
          </div>
    <div className="flex flex-row gap-x-4">
      <div className="p-4  flex flex-col text-lg  font-bold justify-center">
       <div> <p className="pokemon-info-one">
          <span> Height:</span> {i.height}
        </p></div>
       <div> <p className="pokemon-info-two">
          <span> Weight:</span> {i.weight}
        </p></div>
        <div><p className="pokemon-info-three">
          <span> Experience:</span> {i.base_experience}
        </p></div>
        </div>
     <div className="p-4  flex flex-col text-lg font-bold justify-center">
          <p className="pokemon-info-four">
          <span> Attack: </span> {i.stats[1].base_stat}
        </p>
      <p className="pokemon-info-five">
          <span> Defense: </span> {i.stats[2].base_stat}
        </p>
       <p className="pokemon-info-six">
          <span> Speed: </span> {i.stats[5].base_stat}
        </p>
        </div>
        </div>
        </div>
        </>)})}
         </>
         )
       })
       }</div> </>}
      <div className="w-full  flex justify-center"><button className=" text-black font-bold text-xl md:text-2xl " onClick={()=>setPage(true)}>X</button></div>

    </>
  );
}
export default Show;