import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Nav = () => {
  const { token, updateToken } = useContext(AuthContext);

  const handleLogout = () => {
    updateToken("");
  };

  return (
    <>
      <nav className="bg-gray-200 p-5">
        <ul className="flex justify-center space-x-6">
          <li className="hover:text-rose-500 text-black-500">
            <NavLink to="/">Home</NavLink>
          </li>

          {!token ? (
            <>
              <li className="hover:text-rose-500 text-black-500">
                <NavLink to="/signup">Sing Up</NavLink>
              </li>
              <li className="hover:text-rose-500 text-black-500">
                <NavLink to="/login">Log In</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-rose-500 text-black-500">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="hover:text-rose-500 text-black-500">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
