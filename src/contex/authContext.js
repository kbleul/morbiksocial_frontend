import { createContext , useReducer , useEffect } from "react"

export const AuthContext = createContext()

export const AUTH_ACTIONS = {
    "LOGIN" : "LOGIN",
    "LOGOUT" : "LOGOUT",
    "UPDATE_INFO" : "UPDATE_INFO",
}

const authReducer = ( state , action ) => {

    switch(action.type) {
        case AUTH_ACTIONS.LOGIN : 
            return { user : action.payload}
        
        case AUTH_ACTIONS.LOGOUT :
            return { user : null }

        case AUTH_ACTIONS.UPDATE_INFO :
            return { user : action.payload }
        
        default : return state
    }
}

const AuthContextProvider = ( { children } ) => {

    const [ state , dispatch ] = useReducer( authReducer , { user : null} )

const updateUser = async (id , token) => {
    
    const options = {
        method : "GET",
        headers : { "Authorization" : `Bearer ${token}` }
    }

    const response = await fetch(`https://morbiksocial-api.onrender.com/api/user/${id}` , options )
    const json = await response.json()

    const newuser = { ...json , token }
    dispatch({type : AUTH_ACTIONS.LOGIN ,  payload : newuser})
}

    useEffect(() => {  
        const user = JSON.parse(localStorage.getItem("user"))

        if(user) {
            dispatch({type : AUTH_ACTIONS.LOGIN ,  payload : user})
            updateUser(user._id , user.token)
        }
    }, [] )

    return(
        <AuthContext.Provider value= { {...state , dispatch}}>
            { children }
        </AuthContext.Provider>
    )

}

export default AuthContextProvider