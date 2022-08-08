import React, { useEffect, useState } from 'react'

const Contact = ({currentUser, contacts, changeChat}) => {
  const [currentUserName, setCurrentUserName]=useState(undefined)
  const [currentUserImage, setCurrentUserImage]=useState(undefined)
  const [currentSelected, setCurrentSelected]=useState(undefined)
  useEffect(()=>{
    if(currentUser){
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.userName)
    }
  }, [currentUser])

  const changeCurrentChat=(index, contact)=>{
    setCurrentSelected(index)
    changeChat(contact)
    
  }

  return (
    <>
      {currentUserName && (
        <div className="contact-container">
          <div className="brand">
            <img src="" alt="" />
            <h3>Arisa</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index)=>{
              return(
                <div 
                onClick={()=>changeCurrentChat(index, contact)}
                  className={`contact ${index === currentSelected ?"selected":""}`} 
                  key={index}>
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.userName}</h3>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact