import "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

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
      dispatch(removeFeed());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🧑‍💻DevTinder
        </Link>
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
                <a>Settings</a>
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
