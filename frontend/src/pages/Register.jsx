import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react'
import { useAuthStore } from '../../store/AuthStore';

const Register = () => {

  const { authUser , register } = useAuthStore()

  const validateForm = () => {
    if (!username.trim()) return toast.error("Username is required");     
    if (!email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Email is invalid");
    if (!password.trim()) return toast.error("Password is required");
    if(password.length < 6) return toast.error("Password must be at least 6 characters long")
        return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password
    }
    const success = validateForm();
    if(success === true) {
      await register(data)
      setEmail("")
      setPassword("")
      setUsername("")
    }
    else return;
  }

   const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [username, setUsername] = useState("");
     return (
       <div className="w-full h-full flex items-center justify-center">
         <form onSubmit={handleRegister} className="flex flex-col gap-4">
             <div>
                 <input 
                 type="text"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 className="w-[80vw] rounded-xl border-2 border-gray-300 outline-none px-4 py-2 mb-4"
                 placeholder="Username"
                  />
             </div>
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
             <button type="submit" className="text-white cursor-pointer rounded-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">create account</button>
         </form>
       </div>
     );
   };
   
   


export default Register