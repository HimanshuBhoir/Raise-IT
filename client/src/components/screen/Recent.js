import React,{useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import '../screen/Recent.css'

function Recent() {

  const [data, setData] = useState([])
  // const {state} = useContext(UserContext)
  
  useEffect(()=>{
    fetch('https://raise-it-1li7.onrender.com/recent',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result => {
      // console.log(result)
      setData(result.posts)
    })
  },[])

  return (
    <div className="rec" style={{padding:"4px"}}>
        <h5 className='nm' style={{position:"fixed"}}>Recent</h5>
        {
            data.map(item => {
                return(
                    <div className='pst'>
                        {/* <br/> */}
                    <img 
                    style={{marginLeft:"10px",position:"fixed",width:"200px", height:"120px", borderRadius:"10px"}}
                    className='images'
                    src={item.photo} />
                    <br/>
                    <div className='postby' style={{marginLeft:"10px"}}>
                    <text className='usrm' style={{position:"fixed"}}>
                    Posted By :
                    <Link to ={"/profile/"+item.postedById._id}>
                    <img  classname="card prof-photo" src={item.postedById.photo}
                    style={{marginLeft:"3px",marginRight:"3px", width:"20px", height:"20px", borderRadius:"50px"}}
                    />
                    <text style={{color:"#1DA1F2"}}><i>{item.postedById.name}</i></text>
                    </Link>  
                    </text>
                    <text className='ed' style={{position:"fixed"}}> Title : <text style={{color:"#1DA1F2"}}><i>{item.title}</i></text></text>
                    </div>
                    
                    </div>
                )
            })
        }

    </div>
  )
}

export default Recent