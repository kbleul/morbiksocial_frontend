import { useRef , useEffect , useState , useCallback } from "react"
import {io} from "socket.io-client"
import { useMediaQuery } from 'react-responsive';

import {useAuthContext} from "../customHooks/useMyContext"
import {useNotificContext} from "../customHooks/useMyContext"

import  OnlineFriends  from "../components/OnlineFriends"
import  Friends  from "../components/Friends"
import  MessageBox  from "../components/MessageBox"

import ChatMobileVersion from "./mobileVersion/ChatMobileVersion"

const Chat = () => {

  const  { user } = useAuthContext()
  const  { set_chatnotifications } = useNotificContext()

  const [ chatingwith , set_chatingwith ] = useState(null)
  const [ chatingWith_name , set_chatingWith_name ] = useState(null)
  const [ arrivalmessage , set_arrivalmessage ] = useState(null)
  const [ onlineusers , set_onlineusers ] = useState([])
  const [ friends, setfriends ] = useState([])

  const socket = useRef()
  const isMobileDevice = useMediaQuery({  query: "(max-device-width: 768px)",  });

const addNotification = useCallback( async(senderId) => {
   const options = {
      method : "Get",
      headers : { "Authorization": `Bearer ${user.token}` }
    }

    const response = await fetch(`https://morbiksocial-api.cyclic.app/api/${senderId}` , options)

    if(response.ok) {
      const {username} = await response.json()
      set_chatnotifications(prev => [...prev , `${username} send you a message`])
    }
},[user.token,set_chatnotifications])


useEffect(() => { 
  socket.current = io( "wss://morbik-social-socket.glitch.me/" , {
    headers : {  "user-agent" : "Mozilla"  }
})  

  socket.current.on("getMessage", data => {
    set_arrivalmessage({
      sender : data.senderId,
      text : data.text,
      createdAt : Date.now()
    })
    addNotification(data.senderId)
  })

}, [addNotification])

useEffect(() => {
      socket.current.emit("addUser" , user._id)

      socket.current.on("getUsers", (users) => {
        let temp = []
        users.forEach(u => temp.push(u.userId))
        set_onlineusers(temp.filter(t => user.following.includes(t)));     
      });
      
}, [user])


  return (<main className=""> { isMobileDevice ? 
    <article>
       <ChatMobileVersion chatingwith={chatingwith} set_chatingwith={set_chatingwith} socket={socket} arrivalmessage={arrivalmessage} onlineusers={onlineusers} set_onlineusers={set_onlineusers} friends={friends} setfriends={setfriends} set_chatingWith_name={set_chatingWith_name} chatingWith_name={chatingWith_name} /> 
    </article>
            :
    <article className="flex">

        <section className="w-1/4 lg:w-[29%] lg:mr-[1%]">
          <OnlineFriends chatingwith={[chatingwith , set_chatingwith]} onlineusers={onlineusers} set_chatingWith_name={set_chatingWith_name} />
        </section>

        <section className="w-[50%] mt-from-nav shadow-2xl">
          <MessageBox chatingwith={[chatingwith , set_chatingwith]} socket={socket} arrivalmessage={arrivalmessage}  chatingWith_name={chatingWith_name}/>
        </section>

        <section className="w-1/4 lg:w-[19%] lg:ml-[1%]">
          <Friends chatingwith={[chatingwith , set_chatingwith]} relation={[friends, setfriends]} onlineUsers={[onlineusers , set_onlineusers]} set_chatingWith_name={set_chatingWith_name} />
        </section>

    </article>
    }
    </main>
  )
}

export default Chat