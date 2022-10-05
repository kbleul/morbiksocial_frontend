import { useState } from "react"

import UpdateProfilePic from "./UpdateProfilePic"
import UpdateCoverPic from "./UpdateCoverPic"
import UpdateOtherInfo from "./UpdateOtherInfo"


const AddDetails = () => {

    const [ currenttask , set_currenttask ] = useState("profilepic")

  return ( <section className="mt-44 md:mt-32 flex flex-col"> 
            <h3 className="text-2xl text-center">Just a few more details</h3>
            <div className="mt-6 flex">

              { currenttask === "profilepic" && <UpdateProfilePic set_currenttask={ set_currenttask } />  }
                
              { currenttask === "coverpic" && <UpdateCoverPic set_currenttask={ set_currenttask } />  }

              { currenttask === "others" && <UpdateOtherInfo set_currenttask={ set_currenttask } /> }
            
            </div>
        </section> )

}

export default AddDetails