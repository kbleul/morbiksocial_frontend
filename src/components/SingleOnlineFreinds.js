import {useAuthContext} from "../customHooks/useMyContext"
import { useState , useEffect , useCallback } from 'react'

const SingleOnlineFriend = ({onlineuser_id , chatingwith , set_currentpage , set_chatingWith_name }) => {
    
    const  { user } = useAuthContext()
    const [  , set_chatingWith ] = chatingwith

    const [ currentuser , set_currentuser ] = useState(null)

const getOnlineUsers = useCallback( async () => {
    const options = {
        method : "Get",
        headers : { "Authorization": `Bearer ${user.token}` }
        }

    const response = await fetch( `https://morbiksocial-api.onrender.com/api/${onlineuser_id}`, options)
    const { _id , username, profilePicture } = await response.json()
        
        set_currentuser({ _id , username, profilePicture })
}, [ user.token , set_currentuser , onlineuser_id ])
  
useEffect(() => {  getOnlineUsers()  }, [getOnlineUsers])


 return (  <section className="w-full">
   { currentuser &&
        <div key={currentuser._id} className="w-full relative flex flex-col items-center" 
        onClick={() =>{ 
            set_chatingWith(currentuser._id)
            set_currentpage && set_currentpage("chatbox")
            set_chatingWith_name(currentuser.username)
        }}>
            <img className="max-w-[12rem] max-h-[10rem] w-3/5 h-40 lg:w-4/5 lg:h-48 rounded-full " src={`/public/data/uploads/${currentuser.profilePicture}`} alt={currentuser.username} />
            <p className="text-sm text-center w-full">{currentuser.username}</p>
            <p className="bg-green-400 w-3 h-3 rounded-full absolute top-[80%] left-[70%]"></p>
        </div>
    }
    </section>)
}


export default SingleOnlineFriend