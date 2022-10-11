import { useEffect , useState , useCallback } from "react"
import { useParams, Link } from "react-router-dom"

import { useAuthContext , usePostContext } from "../customHooks/useMyContext"
import { POST_ACTIONS } from "../contex/postContext"

import Hero from "../components/Hero"
import Postcard from "../components/Postcard"

const Home = () => {

  const  { user  } = useAuthContext()
  const  { userposts  , dispatch_userposts} = usePostContext()

  const { id } = useParams();

  const [ currentPerson , set_currentPerson ] = useState(null)
  const [ relationlist , set_relationlist ] = useState([])
  const [ relation_type , set_relation_type ] = useState("following")

const getUser = useCallback( async (userid) => {
    const options = {
      method : "GET",
      headers : { "Authorization" : `Bearer ${user.token}` }
    }

    const fetchuser = await fetch(`https://morbiksocial-api.cyclic.app/api/user/${userid}` , options)

    const json = await fetchuser.json()

    if(fetchuser.ok) {
      set_currentPerson(json)
      window.scrollTo(0, 0);
    }

}, [user.token , set_currentPerson])



const fetchRelationships = useCallback( async (type) => {
    const options = {
          method : "GET",
          headers: { "Authorization" : `Bearer ${user.token}` },
    }

        const url = id !== user._id ? `https://morbiksocial-api.cyclic.app/api/${type}/${id}` : `https://morbiksocial-api.cyclic.app/api/${type}`
        const response = await fetch( url , options)

        const json = await response.json()

        if(response.ok) { set_relationlist(json) }

        set_relation_type(type)
},[id,user._id,user.token])

  //get followers and following list

  useEffect(() => { 

    if(id !== user._id) { getUser(id)  }
    else { set_currentPerson(user) }

    const fetchPost = async () => { 
      const options = {
        method : "GET",
        headers : { "Authorization" : `Bearer ${user.token}` }
      }
  
      const url = id !== user._id ?
                  `https://morbiksocial-api.cyclic.app/api/posts/current/${id}` : `https://morbiksocial-api.cyclic.app/api/posts/current`
      const getpost = await fetch(url, options)
  
      let json = await getpost.json()
  
      if(getpost.ok) {
        dispatch_userposts({ type : POST_ACTIONS.GETALL , payload : json })
      }
  
    }
       fetchPost()
       fetchRelationships("following")
  }, [ id , user ,  getUser , dispatch_userposts , fetchRelationships ])


  return (<main>
{currentPerson && <article>
    <article className="mt-24 relative">
      <Hero user={currentPerson}/>
    </article>

    <section className="bg-[#f4f4f4] mt-[13vh] md:mt-[25vh]">
      <div className="flex items-center font-content-spliter">

        <div className="w-full md:w-[30%] flex justify-evenly md:border-r-2 border-black">
          <p onClick={() => fetchRelationships("following")} className={ relation_type === "following" ? "font-bold w-1/2 text-center border-b-2 border-gray-400 mx-2 hover:cursor-pointer" : "font-bold w-1/2 text-center mx-2 hover:cursor-pointer hover:opacity-75"} ><span className="text-sm font-light">{currentPerson && currentPerson.following.length} Following</span></p>

          <p onClick={() => fetchRelationships("followers")} className={ relation_type === "followers" ?"font-bold w-1/2 text-center border-b-2 border-gray-400 mx-2 hover:cursor-pointer" : "font-bold w-1/2 text-center mx-2 hover:cursor-pointer hover:opacity-75"}
          ><span className="text-sm font-light">{currentPerson && currentPerson.follower.length} Followers</span></p>
        </div>
        
        <p className="w-[70%] text-3xl text-center hidden md:block">Posts</p>
     </div>
   </section>

   <section className="block md:grid grid-cols-3 gap-x-8">
    
   <div className="max-h-[60vh] md:h-[80vh] overflow-y-scroll  md:overflow-y-hidden md:hover:overflow-y-scroll border-r-2 border-gray-100 mt-[5%]" >
      { relationlist.map(person => (
        <Link to={`/myhome/${person._id}`} className="flex items-center gap-2 px-20 py-2 hover:cursor-pointer hover:opacity-60" key={person._id}>
          <img className='w-12 h-12 rounded-full' src={person.profilePicture} alt={person.username} />
          <h5 className="font-bold ml-2 font-serif">{ person.username }</h5>
        </Link>
      ))
      }

      { relationlist.length === 0  && 
          <p className="text-center text-red-400 text-sm my-4 ">{ relation_type === "following" ? "You are not following anyone" : "You don't have any followers" }</p>
      }
        
      { <p className="text-center text-blue-400 text-xl my-16 col-span-2">No friends yet</p> }
    </div>

    <p className="w-full text-3xl text-center md:hidden bg-[#f4f4f4] mt-[25vh] font-content-spliter">Posts</p>
    
    <div className="max-h-[60vh] md:h-[80vh] overflow-y-scroll  md:overflow-y-hidden md:hover:overflow-y-scroll md:col-span-2 grid grid-cols-2 gap-2 md:mr-8 border-t md:border-none">
     { userposts.length === 0 && 
        <p className="text-center text-blue-400 text-xl my-16 col-span-2">No posts yet</p> }

      { userposts.map( post => (
        <Postcard key={post._id} post={post} is_mypost={true}/>
      )) }
    </div>
   </section>
  </article>
}

   </main>
  )
}

export default Home

