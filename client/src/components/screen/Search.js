import React, {useState, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import M from 'materialize-css'
  

function Search() {

  const searchModel = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserdetails] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    M.Modal.init(searchModel.current)
  },[])

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('https://raise-it-1li7.onrender.com/search-user',{
      method: "post",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(result => {
      // console.log(result)
      setUserdetails(result.user)
    })
  }

  return (
    <div className='card srch'>

      <button data-target="modal1" class="btn modal-trigger">Search</button>

      <div id="modal1" className="modal" ref={searchModel}>
          <div className="modal-content">
            <input type="text" 
              placeholder='Search User'
              value={search}
              onChange={(e) => fetchUsers(e.target.value)} 
            />

            <ul class="collection">
              {userDetails.map(item => {
                return(
                  <>
                    <button onClick={() => navigate("/profile/"+item._id)}>{item.name}</button>
                    <hr/>
                  </>
                ) 
              })}
            </ul>

          </div>
          <div className="modal-footer">
          <button> Close </button>          
          </div>
        </div>
    </div>

  )
}

export default Search