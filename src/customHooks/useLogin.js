import { useState } from 'react'

import { AUTH_ACTIONS } from "../contex/authContext"

import { useAuthContext } from "./useMyContext"
import { useNewUserContext } from "./useMyContext"

import axios from "axios"


export const useLogin = () => {
    
    const { dispatch } = useAuthContext()
    const { set_isnew } = useNewUserContext()

    const [error , seterror] = useState(null)
    const [isloading , setisloading] = useState(null)


    const login = async ( username_or_email , password ) => {
        seterror(null)
        setisloading(true)

         const options = {
             method : "POST",
             headers : { "content-Type" : "application/json" },
             body : JSON.stringify({
               "username_or_email" : username_or_email,
               "password" : password,
            })
         }
        
    try {
    const response = await axios.post("https://morbiksocial-api.onrender.com/api/auth/login",{
            "username_or_email" : username_or_email,
            "password" : password,
         })

    const json = await response.json()

    console.log("json",json)
            if(!response.ok) {
                setisloading(false)
                seterror(json.error)
                return null
            }
    
            else {
                set_isnew(false)
    
                //save user to local storage
                localStorage.setItem("user" , JSON.stringify(json))
    
                // update auth context
                dispatch({ type : AUTH_ACTIONS.LOGIN , payload : json })
                setisloading(false)
    
                return json
            }
    } catch(error) { console.log("error",error)}
       
  }

    return { login , isloading , error }
}