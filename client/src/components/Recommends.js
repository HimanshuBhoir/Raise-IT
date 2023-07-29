import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App';
import Recom from './screen/Recom'
import Recent from './screen/Recent'
import './screen/Recom.css'

function Recommends() {

  const [data, setData] = useState([])
  const {state} = useContext(UserContext)


useEffect(()=>{
    if(state){
      return(
        fetch('https://raise-it-1li7.onrender.com/allposts',{
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
    <div className='notif' style={{padding:"10px"}}>
      <>
      {data && state
      ?
      <Recent />
      :
      ""
      }
      </>
      <>
      {data && state
      ?
      <Recom />
      :
      ""
      }
      </>
      
    </div>
  )
}

export default Recommends