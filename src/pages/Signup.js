
import { useState , useRef } from 'react'
import loading from "../assets/loading/loading2.gif"
import { useSignup } from "../customHooks/useSignup"
import {  Link } from "react-router-dom"

const Signup = () => {

  const [ email , setemail ] = useState("")
  const [ username , setusername ] = useState("")
  const [ password , setpassword ] = useState("")
  const [ confirm_password , set_confirmpassword ] = useState("")
  const [ showerror , set_showerror ] = useState(false)

  const passinput = useRef()
  const confirminput = useRef()


  const { signup , isloading , error } = useSignup()


const handleSubmit = async (e) => {
    e.preventDefault()

    const ismatch = matchPasswords("handler")

      if( ismatch ) { await signup(email , username , password) }
}


const matchPasswords = type => {
    if(password !== confirm_password) {
      set_showerror(true)
      if(type === "pass") {  confirminput.current.focus()  }

      else if(type === "confirm") { passinput.current.focus() }

      else { set_confirmpassword("") }

    } 

    else { 
      set_showerror(false)
      return true 
    }

}

  return (
    <section className="bg-neutral-100 h-[93vh]">
       <Link to="/login"className="ml-8 md:ml-16 mt-12 pl-4 font-bold text-2xl md:text-3xl border-l-4 border-amber-300">Morbik Social</Link>

    <div className="flex flex-col w-[90%] md:w-[70%] lg:w-1/2 ml-[5%] md:ml-[15%] lg:ml-[25%] mt-[10vh] md:mt-[4%] shadow-lg bg-white">

      <form onSubmit={e => handleSubmit(e)} className="flex flex-col w-full">
        <input className="w-[90%] ml-[5%] md:w-4/5 md:ml-[10%] py-2 px-2 md:px-4 mt-8 border-2 border-gray-300 rounded-md mb-4 " type="text" value={email} placeholder="Email" name="email" onChange={e => setemail(e.target.value)} required/>

        <input className="w-[90%] ml-[5%] md:w-4/5 md:ml-[10%] py-2 px-2 md:px-4 mt-8 border-2 border-gray-300 rounded-md mb-4" type="text" value={username} placeholder="Username" name="username" onChange={e => setusername(e.target.value)} autoComplete="off" required/>

        <input className="w-[90%] ml-[5%] md:w-4/5 md:ml-[10%] py-2 px-2 md:px-4 mt-8 border-2 border-gray-300 rounded-md mb-4" type="password" value={password} min="8" placeholder="Password" name="password" ref={ passinput }
        onChange={e => setpassword(e.target.value) } onBlur={() => matchPasswords("pass")} autoComplete="off" required/>

        <input className="w-[90%] ml-[5%] md:w-4/5 md:ml-[10%] py-2 px-2 md:px-4 mt-8 border-2 border-gray-300 rounded-md mb-4" type="password" value={confirm_password} min="8" placeholder="Confirm Password" name="confirm" ref={ confirminput } onChange={e => set_confirmpassword(e.target.value)} onBlur={() => matchPasswords("pass")} required/>

        { error && <p className="text-red-600 text-sm w-4/5 ml-[10%] pt-[1%]">! {error}</p>}

        { showerror && <p className="text-red-600 text-sm w-4/5 ml-[10%] pt-[1%]">Passwords don't match</p>}

        { isloading && 
          <div className="flex justify-center items-center w-4/5  ml-[10%]">
            <img className="w-16 h-24 py-4" src={loading} alt="loading"/>
          </div>
        }

        <button className="w-1/2 md:w-2/5 ml-[25%] md:ml-[30%] mt-8 mb-10 md:mb-20 py-2 px-4 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-full">Signup</button>
      </form>

    </div>

    
  </section>
  )
}

export default Signup

