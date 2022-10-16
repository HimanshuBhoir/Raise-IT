import React, { useEffect} from 'react'
import useState from 'react-hook-use-state';
import "./home.css"

function Home() {

  const [data, setData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/allpost',{
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
    <div className='home'>
      {
        data.map(item =>{
          return( 
            <div className='card home-card'>
            <h4>{item.postedById.name}</h4>
            
            <div className='card card-img'>
              <img style={{width:"600px", height:"300px"}}
              src={item.photo} />
            
            </div>

            <div className='content'>
              <i className='material-icons'>favorite_border</i>
              <h6><b>{item.title}</b></h6>
              <p>{item.body}</p>
            </div>

            <div className='comment'>
              <input type="text" placeholder='Add a comment'/>
            </div>

          </div>
          )
        })
      }

    </div>
  )
}

export default Home