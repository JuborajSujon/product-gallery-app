import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navList = (
    <>
      <li className="">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-slate-900 border-b-4 border-slate-400 hover:border-slate-300"
              : "hover:text-slate-900 hover:bg-slate-400"
          }>
          Product Gallery
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar max-w-[1540px] fixed  z-10 bg-white dark:bg-slate-900 dark:text-slate-300 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost min-h-9 h-9 px-2  md:hidden hover:bg-slate-200 hover:text-slate-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="2 2 20 20"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
            {navList}
          </ul>
        </div>
        <Link
          to={"/"}
          className="btn btn-ghost hover:bg-slate-400-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl italic font-bold  min-h-10 h-12 -ml-2 ">
          <img
            className="w-10 h-7"
            // src="https://i.ibb.co/9gj2ShB/logo.png"
            src="https://w7.pngwing.com/pngs/505/849/png-transparent-prodigy-logo-p-product-logos-thumbnail.png"
            alt="logo"
          />
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal text-sm font-semibold px-1 space-x-2">
          {navList}
        </ul>
      </div>
      <div className="navbar-end  space-x-2">
        <button className="btn btn-ghost h-10 min-h-10">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
