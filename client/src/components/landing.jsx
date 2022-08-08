import React from 'react'
import robot from "../assets/robot.gif"

const Landing = ({currentUser}) => {
  return (
    <div className='landing'>
        <img src={robot} alt="" />
        {/* <h1>Welcome <span>{currentUser.userName}</span></h1> */}
    </div>
  )
}

export default Landing