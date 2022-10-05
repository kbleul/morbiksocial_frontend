
import { useEffect , useState  } from "react"
import { useMediaQuery } from 'react-responsive';

import loading from "../assets/loading/loading2.gif"

import Post from "../components/Post"
import Postcard from "../components/Postcard"
import AddDetails from "../components/AddDetails"

import { useNewUserContext } from "../customHooks/useMyContext"
import { usePostContext } from "../customHooks/useMyContext"
import { useFetchPosts } from "../customHooks/useFetchPosts"


const Feed = () => {

    const isMobileDevice = useMediaQuery({  query: "(max-device-width: 768px)",  });


    const  { isnew  } = useNewUserContext()
    const  { feedposts , feedposts_suggested  } = usePostContext()

  const { fetchPosts , post_isloading , post_error , sugg_isloading , sugg_error } = useFetchPosts()


  useEffect(() => { fetchPosts() }, [fetchPosts])


  return (
  <article>

    { isnew ?  <AddDetails />
      : <article>{isMobileDevice ?  
        <MobileVersionFeed feedposts={feedposts} feedposts_suggested={feedposts_suggested} post_isloading={post_isloading} sugg_isloading={sugg_isloading} post_error={post_error} sugg_error={sugg_error} /> :
        <article>
        <section className="mt-[9rem] md:mt-from-nav flex">
          <p className="mt-8 w-[20%] font-content-spliter text-[1.3rem] font-bold self-end border-l-4 border-orange-500 pl-2 ml-2 hidden md:block cursor-pointer">My Feed</p>

          <Post />

          <p className="mt-8 w-[20%] font-content-spliter text-[1.3rem] font-bold self-end border-r-4 border-green-600 pr-2 mr-2 text-right hidden md:block cursor-pointer">Suggested</p>
        </section>

        <section className="grid grid-cols-2 gap-1">

         <div className="h-[100vh] overflow-hidden hover:overflow-y-scroll border-t-2 border-orange-500 mt-2">
          { post_isloading && 
              <div className="w-full flex justify-center mt-20 items-center">
                <img src={loading} alt="loading" className="w-12 h-12"/>
              </div>
          }

          { post_error && <h4 className="text-red-600 mt-64 text-center">Loading error</h4> }

          { feedposts.map(post => (
            <Postcard key={post._id} post={post} />
          ))}
         </div>

         <div className="h-[100vh] overflow-hidden hover:overflow-y-scroll border-t-2 border-green-500 mt-2">
         { sugg_isloading && 
              <div className="w-full flex justify-center mt-20 items-center">
               <img src={loading} alt="loading" className="w-12 h-12"/>
              </div>
         }

          { sugg_error && <h4 className="mt-64 text-red-600 text-center">Loading error</h4> }

          { feedposts_suggested.map(post => (
            <Postcard key={post._id} post={post} issuggestion/>
          ))}
         </div>
        
       </section>
       </article>
      }
    </article>

    }
  
  </article>
  )
}

const MobileVersionFeed = ({feedposts , feedposts_suggested , post_isloading , sugg_isloading , post_error , sugg_error}) => {

  const [isfeed, set_isfeed] = useState(true)

  return(
    <article className="mt-[9rem]">
      <Post />

      <section className="flex">
          <p className={"mt-8 w-1/2 font-content-spliter text-[1.1rem] font-bold self-end border-l-4 border-orange-500 pl-2 "}
          onClick={ e => set_isfeed(prev => !prev)}>My Feed</p>

          <p className={"mt-8 w-1/2 font-content-spliter text-[1.1rem] font-bold self-end border-r-4 border-green-600 pr-2 text-right"} onClick={ e => set_isfeed(prev => !prev)}>Suggested</p>
      </section>

    { isfeed &&
      <div className="h-[100vh] overflow-y-scroll md:overflow-hidden md:hover:overflow-y-scroll border-t-2 border-orange-500 mt-2">
          { post_isloading && 
              <div className="w-full flex justify-center mt-20 items-center">
                <img src={loading} alt="loading" className="w-12 h-12"/>
              </div>
          }

          { post_error && <h4 className="text-red-600 mt-64 text-center">Loading error</h4> }

          { feedposts.map(post => (
            <Postcard key={post._id} post={post} />
          ))}
      </div>
    }

    {!isfeed &&
    <div className="h-[100vh] overflow-y-scroll md:overflow-hidden md:hover:overflow-y-scroll border-t-2 border-green-600 mt-2">
        { sugg_isloading && 
            <div className="w-full flex justify-center mt-20 items-center">
              <img src={loading} alt="loading" className="w-12 h-12"/>
            </div>
        }

        { sugg_error && <h4 className="text-red-600 mt-64 text-center">Loading error</h4> }

        { feedposts_suggested.map(post => (
          <Postcard key={post._id} post={post} />
        ))}
    </div>
    }
      
    </article>)
}

export default Feed

