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
      
    const response = await axios.post("https://morbiksocial-api.cyclic.app/api/auth/login",{
            "username_or_email" : username_or_email,
            "password" : password,
         })

        if(response.data.error) {
            setisloading(false)
            seterror(response.data.error)
            return 
        }
        else {
            set_isnew(false)

            //save user to local storage
             localStorage.setItem("user" , JSON.stringify(response.data))
        
            // update auth context
            dispatch({ type : AUTH_ACTIONS.LOGIN , payload : response.data })
              setisloading(false)
         return 
        }      
  }

    return { login , isloading , error }
}