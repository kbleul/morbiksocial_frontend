const ChatMobileVersion = ({ chatingwith , set_chatingwith , socket , arrivalmessage , onlineusers , set_onlineusers , friends, setfriends , chatingWith_name , set_chatingWith_name}) => {

    const [ currentpage , set_currentpage ] = useState("chatbox")
  
    return (
      <article className="mt-[9.1rem]">
          <section className="font-content-spliter flex pb-2">
            <button className={currentpage==="online" ? "w-1/2 text-center text-red-400 cursor-pointer" : "cursor-pointer w-1/2 text-center"} onClick={() => set_currentpage("online")} >
              {onlineusers.length} Online</button>
            <button className={currentpage==="friends" ? "w-1/2 text-center text-red-400 cursor-pointer": "cursor-pointer w-1/2 text-center"} onClick={() => set_currentpage("friends")}>
              {friends.length} Friends</button>
          </section>
  
          <section className="w-full shadow-2xl">
           { currentpage === "chatbox" && 
           <MessageBox chatingwith={[chatingwith , set_chatingwith]} socket={socket} arrivalmessage={arrivalmessage} chatingWith_name={chatingWith_name} /> }
  
           { currentpage === "friends" && 
           <Friends chatingwith={[chatingwith , set_chatingwith]} relation={[friends, setfriends]} onlineUsers={[onlineusers , set_onlineusers]} set_currentpage={set_currentpage} set_chatingWith_name={set_chatingWith_name} /> }
  
           { currentpage === "online" && 
           <OnlineFriends chatingwith={[chatingwith , set_chatingwith]} onlineusers={onlineusers} relation={[friends, setfriends]} set_currentpage={set_currentpage} set_chatingWith_name={set_chatingWith_name} /> }
          </section>
      </article>
    )
  } 
  
  
  export default ChatMobileVersion