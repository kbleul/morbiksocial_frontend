import {  useState } from 'react'

import { AUTH_ACTIONS } from "../contex/authContext"
import { useAuthContext } from "./useMyContext"
import { useNewUserContext } from "./useMyContext"

import axios from "axios"


export const useSignup = () => {
    const [error , seterror] = useState(null)
    const [isloading , setisloading] = useState(null)
    
    const { dispatch } = useAuthContext()
    const { set_isnew } = useNewUserContext()

    const signup = async ( email , username , password ) => {
        seterror(null)
        setisloading(true)

            const response = await axios.post("https://morbiksocial-api.cyclic.app/api/auth/singup" , {
                "email" : email , 
                "username" : username ,
                "password" :  password
            })
     
            console.log("Signin json",response)
    
            if(response.data.error) {
                setisloading(false)
                seterror(response.data.error)
                return 
            }
    
            else { 
                //update new user just signed in state
                set_isnew(true)

                //save user to local storage
                localStorage.setItem("user" , JSON.stringify(response.data))
    
                // update auth context
                dispatch({ type : AUTH_ACTIONS.LOGIN , payload : response.data })
              
                setisloading(false)
                return
            }
        
    }

    return { signup , isloading , error }

}