import { useState } from 'react'
import { Link } from "react-router-dom"

import { AUTH_ACTIONS } from "../../contex/authContext"
import { POST_ACTIONS } from "../../contex/postContext"

import { useAuthContext } from "../../customHooks/useMyContext"
import { usePostContext } from "../../customHooks/useMyContext"
import { useNotificContext } from "../../customHooks/useMyContext"


const SecondaryNav = () => {

  const { user , dispatch } = useAuthContext()
  const {  dispatch : post_dispatch   } = usePostContext()
  const { chatnotifications , set_chatnotifications } = useNotificContext()

  const [ menuon , set_menuon] = useState(false)
  const [ notificationon , set_notificationon ] = useState(false)



const logout = () => {
  localStorage.removeItem("user")
  
  dispatch({ type : AUTH_ACTIONS.LOGOUT })
  post_dispatch({ type : POST_ACTIONS.CLEAR })
}

  return (<article className="">
    <section className="flex justify-center" >

        <div className="w-1/2 py-2 flex items-center">

          <button onClick={() => { 
            set_notificationon(false)
            set_menuon(prev_menuon => !prev_menuon) 
          }} >
            <svg  className="ml-4 md:ml-8" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h24M4 16h24M4 24h24"/></svg>
          </button>

          <Link to="/chat" className="ml-8 md:ml-16 relative"  onClick={() => {
            set_menuon(false) 
            set_notificationon(false)
          }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="11" r="1" fill="currentColor"/><circle cx="16" cy="11" r="1" fill="currentColor"/><circle cx="8" cy="11" r="1" fill="currentColor"/><path fill="currentColor" d="M19 3H5a3 3 0 0 0-3 3v15a1 1 0 0 0 .51.87A1 1 0 0 0 3 22a1 1 0 0 0 .51-.14L8 19.14a1 1 0 0 1 .55-.14H19a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Zm1 13a1 1 0 0 1-1 1H8.55a3 3 0 0 0-1.55.43l-3 1.8V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"/></svg>
          </Link>

          <button className="ml-8 md:ml-16 relative" 
            onClick={() => {
              set_menuon(false) 
              set_notificationon(prev => !prev)
              notificationon && set_chatnotifications([])
            }}>
             <svg  xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="white" d="M32.51 27.83A14.4 14.4 0 0 1 30 24.9a12.63 12.63 0 0 1-1.35-4.81v-4.94A10.81 10.81 0 0 0 19.21 4.4V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.33 10.73v4.94a12.63 12.63 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93a1 1 0 0 0-.34.75v1.36a1 1 0 0 0 1 1h27.8a1 1 0 0 0 1-1v-1.36a1 1 0 0 0-.34-.75ZM5.13 28.94a16.17 16.17 0 0 0 2.44-3a14.24 14.24 0 0 0 1.65-5.85v-4.94a8.74 8.74 0 1 1 17.47 0v4.94a14.24 14.24 0 0 0 1.65 5.85a16.17 16.17 0 0 0 2.44 3Z" className="clr-i-outline clr-i-outline-path-1"/><path fill="white" d="M18 34.28A2.67 2.67 0 0 0 20.58 32h-5.26A2.67 2.67 0 0 0 18 34.28Z" className="clr-i-outline clr-i-outline-path-2"/><path fill="none" d="M0 0h36v36H0z"/></svg>

             {chatnotifications.length > 0 && <p className="bg-red-600 text-center text-white font-bold text-sm w-fit h-5 rounded-full absolute top-0 left-[70%] px-2">{chatnotifications.length}</p>}
          </button>
          
        </div>

        <Link to={`/myhome/${user._id}`} className="w-1/2 flex justify-end items-center">
           <p className="w-4/5 justify-self-end text-white font-bold text-end pr-[2%]">{user.username}</p>
           <img src={user.profilePicture} alt="profile" className='w-10 h-10 rounded-full mr-4 md:mr-16'/>
        </Link>

    </section>
    
    { menuon &&
    <ul className="w-[90%] md:w-5/12 md:max-w-[15rem] md:ml-[2%] bg-slate-500 text-center">
      <li className="px-4 py-2 w-full border-b border-gray-400 cursor-pointer "
          onClick={logout}>Logout</li>
    </ul>
    }

    { notificationon &&
      <ul className="w-[90%] md:w-5/12 md:max-w-[20rem] md:ml-[2%] bg-slate-500 text-center">
        {chatnotifications.map(tempn => (
          <li className="px-4 py-2 w-full border-b border-gray-400 cursor-pointer" key={tempn}> { tempn }</li>
        ))}

        {chatnotifications.length === 0 && 
          <li className="px-4 py-2 w-full border-b border-gray-400 cursor-pointer"> No new notifications</li> 
        }
      </ul>
      }

  </article>


    )
}

export default SecondaryNav