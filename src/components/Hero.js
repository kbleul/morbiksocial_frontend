
const Hero = ({user}) => {

  return (
    <section className="bg-rose-300">
        <img src={`https://morbiksocial-api.cyclic.app/public/data/uploads/${user.coverPicture}`} alt="cover" className="h-[70vh] w-full"/>

        <div className="flex absolute top-[45vh] md:top-[70%] w-full md:w-[70%] md:ml-[15%] lg:w-2/5 lg:ml-[30%] text-white  bg-[rgba(0,0,0,.5)]">
         <img className="w-32 h-32 md:w-56 md:h-56 rounded-[15rem] mt-[15%] md:mt-1 p-2" src={ `https://morbiksocial-api.cyclic.app/public/data/uploads/${user.profilePicture}` } alt="profile" />
         <div className="ml-[6%] w-full">
            <h4 className="pt-[15%] font-extrabold text-xl">{user.username}</h4>
            <p className=" px-[ 2% ] pt-[2%] pb-[10%] h-20 overflow-y-hidden mb-4">{user.disc === "" ? "..." :user.disc}</p>

            <div className="flex justify-evenly items-center text-sm">
                <div className="flex ml-[1%]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 50 50"><path fill="yellow" d="m25 42.5l-.8-.9C23.7 41.1 12 27.3 12 19c0-7.2 5.8-13 13-13s13 5.8 13 13c0 8.3-11.7 22.1-12.2 22.7l-.8.8zM25 8c-6.1 0-11 4.9-11 11c0 6.4 8.4 17.2 11 20.4c2.6-3.2 11-14 11-20.4c0-6.1-4.9-11-11-11z"/><path fill="currentColor" d="M25 24c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3z"/></svg> 
                  <p >{user.city ? user.city : "Unknown"}</p> 
                </div>

                <div className="flex ml-[2%]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><path fill="red" fillRule="evenodd" d="m8 2.42l-.717-.737c-1.13-1.161-3.243-.777-4.01.72c-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577c.687-1.355.587-2.377.236-3.061c-.767-1.498-2.88-1.882-4.01-.721L8 2.42Zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063c.045.041.089.084.132.129c.043-.045.087-.088.132-.129c3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29c.054.27.161.488.419 1.003c.288.578.235 1.15.076 1.629c-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003c.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798c-.131.258-.245.689-.08 1.335c.063.244.414.198.487-.043c.21-.697.627-1.447 1.359-1.692c.217-.073.304-.337.084-.398Z"/></svg>
                  <p>{user.relationship}</p>
                </div>

            </div>

            <div className="flex ml-[4%] border-l-2 text-sm mt-[5%] w-full pb-2">
             <p className="ml-1 bg-slate-200 text-black" >Joined {user.createdAt}</p></div>
            </div>
        </div>

    </section>
  )
}

export default Hero

