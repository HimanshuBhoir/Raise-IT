import React from 'react'
import './profile.css'

function profile() {
  return (
    <div className='profile'>

      <div className='prof'>
        <img src="https://images.generated.photos/Q5t7FpzIrfn_NOwU1AG8-eCzw80EgwNTDNB74NToO2Y/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NTY5MjAzLmpwZw.jpg" 
          style={{width:"80px", height:"100px", borderRaius:"50px"}} />
      </div>

      <div className='desc'>
        This is the description of profile
        2 post
      </div>

      <div className='self-posts'>
        <img className='item' style={{width:"100px", height:"150px", borderRaius:"50px", padding:"20px"}} 
        src="https://image.shutterstock.com/image-photo/damaged-asphalt-pavement-road-potholes-260nw-469582763.jpg"/>
        <img className='item' style={{width:"100px", height:"150px", borderRaius:"50px"}} 
        src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/03/13/801533-garbage-29.jpg"/>
      </div>

    </div>
  )
}

export default profile