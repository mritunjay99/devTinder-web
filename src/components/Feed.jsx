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
      dispatch(addFeed(response.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); //since the dependency array is empty, it will call getFeed once after this component loads

  return (
    feedData && (
      <div className="flex justify-center my-5">
        <UserCard user={feedData.data[0]} />
      </div>
    )
  );
};

export default Feed;
