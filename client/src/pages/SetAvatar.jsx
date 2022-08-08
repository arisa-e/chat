import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import loader from "../assets/loader.svg"
import { Buffer } from "buffer"
import { avatarRoute } from "../utils/APIRoutes"

const toastOptions={
  postion:"bottom-right",
  autoClose:8000,
  pauseOnHover:true,
  draggable:true,
  theme:"light"
}

const SetAvatar = () => {
  const api = 'https://api.multiavatar.com/45678945'
  const navigate = useNavigate()
  const [avatars, setavatars]=useState([])
  const [isLoading, setIsLoading]=useState(true)
  const [selectedAvatar, setselectedAvatar]=useState(undefined)

  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user"))
        navigate('/login')
    }, [navigate])

  const setProfilePic=async()=>{

    if(selectedAvatar === undefined){
      toast.error("Please select an avatar", toastOptions)
    }else{
      const user= await JSON.parse(localStorage.getItem("chat-app-user"))
      //need to be fixed 
      const {data}= await axios.post(`${avatarRoute}/${user._id}`,{
        image:avatars[selectedAvatar]
      })

      if(data.isSet){
        user.isAvatarImageSet=true
        user.avatarImage=data.image
        localStorage.setItem("chat-app-user", JSON.stringify(user))
        navigate("/")
      }else{
        toast.error("Error setting avatar, try again !", toastOptions)
      }
    }
  }
  useEffect(()=>{
    async function fetchData(){

      const data =[]
        for(let i=0; i<4; i++){
          const image = await axios.get(
            `${api}/${Math.round(Math.random()* 1000)}`
          )
          // Needs error handling
          const buffer= new Buffer(image.data)
          data.push(buffer.toString("base64"))
        }
        setavatars(data)
        setIsLoading(false)
    }
    fetchData()
    // console.log(fetchData())
  },[])


  return (
    <>
    {isLoading ?
      <div className="app_avatar">
        <img src={loader} alt="" className='loader'/>
      </div>
    :(
      <div className="app_avatar">
        <div className="title-container">
          <h1>Pick Your avatar as profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return(
            <div
              key={index} 
              className={`avatar ${selectedAvatar === index ?"selected":""}`}
            >
              <img src={`data:image/svg+xml;base64,${avatar}`} alt=""
              onClick={()=>setselectedAvatar(index)}
              />
            </div>
            )
          }
          )}
        </div>
        <button onClick={setProfilePic}>Set Avatar</button>
      </div>
    )} 
      <ToastContainer/>
    </>
  )
}

export default SetAvatar