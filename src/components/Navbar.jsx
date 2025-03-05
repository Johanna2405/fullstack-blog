import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar flex-col md:flex-row bg-[#FEFDF8] px-8 py-4 sticky top-0">
      <div className="flex-1">
        <Link to={"/"}>
          <img src="logo-01.svg" alt="Suitcase Stories" className="w-64" />
        </Link>
      </div>
      <div className="flex-none ">
        <ul className="flex gap-4 md:gap-8  items-center font-extralight text-xl text-darkGreen uppercase tracking-widest">
          <li className="hover:text-orange">
            <NavLink to={"/"}>
              <p>Home</p>
            </NavLink>
          </li>
          <li className="hover:text-orange">
            <Link to={"/#stories"}>
              <p>Stories</p>
            </Link>
          </li>
          <li className="hover:text-orange border border-darkGreen hover:border-orange px-4 py-2 rounded-2xl">
            <Link to={"/#subscribe"}>
              <p>Subscribe</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
