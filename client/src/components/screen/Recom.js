import React, { useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./Recom.css"

function Recom() {

  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    fetch('http://localhost:5000/recom',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result => {
      console.log(result)
      setData(result.user)
    })
  },[])

  return (
    <div className='notify'>
      <h5 className='rm'>Recommended</h5>
        {
          data.map(item => {
            return(
              <div className='recoms'>
                <Link to= {"/profile/" + item._id} className='rem'
                onClick={() => {navigate("/profile/" + item._id)}}
                >
                <img  classname="card prof-photo" src={item.photo}
                style={{marginLeft:"3px",marginRight:"3px", width:"20px", height:"20px", borderRadius:"50px"}}
                />
                {item.name}
              </Link>
              <br/>
              </div>
            )
          })
        }
      
    </div>
  )
}

export default Recom