import { useState } from "react"

import { useAuthContext } from "../customHooks/useMyContext"
import { usePostContext } from "../customHooks/useMyContext"

import { POST_ACTIONS } from "../contex/postContext"


const Post = () => {
  const { user } = useAuthContext()
  const { dispatch: post_dispatch } = usePostContext()

  const [disc, set_disc] = useState("")
  const [file, set_file] = useState(null)
  const [src, set_src] = useState(null)


const previewImgData = (uploaded) => {
    if (uploaded) {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(uploaded);
      fileReader.addEventListener("load", function () {  set_src(this.result)  });
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()

    if (file && disc === "" ) { set_disc("...") }
    
    if (file && disc !== "") {
      const formData = new FormData();
      formData.append('post', file);

      let options = {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      }

      let sendpost = await fetch(`https://morbiksocial-api.cyclic.app/api/share/image`, options)
      console.log("sendpost",sendpost)

      let json = await sendpost.json()
      console.log("json_two",json)
      console.log("json_two",sendpost.data)


      // options = {
      //   method: "PUT",
      //   headers: {
      //     "Authorization": `Bearer ${user.token}`,
      //     "content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ desc: disc })
      // }

      // sendpost = await fetch(`https://morbiksocial-api.cyclic.app/api/share/${json._id}`, options)

      // let json_two = await sendpost.json()
      // console.log("sendpost",sendpost)
      // console.log("json_two",json_two)
      // set_src(null)
      // set_file(null)
      // set_disc("")

      // post_dispatch({ type: POST_ACTIONS.ADDPOST, payload: { ...json.data, desc: json_two.desc } })
    }

    else if (disc !== "") {
      const options = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "content-Type": "application/json"
        },
        body: JSON.stringify({ desc: disc })
      }

      const sendpost = await fetch(`https://morbiksocial-api.cyclic.app/api/share/image`, options)
      let json_two = await sendpost.json()
console.log("sendpost",sendpost)
console.log("json_two",json_two)

      set_src(null)
      set_file(null)
      set_disc("")

      post_dispatch({ type: POST_ACTIONS.ADDPOST, payload: json_two })
    }

}


  return (
    <div className="w-[90%] md:w-[60%] ml-[5%] md:ml-0 mt-40 md:mt-4 flex">
      <img src={`https://morbiksocial-api.cyclic.app/public/data/uploads/${user.profilePicture}`} alt="profile" className='w-16 h-16 rounded-full self-center' />

      <form onSubmit={e => handleSubmit(e)} encType="multipart/form-data" className="ml-4 w-4/5">
        <textarea value={disc} onChange={e => set_disc(e.target.value)} placeholder="What's on your mind ?" className="text-xl py-4 px-2 border-b-2 focus:outline-0 outline-0 w-full" />

        {src &&
          <div className="w-full relative flex justify-center" >
            <img className="w-full h-64 " src={src} alt="post" />
            <p className="absolute top-0 left-[47%] text-4xl text-red-600 rounded-full hover:text-red-400 "
              onClick={() => { set_file(null); set_src("") }}>x</p>
          </div>
        }


        <div className="flex justify-between items-center mt-1">

          <input type="file" id="upload-file" name="post" accept="image/*" 
            onChange={e => {
              set_file(e.target.files[0])
              previewImgData(e.target.files[0]);
            }} />
            
          <label htmlFor="upload-file">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="currentColor" d="M32 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM4 30V6h28v24Z" className="clr-i-outline clr-i-outline-path-1" /><path fill="currentColor" d="M8.92 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3Zm0-4.6A1.6 1.6 0 1 1 7.33 11a1.6 1.6 0 0 1 1.59-1.59Z" className="clr-i-outline clr-i-outline-path-2" /><path fill="currentColor" d="m22.78 15.37l-5.4 5.4l-4-4a1 1 0 0 0-1.41 0L5.92 22.9v2.83l6.79-6.79L16 22.18l-3.75 3.75H15l8.45-8.45L30 24v-2.82l-5.81-5.81a1 1 0 0 0-1.41 0Z" className="clr-i-outline clr-i-outline-path-3" /><path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </label>

          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28"><path fill="currentColor" d="M17.5 13a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3ZM12 11.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm-3.672 5.63a.75.75 0 0 1 1.04.195l.009.012l.044.059c.042.054.11.136.203.238c.187.203.472.48.858.757c.768.553 1.93 1.109 3.518 1.109c1.588 0 2.75-.556 3.518-1.109c.386-.277.672-.554.858-.757a4.068 4.068 0 0 0 .248-.297l.007-.01a.75.75 0 0 1 1.24.845l-.002.001v.002l-.003.003l-.007.01l-.022.031a5.508 5.508 0 0 1-.355.428a7.137 7.137 0 0 1-1.088.962C17.424 20.306 15.962 21 14 21c-1.962 0-3.424-.694-4.394-1.391a7.137 7.137 0 0 1-1.088-.962a5.505 5.505 0 0 1-.376-.458l-.008-.01l-.002-.004l-.001-.002l-.001-.001a.75.75 0 0 1 .198-1.042ZM14 2C7.373 2 2 7.373 2 14s5.373 12 12 12s12-5.373 12-12S20.627 2 14 2ZM3.5 14C3.5 8.201 8.201 3.5 14 3.5S24.5 8.201 24.5 14S19.799 24.5 14 24.5S3.5 19.799 3.5 14Z" /></svg>

          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 50 50"><path fill="currentColor" d="m25 42.5l-.8-.9C23.7 41.1 12 27.3 12 19c0-7.2 5.8-13 13-13s13 5.8 13 13c0 8.3-11.7 22.1-12.2 22.7l-.8.8zM25 8c-6.1 0-11 4.9-11 11c0 6.4 8.4 17.2 11 20.4c2.6-3.2 11-14 11-20.4c0-6.1-4.9-11-11-11z" /><path fill="currentColor" d="M25 24c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3z" /></svg>

          <button className="w-1/5 md:w-1/4 px-1 md:px-4 bg-yellow-400 hover:bg-yellow-300 text-black text-sm md:text-base">Share</button>
        </div>
      </form>
    </div>
  )
}

export default Post