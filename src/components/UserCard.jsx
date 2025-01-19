import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
/* eslint-disable no-unused-vars */
// eslint-disable-next-line react/prop-types
const UserCard = ({ user }) => {
  console.log(user);
  // eslint-disable-next-line react/prop-types
  const {_id,firstName, lastName, photoURL, about, gender, age } = user;
  const dispatch = useDispatch();
  const sendOrIgnoreConnection = async (status) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <div className="flex justify-center py-2">
        <img src={photoURL} alt="photo" />
      </div>
      <div className="card-body">
        <h2 className="card-title flex justify-center">
          {firstName + " " + lastName}
        </h2>
        <p className="flex justify-center">{age + " years old," + gender}</p>
        <p className="flex justify-center">{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              sendOrIgnoreConnection("ignored");
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              sendOrIgnoreConnection("interested");
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
