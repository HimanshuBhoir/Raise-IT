import "./App.css"
import React,{useState, useEffect, createContext, useReducer, useContext} from "react";
import Sidebar from "./components/Sidebar";
import Recommends from "./components/Recommends";
import {BrowserRouter, Routes, Route, useNavigate, useParams, Link} from 'react-router-dom'
import Signin from "./components/screen/signin"
import Home from "./components/screen/Home"
import Trending from "./components/screen/Trending"
import Signup from "./components/screen/signup"
import Profile from "./components/screen/profile"
import Issue from "./components/screen/post"
import Search from "./components/screen/Search"
import Explore from "./components/screen/Explore"
import Reports from "./components/screen/Reports"
import More from "./components/screen/More"
import {initialState,reducer} from './reducers/userReducer'
import Userprofile from "./components/screen/Userprofile"

export const UserContext = createContext()

const Routing = () => {
  
  const navigate = new useNavigate()
  const width = window.innerWidth
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      // dispatch({type:"USER", payload:user})
      navigate('/')
    }else{
      navigate('/signin')
    }
  },[])

  return(
    <Routes>
      <Route path = "/" element = {<Signin/>}/>
      <Route path = "/signin" element = {<Signin/>}/>
      <Route path = "/home" element = {<Home/>}/>
      <Route path = "/reports" element = {<Reports/>}/>
      <Route path = "/signup" element = {<Signup/>}/>
      <Route exact path = "/profile" element = {<Profile/>}/>
      <Route path = "/profile/:userid" element = {<Userprofile/>}/>
      <Route path = "/post" element = {<Issue/>}/>
      <Route path = "/trending" element = {<Trending/>}/>
      <Route path = "/more" element = {<More/>}/>
      <Route path = "/explore" element = {<Explore/>}/>
      <Route path = "/Search" element = {<Search/>}/>
    </Routes>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [width, setWidth]   = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      console.log(width + " " + height)
  }


  return (
    <div className="app">
      <UserContext.Provider value = {{state, dispatch}}>
      <BrowserRouter>
        <div>
          <Sidebar />
        </div>
        <div>
          <Routing className = "compo" />
        </div>
        
        {
        (width > 450) ? <Recommends/> : ""

        }
      </BrowserRouter>

      </UserContext.Provider>
    </div>

  );
}

export default App;
