import { useState } from 'react'

import { AUTH_ACTIONS } from "../contex/authContext"

import { useAuthContext } from "./useMyContext"
import { useNewUserContext } from "./useMyContext"


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
            body : JSON.stringify({username_or_email , password})
        }

        const response = await fetch(process.env.SERVER + "/api/auth/login" , options )
        const json = await response.json()
        
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
    }

    return { login , isloading , error }
}