
import Play from './Project/Play';
import Details from './Project/Details';
import Home from './Project/Home';
import React,{useState} from 'react'

function App() {
  const [toggle,setToggle]=useState(false);
  const [toggleb,setToggleb]=useState(false);
  const [togglec,setTogglec]=useState(false);
  const [toggled,setToggled]=useState(false);
  return (
    <> 
      <div className="w-full h-24 bg-red-500 flex items-center gap-x-4 md:gap-x-72">
        <div className="p-1 mx-2">
        <img src="images/pokeball.png" className="h-20 w-20" onClick={()=>window.location.reload()}></img>
        </div>
        <div className="w-64 h-32 justify-center">
       <img src="images/Text.png"></img>
       </div>
       </div>
       {toggle==false && toggleb==false && togglec==false && toggled==false && <>
       <img src="images/Intro.jpg" className="w-full"></img>

        <div id="nav-bar" className="w-full bg-yellow-500 h-16 py-4">
        <ul type="none" className="flex justify-around font-bold text-xl">
        <li id="home"><a id="link" 
         onClick={()=>setToggle(true)}>Home</a></li>
      <li><a id="link" onClick={()=>setToggleb(true)}>Stats</a></li>
         <li><a id="link" onClick={()=>setToggled(true)}>Play</a></li>
        </ul>
        </div>
    <p className="text-sm font-medium p-2 md:px-4">Pokedex is an app created by Anujyoti De that offers a comprehensive database of Pokémon. It allows users to easily search, explore, and learn about different Pokémon species, their abilities, evolutions, and other important details. The app features an intuitive design, making it simple for Pokémon enthusiasts to access information, track progress, and enhance their knowledge. Whether you're a casual player or a dedicated fan, Pokedex serves as an essential tool for exploring the Pokémon universe, offering real-time updates and detailed stats to keep users engaged. It’s a perfect companion for any Pokémon fan.</p>
    </>}
    {toggle==true && <Home />}
    {toggleb== true && <Details />}
    {toggled==true && <Play />}
    </>
  )
}
export default App
