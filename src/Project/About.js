import Card from './Card';

import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import './About.css';
//import Card from './Card.js';
import { fetchTodos } from './todoSlice'
const About = () => {
  const [text,setText]=useState("");
  const [op,setOp]=useState([]);
  const [load,setLoad]=useState(true);
  const [page,setPage]=useState(false);
  const [id,setId]=useState(0);
  const [limits,setLimits]=useState(20);
const dispatch = useDispatch();
  const state = useSelector((state) => state);
  useEffect(()=>{
    dispatch(fetchTodos())
  },[]);
  useEffect(()=>{
    if(!state.todo.isLoading && limits<645){
       api();
    }
  },[state,limits])
  
    
    //const img=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    
  const open=(id)=>{
    setId(id);
    setPage(true);
  }
  const searchdata=state.todo.data.filter((item)=> item.name.toUpperCase().includes(text.toUpperCase()) )
  const searchop=op.map((item)=> {
  let k=item.filter((i)=>{
if(i.name.toUpperCase().includes(text.toUpperCase())){
  return i;
}});
  return k;})
  const call=(e)=>{
    setText(e.target.value);
  }
  const api=async()=>{
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${limits}&&limit=20`);
   const data=await res.json();
   const finaldata=data.results.map(async(curr)=>{
     const ress = await fetch(curr.url);
     const datas=ress.json();
     return datas;
   })
   
const detaileddata=await Promise.all(finaldata);
setOp([...op,detaileddata]);
setLoad(false);
setLimits(limits+20);
  }
  return (
    <>
      <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
    {page===false && <>
             {!state.todo.isLoading && <><input type="text" id="value" placeholder="Search for Pokemons..." value={text} onChange={(e)=>call(e)} />
      </> }
      {(state.todo.isLoading) && <><div id="loader"></div></>}
           <div id="names-container">
    <div id="name-container"> 
     {!state.todo.isLoading && <>
{searchdata.map((i) => { return (
    <>
      <div id="names">
        <div id="image-container">
    <img src={i.sprites.other.dream_world.front_default} onClick={()=>open(i.id)}></img></div>
    <div id="text-container">
        <h1>{i.name[0].toUpperCase()+i.name.slice(1)}</h1></div>
        </div>
        </>
      )})}
      </>}
           {!load && <>
{searchop.map((i) => {
return (
<>
{i.map((i)=>{
if(i.id<650){
return(
    <>
      <div id="naes">
        <div id="images-container">
    <img src={i.sprites.other.dream_world.front_default} onClick={()=>open(i.id)}></img></div>
    <div id="texts-container">
        <h1>{i.name[0].toUpperCase()+i.name.slice(1)}</h1></div>
        </div>
        </>
      )}})}
      </>)})}
      </>}
      </div>
      </div>
    {!state.todo.isLoading && searchdata.length===0  && searchop.length===0 && <>
      <h1 id="warning">No Pokemons Found</h1>
    </>
    }
    </>
    }
  {page===true && <>
       
    <Card searchdata={searchdata} searchop={searchop} id={id} setPage={setPage}/>
    </>}
    </>
  );
};

export default About;
