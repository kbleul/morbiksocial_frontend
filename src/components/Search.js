import {useState , useEffect} from 'react'
import { Link } from "react-router-dom"

import { useAuthContext } from "../customHooks/useMyContext"

const Search = () => {

    const  { user  } = useAuthContext()

    const [search, setsearch] = useState("")
    const [suggestions, setsuggestions] = useState([])


const getSearchSuggestions = async(word) => {
    const options = {
      method : "PUT",
      headers :  {
          "Authorization": `Bearer ${user.token}`,
          "content-Type": "application/json"
      },
      body : JSON.stringify({"word" : word})
    }

    if(word !== "" || word !== " ")      {
      const fetchquery = await fetch(`${process.env.SERVER}/api/user/search`, options)

      const json = await fetchquery.json()
      setsuggestions(json)
    }
}


  useEffect(() => {
    if(search === "" || search === " ") {  setsuggestions([]) ;  }
  },[search , setsuggestions])


  return (
    <div className="w-full flex items-center justify-center relative">
        <input onChange={e => {setsearch(e.target.value); getSearchSuggestions(e.target.value)}} type="search" value={search} placeholder="Search..." className="w-10/12 mr-1 px-8 py-1 md:py-2 bg-inherit border-2 border-slate-400 rounded-full"/>

        <svg className="" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="#bbb" d="m18.677 19.607l-5.715-5.716a6 6 0 0 1-7.719-9.133a6 6 0 0 1 9.134 7.718l5.715 5.716l-1.414 1.414l-.001.001ZM9.485 5a4 4 0 1 0 2.917 1.264l.605.6l-.682-.68l-.012-.012A3.972 3.972 0 0 0 9.485 5Z"/></svg>

        {suggestions.length > 0 && 
          <ul className="absolute top-12 w-4/5 ml-[10%] md:w-2/4 bg-gray-200 text-black max-h-[27vh] overflow-y-hidden hover:overflow-y-scroll">
            {suggestions.map(item => (
               <li key={item.id} className="py-2 px-8 border-b border-b-gray-400 text-center hover:opacity-80 hover:border-b-gray-500 rounded-lg">
                 <Link onClick={() =>{ setsearch(item.username); setsuggestions([]) }} to={`/myhome/${item.id}`} >{item.username}</Link>
               </li>
            ))}
          </ul>
         }
    </div>
  )
}

export default Search