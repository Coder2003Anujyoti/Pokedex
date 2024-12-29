import Play from './Project/Play';
import Details from './Project/Details';
import Home from './Project/Home';
import React,{useState} from 'react'

import './App.css';
function App() {
  const [toggle,setToggle]=useState(false);
  const [toggleb,setToggleb]=useState(false);
  const [togglec,setTogglec]=useState(false);
  const [toggled,setToggled]=useState(false);
  return (
    <> 
        <meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      <div id="container">
        <img src="images/pokeball.png" id="logo" onClick={()=>window.location.reload()}></img>
       <img src="images/Text.png" id="text"></img>
       </div>
       {toggle==false && toggleb==false && togglec==false && toggled==false && <>
       <img src="images/Intro.jpg" id="intro"></img>

        <div id="nav-bar">
        <ul type="none">
        <li id="home"><a id="link" 
         onClick={()=>setToggle(true)}>Home</a></li>
      <li><a id="link" onClick={()=>setToggleb(true)}>Stats</a></li>
         <li><a id="link" onClick={()=>setToggled(true)}>Play</a></li>
        </ul>
        </div>
    <p id="p">Pokedex is an app created by Anujyoti De that offers a comprehensive database of Pokémon. It allows users to easily search, explore, and learn about different Pokémon species, their abilities, evolutions, and other important details. The app features an intuitive design, making it simple for Pokémon enthusiasts to access information, track progress, and enhance their knowledge. Whether you're a casual player or a dedicated fan, Pokedex serves as an essential tool for exploring the Pokémon universe, offering real-time updates and detailed stats to keep users engaged. It’s a perfect companion for any Pokémon fan.</p>
    </>}
    {toggle==true && <Home />}
    {toggleb== true && <Details />}
    {toggled==true && <Play />}
    </>
  )
}
export default App

