import TopNav from "./Topnav"
import SecondaryNav from "./SecondaryNav"

const Navbar = () => {

  return (
    <article className="bg-slate-500  text-white fixed top-0 h-[8.5rem] md:h-[6.1rem] w-full z-10">
      <TopNav />
      <SecondaryNav />
    </article>
  )
}

export default Navbar
