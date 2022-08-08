import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import chat from "../assets/chat.png"
import { signupRoute } from "../utils/APIRoutes";

export default function Signup() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, userName, email } = form;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (userName.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, userName, password } = form;
      const { data } = await axios.post(signupRoute, {
        userName,
        email,
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
    <>
<div className="auth__form-container">
        <div className="auth__form-cantainer_fields">
            <img src={chat} alt="chat" />
            <div className="auth__form-container_fields-content">
                <p>Sign Up</p>
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
                    <div className="auth__form-container_fields-content-button">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                <div className="auth__form-container_fields-account">
                    <span> Already have an account? <Link
                    className="link"
                    to ="/login">
                            Login
                        </Link>
                    </span>
                </div>
                <ToastContainer/>
            </div>
        </div>
    </div>
      <ToastContainer />
    </>
  );
}
