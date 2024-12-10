import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import './About.css';
import { fetchTodos } from './todoSlice'
const About = () => {
  const [text,setText]=useState("");
const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(()=>{
    dispatch(fetchTodos());
  },[]);
  
  const searchdata=state.todo.data.filter((item)=> item.name.toUpperCase().includes(text.toUpperCase()) )
  return (
    <>
      <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      {state.todo.isLoading && <><div id="loader"></div></>}
     {!state.todo.isLoading && <>
        <input type="text" id="value" placeholder="Search for Pokemons..." value={text} onChange={(e)=>setText(e.target.value)} />
       <div id="names-container">
    <div id="name-container"> {searchdata.map((i) => { return (
    <>
      <div id="names">
        <div id="image-container">
    <img src={i.sprites.other.dream_world.front_default}></img></div>
    <div id="text-container">
        <h1>{i.name[0].toUpperCase()+i.name.slice(1)}</h1></div>
        </div>
        </>
      )})}
      </div>
      </div>
      </>}
    {!state.todo.isLoading && searchdata.length===0 && <>
      <h1 id="warning">No Pokemons Found</h1>
    </>
    }
    </>
  );
};

export default About;
