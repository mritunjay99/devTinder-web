import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      //if you are calling the login api , and if you are getting auth token from the api as response then you need to set "withCredential" to true and even in backend you need to set "credential" to true
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      navigate("/");
      dispatch(addUser(response.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId: email, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-xl justify-center my-8 mx-auto">
      <div className="card-body justify-center">
        {!isLogin && (
          <>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="email"
                className="grow"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </label>
          </>
        )}
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p className="text-red-500">{error}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              isLogin ? handleLogin() : handleSignUp();
            }}
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </div>
        <p
          className="text-blue-700 text-center cursor-pointer"
          onClick={() => {
            setIsLogin(!isLogin);
          }}
        >
          {!isLogin ? "Existing user" : "New user? Sign up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
