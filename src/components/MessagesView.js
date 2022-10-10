import { useEffect , useRef , useCallback } from "react"
import { useAuthContext } from "../customHooks/useMyContext"
import { useMediaQuery } from 'react-responsive';

const MessagesView = ({ chatingwith , allmessages , arrivalmessage , chatingWith_name }) => {

    const { user } = useAuthContext()
    const [ chatingWith  ] = chatingwith
    const [ messages , set_messages ] = allmessages

    const scrollRef = useRef();
    const isMobileDevice = useMediaQuery({ query: "(max-device-width: 768px)",  });


const getChat = useCallback( async () => {
      let options = {
          method : "GET",
          headers : { "Authorization": `Bearer ${user.token}` }
          }

     let response = await fetch(`https://morbiksocial-api.cyclic.app/api/conversation/between/${user._id}/${chatingWith}`, options)

     let json = await response.json()

     if(json !== null) {
      response = await fetch(`https://morbiksocial-api.cyclic.app/api/message/${json._id}` , options)

      if(response.ok) {
          json = await response.json()
          set_messages(json)
      }

    } else {   set_messages([])   }

},[user.token , user._id , set_messages , chatingWith ])


useEffect(() => { if(chatingWith !== null) { getChat() }  },[chatingWith , getChat])

useEffect(() => { 
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

useEffect(() => {
    arrivalmessage &&  chatingWith === arrivalmessage.sender &&
    set_messages(prev => [...prev , arrivalmessage])
    
},[arrivalmessage , chatingWith , set_messages])


  return(<article className={isMobileDevice ? "h-[68vh] overflow-y-hidden hover:overflow-y-scroll bg-gray-100 relative" : "h-[80%] overflow-y-hidden hover:overflow-y-scroll bg-gray-100 relative"}>

  <h3 className="w-full md:w-1/2 text-center text-xl font-bold text-gray-300 mb-2 font-mono fixed">{chatingWith_name}</h3>
    {!chatingWith && <p className="w-full text-center text-4xl font-bold text-gray-300 mt-20">Pick a friend</p>}
    {(chatingWith && messages.length === 0) && <p className="w-full text-center text-4xl font-bold text-gray-300 mt-20">No messages yet</p>}


    {messages.map(message => (
            <div key={message._id} ref={scrollRef} className={message.sender === user._id ? "flex flex-col items-end mb-3 " : "mb-3 "}>
              <p className={message.sender === user._id ? "w-[80%] px-4 py-3 bg-red-600 text-white  rounded-2xl" : "w-[80%] px-4 py-3 bg-teal-600 text-white rounded-2xl "}>{message.text}</p>
              <p className={message.sender === user._id ? "w-2/5 text-sm text-gray-300 px-2 text-end" : "w-2/5 text-sm text-gray-300 px-2 "}>{message.createdAt}</p>
            </div>
         ))
    }
</article>)
}

export default MessagesView