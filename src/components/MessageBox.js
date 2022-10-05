import { useState } from "react"
import { useMediaQuery } from 'react-responsive';

import MessagesView from "./MessagesView"
import MessageForm from "./MessageForm"


const MessageBox = ({ chatingwith , socket , arrivalmessage , chatingWith_name }) => {

    const [ messages , set_messages ] = useState([])
    const isMobileDevice = useMediaQuery({  query: "(max-device-width: 768px)",  });

    return(<article className={isMobileDevice ? "h-[78vh]" : "h-[87.2vh]"}>
            <MessagesView chatingwith={chatingwith} allmessages = {[messages , set_messages]} arrivalmessage={arrivalmessage} chatingWith_name={chatingWith_name}/>
            <MessageForm chatingwith={chatingwith} allmessages = {[messages , set_messages]} socket={socket}/>
        </article>)
}

export default MessageBox