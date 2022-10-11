import SingleOnlineFriend from "../components/SingleOnlineFreinds"

import { useMediaQuery } from 'react-responsive';

const OnlineFriends = ({chatingwith ,  onlineusers  , set_currentpage , set_chatingWith_name }) => {

    const isMobileDevice = useMediaQuery({ query: "(max-device-width: 768px)", });

return(
    <article className={isMobileDevice ? 
        "h-[88vh] overflow-y-hidden hover:overflow-y-scroll" : "mt-24 h-[88vh] overflow-y-hidden hover:overflow-y-scroll"}>
       { !isMobileDevice && 
          <h3 className="my-4 text-center text-xl font-content-spliter font-bold">{onlineusers.length} Online</h3>}
        
        <section className="lg:grid lg:grid-cols-2 gap-4 items-center">

            { onlineusers.map(tempuser => (<article className="w-full" key={tempuser}>
                <SingleOnlineFriend  onlineuser_id={tempuser}  chatingwith={chatingwith} set_currentpage={set_currentpage} set_chatingWith_name={set_chatingWith_name} />
            </article>
            ))}
        </section>
     </article>
    )
}

export default OnlineFriends