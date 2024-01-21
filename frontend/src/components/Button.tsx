import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Button = () => {
    const navigate = useNavigate()
    return (
        <button className="transition duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-110 
        bg-brunswick-green rounded-lg px-3 py-2 font-extrabold text-white"
        onClick={() => {navigate("/")}}>
            Go Home
            </button>
        
    );
  }
  
  export default Button