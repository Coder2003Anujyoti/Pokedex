import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import './About.css';
import { fetchTodos } from './todoSlice'
const About = () => {
  const [text,setText]=useState("");
  const [op,setOp]=useState([]);
  const [load,setLoad]=useState(true);
const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(()=>{
    dispatch(fetchTodos())
  },[]);
  useEffect(()=>{
    if(!state.todo.isLoading){
      api();
    }
  },[state])
  const searchdata=state.todo.data.filter((item)=> item.name.toUpperCase().includes(text.toUpperCase()) )
  const searchop=op.filter((item)=> item.name.toUpperCase().includes(text.toUpperCase()) )
  const call=(e)=>{
    setText(e.target.value);
  }
  const api=async()=>{
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon?offset=50&&limit=450`);
   const data=await res.json();
   const finaldata=data.results.map(async(curr)=>{
     const ress = await fetch(curr.url);
     const datas=ress.json();
     return datas;
   })
   
const detaileddata=await Promise.all(finaldata);
setOp(detaileddata);
setLoad(false);
  }
  return (
    <>
      <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
             {!load && <><input type="text" id="value" placeholder="Search for Pokemons..." value={text} onChange={(e)=>call(e)} />
      </> }
      {(state.todo.isLoading || load) && <><div id="loader"></div></>}
           <div id="names-container">
    <div id="name-container"> 
     {!state.todo.isLoading && <>
{searchdata.map((i) => { return (
    <>
      <div id="names">
        <div id="image-container">
    <img src={i.sprites.other.dream_world.front_default}></img></div>
    <div id="text-container">
        <h1>{i.name[0].toUpperCase()+i.name.slice(1)}</h1></div>
        </div>
        </>
      )})}
      </>}
           {!load && <>
{searchop.map((i) => { return (
    <>
      <div id="naes">
        <div id="images-container">
    <img src={i.sprites.other.dream_world.front_default}></img></div>
    <div id="texts-container">
        <h1>{i.name[0].toUpperCase()+i.name.slice(1)}</h1></div>
        </div>
        </>
      )})}
      </>}
      </div>
      </div>
    {!state.todo.isLoading && searchdata.length===0 && searchop.length===0 && <>
      <h1 id="warning">No Pokemons Found</h1>
    </>
    }
    </>
  );
};

export default About;
