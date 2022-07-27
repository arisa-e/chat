import React, { useState } from 'react'
import axios from "axios"
import chat from "../assets/chat.png"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {authRoute} from "../utils/APIRoutes"

const initialState={
    userName:"",
    email:"",
    password:"",
    confirmPassword:"",
}
const toastOptions={
    postion:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"light"
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignUp, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(handleValidation()){
            const { userName, password, email } = form
            const {data}=await axios.post(authRoute, {
                userName,email, password
            })
        }
    }

    const handleValidation=()=>{
        const {userName, password, confirmPassword, email }=form
        if(userName.length < 3){
            toast.error("UserName is short", toastOptions)
            return false
        }else if(password !== confirmPassword){
            toast.error("Passwords Dont Match", toastOptions)
            return false
        }
        else if (password.length < 8){
            toast.error("Password should be greater than 8 characters", toastOptions)
            return false
        }else if (email === ""){
            toast.error("Fill email field ", toastOptions)
            return false
        }
        return true
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }


  return (
    <div className="auth__form-container">
        <div className="auth__form-cantainer_fields">
            <img src={chat} alt="chat" />
            <div className="auth__form-container_fields-content">
                <p>{isSignUp ?"Sign Up":"Sign In"}</p>
                <form onSubmit={handleSubmit}>
                    <div className="auth__form-cointiner_fields-content_input">
                            <label htmlFor="userName">User Name</label>
                            <input 
                                type="text"
                                name="userName"
                                placeholder="User Name"
                                onChange={(e)=>handleChange(e)}
                                required    
                            />
                    </div>
                    {isSignUp &&(
                        <div className="auth__form-cointiner_fields-content_input">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e)=>handleChange(e)}
                                required    
                            />
                        </div>
                    )}
                    <div className="auth__form-cointiner_fields-content_input">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={(e)=>handleChange(e)}
                            required    
                        />
                    </div>
                    {isSignUp &&(
                        <div className="auth__form-cointiner_fields-content_input">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input 
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={(e)=>handleChange(e)}
                                required    
                            />
                        </div>
                    )}
                    <div className="auth__form-container_fields-content-button">
                        <button>{isSignUp?"Sign Up":"Sign In"}</button>
                    </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <p>
                        {isSignUp ?"Already have an account? ":"Dont have an account? "}
                        <span onClick={switchMode}>
                            {isSignUp ?"Sign In":"Sign Up"}
                        </span>
                    </p>
                </div>
                <ToastContainer/>
            </div>
        </div>
    </div>
  )
}

export default Auth