import "./App.css"
import React,{useEffect, createContext, useReducer, useContext} from "react";
import Sidebar from "./components/Sidebar";
import {BrowserRouter, Routes, Route, useNavigate, useParams} from 'react-router-dom'
import Signin from "./components/screen/signin"
import Home from "./components/screen/Home"
import Trending from "./components/screen/Trending"
import Signup from "./components/screen/signup"
import Profile from "./components/screen/Profile"
import Issue from "./components/screen/post"
import Search from "./components/screen/Search"
import Explore from "./components/screen/Explore"
import Reports from "./components/screen/Reports"
import Notification from "./components/screen/Notification"
import {initialState,reducer} from './reducers/userReducer'
import Userprofile from "./components/screen/Userprofile"

export const UserContext = createContext()

const Routing = () => {
  
  const navigate = new useNavigate()
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
      <Route path = "/notification" element = {<Notification/>}/>
      <Route path = "/explore" element = {<Explore/>}/>
      <Route path = "/Search" element = {<Search/>}/>
    </Routes>
  )
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

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
      </BrowserRouter>

      </UserContext.Provider>
    </div>

  );
}

export default App;
