const FeedMobileVersion = ({feedposts , feedposts_suggested , post_isloading , sugg_isloading , post_error , sugg_error}) => {

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
  
            { feedposts.length === 0 &&  <p className="text-center text-red-400 my-24">No post yet</p> }
  
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
  
          { feedposts_suggested.length === 0 &&  <p className="text-center text-red-400 my-24">No suggested post yet</p> }
  
      </div>
      }
        
      </article>)
  }
  
  export default FeedMobileVersion