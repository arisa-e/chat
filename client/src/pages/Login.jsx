import React, { useState, useEffect } from 'react'
import axios from "axios"
import chat from "../assets/chat.png"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, Link } from 'react-router-dom'
import { loginRoute } from '../utils/APIRoutes'

const initialState={
    userName:"",
    password:"",
}
const toastOptions={
    postion:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"light"
}

const Login = () => {
    const [form, setForm] = useState(initialState);
    const navigate= useNavigate()
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
          navigate("/");
        }
      }, [navigate]);
    
      const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };

      const validateForm = () => {
        const { userName, password } = form;
        if (userName === "") {
          toast.error("Email and Password is required.", toastOptions);
          return false;
        } else if (password === "") {
          toast.error("Email and Password is required.", toastOptions);
          return false;
        }
        return true;
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
          const { userName, password } = form;
          const { data } = await axios.post(loginRoute, {
            userName,
            password,
          });
          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem(
              "chat-app-user",
              JSON.stringify(data.user)
            );
    
            navigate("/");
          }
        }
      };
  return (
    <div className="auth__form-container">
        <div className="auth__form-cantainer_fields">
            <img src={chat} alt="chat" />
            <div className="auth__form-container_fields-content">
                <p>Login</p>
                <form onSubmit={(e)=>handleSubmit(e)}>
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
                    <div className="auth__form-container_fields-content-button">
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <span> Dont have an account? <Link
                    className="link"
                    to ="/signup">
                            Sign up
                        </Link>
                    </span>
                </div>
                <ToastContainer/>
            </div>
        </div>
    </div>
  )
}

export default Login