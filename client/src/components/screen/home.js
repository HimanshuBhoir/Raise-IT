import React from 'react'
import "./home.css"

function home() {
  return (
    <div className='home'>

      <div className='card home-card'>
        <h4>Raju Bhai</h4>
        
        <div className='card card-img'>
          <img style={{width:"600px", height:"300px"}}
          src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/03/13/801533-garbage-29.jpg" />
        </div>

        <div className='content'>
          <i className='material-icons'>favorite_border</i>
          <p>This is the content for the picture the problem
            or the report
          </p>
        </div>

        <div className='comment'>
          <input type="text" placeholder='Add a comment'/>
        </div>

      </div>





      <div className='card home-card'>
        <h4>Raju Bhai</h4>
        
        <div className='card-img'>
          <img style={{width:"600px", height:"300px"}}
          src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/03/13/801533-garbage-29.jpg" />
        </div>

        <div className='content'>
          <i className='material-icons'>favorite_border</i>
          <p>This is the content for the picture the problem
            or the report
          </p>
        </div>

        <div className='comment'>
          <input type="text" placeholder='Add a comment'/>
        </div>

      </div>




    </div>
  )
}

export default home