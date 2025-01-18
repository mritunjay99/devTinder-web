// eslint-disable-next-line react/prop-types
const UserCard = ({ user }) => {
  // eslint-disable-next-line react/prop-types
  const { firstName, lastName, photoURL, about, gender, age } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <div className="flex justify-center py-2">
        <img  src={photoURL} alt="photo" />
      </div>
      <div className="card-body">
        <h2 className="card-title flex justify-center">
          {firstName + " " + lastName}
        </h2>
        <p className="flex justify-center">{age + " years old," + gender}</p>
        <p className="flex justify-center">{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
