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
        
    // try {
    const response = await axios.post("https://morbiksocial-api.cyclic.app/api/auth/login",{
            "username_or_email" : username_or_email,
            "password" : password,
         })
console.log("response",response)
console.log("data",response.data)
console.log("user error",response.data.user)

        if(response.data.error) {
            setisloading(false)
            seterror(json.error)
            return null
        }
        else {
            set_isnew(false)

            //save user to local storage
             localStorage.setItem("user" , JSON.stringify(response.data))
        
            // update auth context
            dispatch({ type : AUTH_ACTIONS.LOGIN , payload : json })
              setisloading(false)
         return response.data
        }
    // const json = await response.json()

    // console.log("Login json",json)
    //     if(!response.statusText === "OK") {
    //         setisloading(false)
    //         seterror(json.error)
    //         return null
    //     }

    //     else {
    //         set_isnew(false)

    //         //save user to local storage
    //         localStorage.setItem("user" , JSON.stringify(json))

    //         // update auth context
    //         dispatch({ type : AUTH_ACTIONS.LOGIN , payload : json })
    //         setisloading(false)

    //         return json
    //     }
    // } catch(error) { 
    //     console.log("Login error ",error)
    //     console.log("Login message ",error.message)
    //     console.log("Login error msg",error.response.data.error)


    //     // let temperr  = JSON.parse(error)
    //     // seterror(temperr.response.data.response)
    //     // console.log("Login error 2",temperr.response.data.response)
    // }
       
  }

    return { login , isloading , error }
}