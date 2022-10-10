import { useState } from "react"
import {  Link } from "react-router-dom"

import { useAuthContext} from "../customHooks/useMyContext"

import { AUTH_ACTIONS } from "../contex/authContext"


const Postcard = ({ post , issuggestion , is_mypost }) => {

  const  { user , dispatch } = useAuthContext()

  const  [likes , setlikes] = useState(post.likes.length)
  const  [liked , setliked] = useState(post.likes.includes(user._id))
  const [ isfollowed , set_isfollowed ] = useState(false)


 let sec_style =  post.img === "" ? "max-h-[55vh] w-[96%] md:w-[80%] ml-[2%] md:ml-[10%] lg:w-[96%] lg:ml-[2%] mt-2  mb-16" : "h-[50vh] w-[96%] md:w-[80%] ml-[2%] md:ml-[10%] mb-16 lg:w-[96%] lg:ml-[2%] mt-2 " 

const likeUnlike_post = async () => {
    const options = {
      method : "PUT",
      headers : { "Authorization" : `Bearer ${user.token}` }
      }

      const response = await fetch(`https://morbiksocial-api.cyclic.app/api/posts/like/${post._id}`, options)
      const json = await response.json()
     
      if(json.status === "Liked") { 
        setlikes(prevlikes => prevlikes + 1) 
        setliked(true)
      }
      else { 
        setlikes(prevlikes => prevlikes - 1)
        setliked(false)
      }
      
}

const handleFollow = async () => {
  const options = {
    method : "PUT",
    headers : { "Authorization" : `Bearer ${user.token}` },
    }

    let response 
    
    if(isfollowed) {  
      response = await fetch(`https://morbiksocial-api.cyclic.app/api/user/unfollow/${post.userId}`, options) 
    }
    else {  
      response = await fetch(`https://morbiksocial-api.cyclic.app/api/user/follow/${post.userId}`, options)  }

    const json = await response.json()
    
    if(response.ok ) {
      if(json.status === "Followed") { 
        set_isfollowed(true)
        const tempfollowing = [post.userId, ...user.following]
        const newobj = {...user , following : tempfollowing }
  
        dispatch({ type : AUTH_ACTIONS.UPDATE_INFO , payload : newobj})
      }
      else { 
        set_isfollowed(false)
        const tempfollowing = user.following.filter(tempf => tempf !== post.userId)
        const newobj = {...user , following : tempfollowing }

        dispatch({ type : AUTH_ACTIONS.UPDATE_INFO , payload : newobj})
       }
    }

}

 
  return (
    <section className={ is_mypost ? "h-max mt-12 shadow-md ml-2 md:ml-0" : sec_style } >
   

    { !is_mypost && <section>
        <div className="flex items-center justify-between ">
          <div className={issuggestion ? "w-[85%] flex justify-between items-center" : "flex justify-between items-center"}>

            <Link to={`/myhome/${post.userId}`} className="flex items-center">
              <img src={`https://morbiksocial-api.cyclic.app/public/data/uploads/${post.userProfilePicture}`} alt={post.username} className='w-10 h-10 rounded-full'/>
              <h5 className="font-bold ml-2 font-sans">{post.username}</h5>
            </Link>

            {issuggestion && <button className="ml-4 text-[crimson]"
            onClick={handleFollow}>{isfollowed ? "Unfollow" : "+ Follow"}</button>}
          </div>
            <p className="text-gray-400 text-sm">{post.createdAt}</p>
        </div>

        <p className={ post.img === "" ? " max-h-[30vh] overflow-y-hidden hover:overflow-y-scroll ml-12 mb-4" : "ml-12 mb-4"}>{post.desc}</p>
      </section>
    }

   { post.img !== ""  && <img src={"https://morbiksocial-api.cyclic.app/public/data/uploads/" +post.img} alt={post.desc} className={is_mypost ? "w-full h-[80%]" : "w-full lg:w-4/5 lg:ml-[10%] h-[80%]"}/>}
   {
      is_mypost && <p className="p-2 text-center">{post.desc}</p>
   }

      <div className={is_mypost ? "flex justify-between w-[80%] ml-[10%]" : "flex justify-between px-8 pt-4 mx-[10%]"}>
          <div className="flex items-center justify-center" onClick={likeUnlike_post} >
          <p className="mr-1">{likes}</p>
          {liked  ?
          <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><path fill="#F44336" d="M34 9c-4.2 0-7.9 2.1-10 5.4C21.9 11.1 18.2 9 14 9C7.4 9 2 14.4 2 21c0 11.9 22 24 22 24s22-12 22-24c0-6.6-5.4-12-12-12z"/></svg> :
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="currentColor" d="m8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385c.92 1.815 2.834 3.989 6.286 6.357c3.452-2.368 5.365-4.542 6.286-6.357c.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
        }
          </div>

          <div className="flex items-center justify-center">
            <p className="mr-1">{`10`}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.45em" height="1.45em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 50 50"><path fill="currentColor" d="M15 42h-2l1.2-1.6c.8-1.1 1.3-2.5 1.6-4.2C10.8 33.9 8 29.6 8 24c0-8.6 6.5-14 17-14s17 5.4 17 14c0 8.8-6.4 14-17 14h-.7c-1.6 1.9-4.4 4-9.3 4zm10-30c-9.4 0-15 4.5-15 12c0 6.4 3.9 9.4 7.2 10.7l.7.3l-.1.8c-.2 1.6-.5 3-1.1 4.2c3.3-.4 5.2-2.1 6.3-3.5l.3-.4H25c13.5 0 15-8.4 15-12C40 16.5 34.4 12 25 12z"/></svg>
          </div>

      </div>

      { is_mypost &&  <div>
          <div className="flex justify-between items-center">
            <p className="px-2 text-gray-400 text-sm">{post.createdAt}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><circle cx="16" cy="8" r="2" fill="gray"/><circle cx="16" cy="16" r="2" fill="gray"/><circle cx="16" cy="24" r="2" fill="gray"/></svg>
          </div>
        </div>
      }
    </section>
  )
}

export default Postcard
