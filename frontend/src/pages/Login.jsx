import React from "react";
import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signup, isSigningUp} = useAuthStore()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data = {
            email,
            password
        }
        await signup(data)
    }

    return (
      <div className="w-full h-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[80vw] rounded-xl border-2 border-gray-300 outline-none px-4 py-2 mb-4"
                placeholder="Email"
                 />
            </div>
            <div>
                <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[80vw] rounded-xl border-2 border-gray-300 outline-none px-4 py-2 mb-4"
                placeholder="password"
                 />
            </div>
            <button type="submit" className="text-white cursor-pointer rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    );
  };
  
  

export default Login;
