import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App';
import Recom from './screen/Recom'

function Recommends() {

  const [data, setData] = useState([])
  const {state} = useContext(UserContext)


useEffect(()=>{
    if(state){
      return(
        fetch('http://localhost:5000/allposts',{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then(res=>res.json())
        .then(result => {
          // console.log(result)
          setData(result.post)
        })
      )   
    }
},[])

  return (
    <div className='notify'>
      {data && state
      ?
      <Recom />
      :
      ""
      }
    </div>
  )
}

export default Recommends