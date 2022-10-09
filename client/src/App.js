import "./App.css"
import Sidebar from "./components/Sidebar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from "./components/screen/signin"
import Home from "./components/screen/home"
import Signup from "./components/screen/signup"
import Profile from "./components/screen/profile"
import Issue from "./components/screen/post"
// import NavBar from "./comps/navbar";


function App() {
  return (

    // Sample - 1[Components]

    <div className="app">
      
      <BrowserRouter>
      <Sidebar/>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/signin" element = {<Signin/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/profile" element = {<Profile/>}/>
          <Route path = "/post" element = {<Issue/>}/>
        </Routes>

      </BrowserRouter>
    </div>


    // Sample- 2 [comps]

    // <BrowserRouter>
    //   <NavBar/>
    //   <Routes>
    //   <Route path = "/" element = {<Home/>}/>
    //   <Route path = "/signin" element = {<Signin/>}/>
    //   <Route path = "/signup" element = {<Signup/>}/>
    //   <Route path = "/profile" element = {<Profile/>}/>
    //   <Route path = "/issue" element = {<Issue/>}/>
    //   </Routes>
    
    
    // </BrowserRouter>
    


  );
}

export default App;
