import React,{useState,useEffect} from "react";
import './Card.css';
const Card = ({searchdata,op,id,setPage}) => {
  
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
      <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
        {id<=50 && <><div id="first-data"> {searchdata.map((i,ind)=>{
          if(id===i.id)
         return(
         <>
        <div id="div" style={{
  backgroundColor:`${typeColor[i.types[0].type.name]}`
}}></div>
        <img src={i.sprites.other.dream_world.front_default}
          alt={i.name}
          className="pokemon-image"
        />
      <p className="pokemon-name">Name-: {i.name[0].toUpperCase()+i.name.slice(1)}</p>
        <p className="pokemon-info-type">
        Type-: {i.types.map((curType) => curType.type.name).join(", ")}
      </p>
        <p className="pokemon-info-one">
          <span> Height:</span> {i.height}
        </p>
        <p className="pokemon-info-two">
          <span> Weight:</span> {i.weight}
        </p>
        <p className="pokemon-info-three">
          <span> Experience:</span> {i.base_experience}
        </p>
          <p className="pokemon-info-four">
          <span> Attack: </span> {i.stats[1].base_stat}
        </p>
      <p className="pokemon-info-five">
          <span> Defense: </span> {i.stats[2].base_stat}
        </p>
       <p className="pokemon-info-six">
          <span> Speed: </span> {i.stats[5].base_stat}
        </p>
          <p className="pokemon-info-abilities">
          Ability-: {i.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0,1)
              .join(", ")}
          </p>
         </>
         )
       })
       }</div> </>}
      {id>50 && <> <div id="second-data"> {op.map((i,ind)=>{
      if(id===i.id)
         return(
         <>
        <div id="div" style={{
  backgroundColor:`${typeColor[i.types[0].type.name]}`
}}></div>
        <img src={i.sprites.other.dream_world.front_default}
          alt={i.name}
          className="pokemon-image"
        />
      <p className="pokemon-name">Name-: {i.name[0].toUpperCase()+i.name.slice(1)}</p>
        <p className="pokemon-info-type">
        Type-: {i.types.map((curType) => curType.type.name).join(", ")}
        </p>
        <p className="pokemon-info-one">
          <span> Height:</span> {i.height}
        </p>
        <p className="pokemon-info-two">
          <span> Weight:</span> {i.weight}
        </p>
        <p className="pokemon-info-three">
          <span> Experience:</span> {i.base_experience}
        </p>
        <p className="pokemon-info-four">
          <span> Attack: </span> {i.stats[1].base_stat}
        </p>
      <p className="pokemon-info-five">
          <span> Defense: </span> {i.stats[2].base_stat}
        </p>
       <p className="pokemon-info-six">
          <span> Speed: </span> {i.stats[5].base_stat}
        </p>
           
          <p className="pokemon-info-abilities">
          Ability-: {i.abilities
              .map((abilityInfo) => abilityInfo.ability.name)
              .slice(0, 1)
              .join(", ")}
          </p>
    

         </>
         )
       })
       }</div></>}
       <button id="go-back" onClick={()=>setPage(false)}>X</button>
    </>
  );
}
export default Card;
