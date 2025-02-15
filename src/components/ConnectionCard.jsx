/* eslint-disable react/prop-types */
import { Link } from "react-router";

const ConnectionCard = ({ connection }) => {
  console.log(connection);
  const { firstName, lastName, age, gender, photoURL, about } = connection;
  return (
    <div className="card card-side bg-base-300 shadow-xl m-2">
      <figure>
        <img src={photoURL} alt="Movie" className="h-full w-48" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <p>{age + " years old " + gender}</p>
        <Link to={"/chat/" + connection._id}>
          <button className="btn btn-primary w-20">Chat</button>
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCard;
