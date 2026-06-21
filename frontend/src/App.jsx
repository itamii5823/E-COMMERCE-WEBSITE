import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function App() {


   const[userinfo,setuserinfo]=useState({username:"",password:"",email:""})
   const [newuser,setnewuser]=useState({username:"",password:"",email:""})
   const [theme,settheme]=useState(true)
   const [errorMsg, setErrorMsg] = useState("");
   const[err,seterr]=useState("");
   const navigate = useNavigate()

   function signvalue(e){
     const {name,value}=e.target;
     setnewuser({...newuser,[name]:value})
   }

   function change(e){
     const {name,value} =e.target;
     setuserinfo({...userinfo,[name]:value})
   }

   async function signup(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/signup",newuser,{withCredentials:true})
    if(res.data==="received"){  
       navigate("/prod");
    } else {
      setErrorMsg("User already exist")
    }
   }

   async function submit (e){
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/login", userinfo, { withCredentials: true });
    if (res.data === "done") {
        navigate("/prod");
    } else {
      setErrorMsg("User does not exist ")
    }
   }

   function changer(){
      settheme(!theme)
   }

  return (
    <div className="min-h-screen flex items-center justify-center 
    
    bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] relative overflow-hidden">

      {/* 🔴 glow background */}
      <div className="absolute w-96 h-96 bg-[#e23744]/30 blur-[120px] top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-pink-500/20 blur-[120px] bottom-10 right-10"></div>

      {/* CARD */}
      <div className="relative z-10 w-[90%] max-w-md 
      bg-white/10 backdrop-blur-2xl border border-white/20 
      rounded-3xl p-8 shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">DrinkStore</h1>
          <p className="text-gray-400 text-sm mt-1">
            {theme ? "Welcome back" : "Create your account"}
          </p>
        </div>
        {errorMsg && (
       <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-500/30 
       bg-red-500/10 px-4 py-3 text-red-300 shadow-[0_0_20px_rgba(220,38,38,0.2)]">

        <span className="text-xl"></span>

         <div>
      <p className="font-semibold">Error</p>
      <p className="text-sm opacity-80">{errorMsg}</p>
    </div>

  </div>
)}

        {/* SWITCH */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={changer}
            className="text-sm text-red-400 hover:text-red-300 transition">
            {theme ? "New here? Sign up" : "Already have account? Login"}
          </button>
        </div>

        {/* FORM */}
        {theme ? (

          <form onSubmit={submit} className="flex flex-col gap-4">

            <input 
              className="bg-[#020617] text-white border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e23744] outline-none transition"
              name="username" value={userinfo.username} onChange={change}
              placeholder="Username"
            />

            <input 
              className="bg-[#020617] text-white border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e23744] outline-none transition"
              name="email" value={userinfo.email} onChange={change}
              placeholder="Email"
            />

            <input 
              className="bg-[#020617] text-white border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e23744] outline-none transition"
              type="password"
              name="password" value={userinfo.password} onChange={change}
              placeholder="Password"
            />

            <button className="mt-2 bg-[#e23744] hover:bg-[#c92d39] 
            text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-red-500/20">
              Login
            </button>

          </form>

        ) : (

          <form onSubmit={signup} className="flex flex-col gap-4">

            <input 
              className="bg-[#020617] text-white border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e23744]"
              name="username" value={newuser.username} onChange={signvalue}
              placeholder="Username"
            />

            <input 
              className="bg-[#020617] text-white border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e23744]"
              name="email" value={newuser.email} onChange={signvalue}
              placeholder="Email"
            />

            <input 
              className="bg-[#020617] text-white border border-gray-600 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e23744]"
              type="password"
              name="password" value={newuser.password} onChange={signvalue}
              placeholder="Password"
            />

            <button className="mt-2 bg-[#e23744] hover:bg-[#c92d39] 
            text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-red-500/20">
              Sign Up
            </button>

          </form>

        )}

      </div>

    </div>
  )
}

export default App;