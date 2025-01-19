import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feedData = useSelector((store) => {
    return store.feed;
  });
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feedData) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); //since the dependency array is empty, it will call getFeed once after this component loads

  if (!feedData) return;
  if (feedData.length == 0) {
    return (
      <h1 className="flex justify-center font-extrabold">
        No new users found!
      </h1>
    );
  }
  return (
    feedData && (
      <div className="flex justify-center my-5">
        <UserCard user={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
