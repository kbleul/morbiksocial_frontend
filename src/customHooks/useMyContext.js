import { useContext } from "react"
import { AuthContext } from "../contex/authContext"
import { PostContext } from "../contex/postContext"
import { NewuserContext } from "../contex/newSignupContext"
import { NotificContext } from "../contex/notificationContext"


export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("useAuthContext must be used inside of a AuthContextProvider")
    }

    return context
}

export const usePostContext = () => {
    const context = useContext(PostContext)

    if(!context) {
        throw Error("usePostContext must be used inside of a PostContextProvider")
    }

    return context
}

export const useNewUserContext = () => {
    const context = useContext(NewuserContext)

    if(!context) {
        throw Error("useAuthContext must be used inside of a AuthContextProvider")
    }

    return context
}

export const useNotificContext = () => {
    const context = useContext(NotificContext)

    if(!context) {
        throw Error("useNotificContext must be used inside of a NotificContextProvider")
    }

    return context
}