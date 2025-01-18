/* eslint-disable react/prop-types */
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const UserProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [gender, setGender] = useState(user.gender);
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();
  const handleEdit = async () => {
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, photoURL, gender, age },
        { withCredentials: true }
      );
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      dispatch(addUser(response?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-content p-5">
      <div className="card bg-base-300 w-96 shadow-xl justify-center my-1 mx-auto ">
        <div className="card-body justify-center">
          <h2 className="text-center text-blue-900 font-bold my-1">
            Edit Profile
          </h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Last Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">About</span>
            </div>
            <textarea
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Photo Url</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <option disabled selected>
                Select Gender
              </option>
              <option>male</option>
              <option>female</option>
              <option>others</option>
            </select>
          </label>
          <div className="card-actions justify-center my-2">
            <button className="btn btn-primary" onClick={handleEdit}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoURL }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile edited successfully❤️</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
