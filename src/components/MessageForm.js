import { useState } from "react"
import { useMediaQuery } from 'react-responsive';
import { useAuthContext } from "../customHooks/useMyContext"

const MessageForm = ({ chatingwith , allmessages , socket }) => {
    
    const { user } = useAuthContext()

    const [ message , set_message] = useState("")
    const [ chatingWith  ] = chatingwith
    const [  , set_messages ] = allmessages

    const isMobileDevice = useMediaQuery({ query: "(max-device-width: 768px)", });
    

const sendMessage = async ( json ) => {
    const options = {
          method : "POST",
          body : JSON.stringify({conversationId : json._id ,sender : user._id , text : message }),
          headers :  {
               "Authorization": `Bearer ${user.token}`,
               "content-Type": "application/json"
          },
     }

     socket.current.emit("sendMessage", {            
          senderId : user._id,
          receiverId :chatingWith,
          text : message
     })

    const response = await fetch(`/api/message/`, options)

     if(response.ok) { 
          const jsontwo = await response.json()
          set_messages(prev => [...prev , jsontwo])
          set_message("")
     }

}

const processSendMessage = async () => {

     let options = {
          method : "GET",
          headers : { "Authorization": `Bearer ${user.token}` }
          }
     
     let response = await fetch(`api/conversation/between/${user._id}/${chatingWith}`, options)
     let json = await response.json()

     if(json !== null) { await sendMessage(json) } 
     else {
          options = {
               method : "POST",
               headers : { 
                    "Authorization": `Bearer ${user.token}`,
                    "content-Type": "application/json" 
               },
               body : JSON.stringify({senderId : user._id , receiverId : chatingWith })
          }

     response = await fetch(`/api/conversation`, options)

         if(response.ok) 
          { 
               json = await response.json()
               await sendMessage(json)
          }
     }
}

    return(<article className={isMobileDevice ? "h-[10vh] flex items-center ml-1" : "h-[20%] flex items-center" }>
             <textarea value={message} onChange={e => set_message(e.target.value)} placeholder="Message ..." className={isMobileDevice ? "py-1 border-b-2 focus:outline-0 outline-0 w-11/12 h-full px-2 mr-2 border" : "text-xl py-2 border-b-2 focus:outline-0 outline-0 w-11/12 h-full px-2 mr-2 border" } />

             <button onClick={processSendMessage} className={isMobileDevice ? "bg-green-700 border-none hover:bg-green-800 rounded-full w-8 h-8 flex justify-center items-center mr-2" : "bg-green-700 border-none hover:bg-green-800 rounded-full w-12 h-12 flex justify-center items-center mr-2"  } disabled={chatingWith === null ? true : false}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={isMobileDevice ? "1.2em" : "1.8rem"} height={isMobileDevice ? "1.2em" : "1.8rem"} preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="white" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576L6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76l7.494-7.493Z"/></svg>
             </button>
        </article>)
}

export default MessageForm