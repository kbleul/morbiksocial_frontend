import { useEffect , useCallback } from "react"
import { useMediaQuery } from 'react-responsive';

import { useAuthContext } from "../customHooks/useMyContext"


const Friends = ({ chatingwith , relation , onlineUsers , set_currentpage , set_chatingWith_name }) => {

    const  { user  } = useAuthContext()

    const [  , set_chatingWith ] = chatingwith
    const [friends, setfriends] = relation
    const [onlineusers] = onlineUsers

    const isMobileDevice = useMediaQuery({ query: "(max-device-width: 768px)", });


const fetchRelationships = useCallback( async () => {

    const options = {
            method : "GET",
            headers: { "Authorization" : `Bearer ${user.token}` },
    }

    const response = await fetch( `https://morbiksocial-api.onrender.com/api/following` , options)

    const json = await response.json()

            if(response.ok) { setfriends(json) }
            
}, [user.token , setfriends ] )

const handleChatwith =  (id , uname) => {
    set_chatingWith(id)
    set_chatingWith_name(uname)
    set_currentpage && set_currentpage("chatbox")
}

useEffect(() => {  fetchRelationships()  }, [fetchRelationships])

useEffect(() => {
    setfriends(prev => prev.filter(f => !onlineusers.includes(f._id)))
},[onlineusers , setfriends])


    return(<article className={!isMobileDevice && "mt-28 "}>

   {!isMobileDevice && <h3 className="mt-4 mb-2 text-center text-xl font-content-spliter font-bold">{friends.length} Friends</h3>}

    <section className="h-[79vh] border-t-2 overflow-y-hidden hover:overflow-y-scroll">

        { friends.map(tempf => (
            <div key={tempf._id} className={isMobileDevice ? "w-full flex  items-center  pl-12 my-[7%] cursor-pointer" : "w-full flex  items-center md:pl-[17%] lg:mr-4 mt-[8%] cursor-pointer hover:bg-gray-100" }
                onClick={() => handleChatwith(tempf._id , tempf.username)}>
                <img className="w-12 h-12 rounded-full" src={`/public/data/uploads/${tempf.profilePicture}`} alt={tempf.username} />
                <p className="w-full text-left text-base pl-4">{tempf.username}</p>
            </div>
        ))}

    </section>
        
  </article>)
}

export default Friends