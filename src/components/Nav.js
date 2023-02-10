import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Nav = () => {
  const { user, token, updateToken } = useContext(AuthContext);

  const handleLogout = () => {
    updateToken("");
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {!token ? (
            <>
              <li>
                <NavLink to="/signup">Sing Up</NavLink>
              </li>
              <li>
                <NavLink to="/login">Log In</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
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
