import "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";
// import { removeFeed } from "../utils/feedSlice";
import { removeConnection } from "../utils/connectionSlice";
import { remmoveFeed } from "../utils/feedSlice";
import { remove } from "../utils/requestSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => {
    return store.user;
  });
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true }); //you need to pass the empty body otherwise token will not be set to null
      dispatch(removeUser());
      // dispatch(removeFeed());
      dispatch(removeConnection());
      dispatch(removeUser());
      dispatch(remmoveFeed());
      dispatch(remove());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        {user ? (
          <Link to="/" className="btn btn-ghost text-xl">
            🧑‍💻DevTinder
          </Link>
        ) : (
          <h1>🧑‍💻DevTinder</h1>
        )}
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">Welcome {user?.firstName}</div>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
