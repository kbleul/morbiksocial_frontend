import { useState } from "react"

import loading_gif from "../assets/loading/loading2.gif"

import { AUTH_ACTIONS } from "../contex/authContext"
import { useAuthContext } from "../customHooks/useMyContext"

const UpdateProfilePic = ( { set_currenttask } ) => {

      const  { user , dispatch } = useAuthContext()
      const [ file , set_file ] = useState(null)
      const [ src , set_src ] = useState(null)
      const [isloading , set_isloading] = useState(false)


const getImgData = (uploaded) => {
      if (uploaded) { 
        const fileReader = new FileReader();

        fileReader.readAsDataURL(uploaded);
        fileReader.addEventListener("load", function () {
          set_src(this.result)
        });    
      }
}

const postProfilePicture = async (e) => {
    e.preventDefault()
    set_isloading(true)
    
    if(file){
      const formData = new FormData();

      formData.append('profile', file);

      fetch(`https://morbiksocial-api.cyclic.app/api/user/profile/updateProfile/${user._id}`,
        {    
          method: 'PUT',   
          body: formData,
          headers : { "Authorization" : `Bearer ${user.token}`}
        }

      ).then((response) => response.json())
        .then((result) => { 
          dispatch( { type : AUTH_ACTIONS.UPDATE_INFO , payload : {...user, profilePicture : result.profilePicture}})
          set_currenttask("coverpic")
          set_src(null)
          set_file(null)
          set_isloading(false)
        })
          .catch((error) => {  console.error('Error:', error);  });
  }
}

  return(
        <form  onSubmit={e => postProfilePicture(e)} className="flex flex-col w-full md:w-1/2 md:ml-[25%]">
          <label className="text-center">Set your profile picture</label>
          <input className="mt-[10%] w-4/5 ml-[10%]" type="file" name="profile" accept=".png, .jpg, .jpeg" 
            onChange={e => {
              set_file(e.target.files[0])
              getImgData(e.target.files[0]);
          } } />

          <div className="w-1/2 ml-[25%] flex justify-end items-center">
            { src ? 
              <div className="w-full relative flex justify-center" >
                <img className="w-64 h-64 rounded-full mt-12" src={src} alt="profile"/>
                <p className="absolute top-0 left-[47%] text-4xl text-red-600 rounded-full hover:text-red-400 " 
                onClick={() => { set_file(null); set_src("")}}>x</p>
              </div> : 
              
              <div className="w-full relative flex justify-center" >
                <img className="w-64 h-64 rounded-full mt-12" src={`https://res.cloudinary.com/dgavaiblp/image/upload/v1665511290/morbikSocial/placeholder/black_dzkx5m.png`} alt="default profile"/>
              </div>
          }
          </div>

          <div className="w-full flex justify-center items-center">
            <button className={isloading ? "hidden" :"hover:text-red-500 cursor-pointer my-4"}>Submit</button>
            <img className={isloading ? "w-8 h-8" : "hidden" } src={loading_gif} alt="loading" />
          </div>
          <hr />

          <button className="hover:text-red-500 cursor-pointer my-4" onClick={e =>{ e.preventDefault();  set_currenttask("coverpic")}}>skip</button>
      </form>
    )
}

export default UpdateProfilePic