import { createContext , useState } from "react"

export const NotificContext = createContext()

const NotificContextProvider = ({ children }) => {

    const [ chatnotifications , set_chatnotifications ] = useState([])
    const [ othernotifications , set_othernotifications ] = useState([])


    return( 
    <NotificContext.Provider value = { { chatnotifications , set_chatnotifications , othernotifications , set_othernotifications } }>
        { children }
    </NotificContext.Provider> )
}

export default NotificContextProvider