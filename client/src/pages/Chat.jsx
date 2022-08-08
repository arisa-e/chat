import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import axios from "axios"
import { allUsersRoute } from "../utils/APIRoutes"
import { Contact, Landing } from '../components'

const Chat = () => {
  const [contacts, setContacts]=useState([])
  const [currentUser, setCurrentUser]=useState(undefined)
  const navigate = useNavigate()
  const [currentChat, setCurrentChat]=useState(undefined)

  useEffect(() => {
    async function getUser(){
      if(!localStorage.getItem("chat-app-user")){
        navigate("")
      }else{
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
      }
    }
    getUser()
  }, [navigate])

  useEffect(()=>{
    async function fetchData(){
      if(currentUser){
        if(currentUser.isAvatarImageSet){
          const data =await axios.get(`${allUsersRoute}/${currentUser._id}`)
          setContacts(data.data)
        }else{
          navigate("/setAvatar")
        }
      }
    }
    fetchData()
  }, [currentUser, navigate])

  const handleChatChange=(chat)=>{
    setCurrentChat(chat)
  }
  return (
    <div className="chat">
      <div className="chat-container">
        <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        <Landing currentUser={currentUser}/>
      </div>
    </div>
  )
}

export default Chat