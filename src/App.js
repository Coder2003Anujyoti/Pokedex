import {HashRouter as Routers,
  Routes,Route,Link} from 'react-router-dom';
  import Play from './Project/Play';
  import Details from './Project/Details';
  import Home from './Project/Home';
  import React,{useState} from 'react'
  function App() {
    const [toggle,setToggle]=useState(false);
    const my={
      display:`${toggle?"flex":"none"}`
    }
    return (
      <> 
       <Routers>
        <div className="w-full h-24 bg-red-500 flex items-center gap-x-4 md:gap-x-72">
          <div className="p-1 mx-2 lg:hidden">
          <img src="images/pokeball.png" className="h-20 w-20" onClick={()=>setToggle(!toggle)}></img>
          </div>
           <div className="hidden lg:w-full  lg:flex lg:flex-row">
           <ul type="none" className="hidden lg:text-xl lg:w-full  lg:flex lg:flex-row lg:justify-evenly lg:text-white lg:font-extrabold">
          <li id="home"><Link id="link" 
           to="/">Home</Link></li>
        <li><Link id="link" to="/stats">Stats</Link></li>
         <li><Link id="link" to="/play">Play</Link></li>
          </ul>
        </div>
        </div>
           <div className="p-4 flex justify-center gap-y-8 font-extrabold text-white bg-red-500 " style={my}>
          <ul type="none" className="p-2 flex justify-center gap-y-8 font-extrabold text-white flex-col text-lg">
       <li id="home"><Link id="link" 
           to="/" onClick={()=>setToggle(false)}>Home</Link></li>
        <li><Link id="link" to="/stats" onClick={()=>setToggle(false)}>Stats</Link></li>
         <li><Link id="link" to="/play" onClick={()=>setToggle(false)}>Play</Link></li>
          </ul>
          </div>
      <Routes>
  <Route path="/" element={<Home/>} />
    <Route path="/stats" element={<Details/>} />
  <Route path="/play" element={<Play/>} />
    </Routes>
    </Routers>
      </>
    )
  }
  export default App