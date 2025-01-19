/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { addConnection } from "../utils/connectionSlice";
import BASE_URL from "../utils/constants";
import ConnectionCard from "./ConnectionCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      if (connections) return;
      const response = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      const res = response.data;
      dispatch(addConnection(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <div className="w-4/12 mx-auto align-middle">
      <h2 className="font-bold font-extrabold text-center m-1 text-sky-500">Connections</h2>
      {connections?.map((connection) => {
        return <ConnectionCard key={connection._id} connection={connection} />;
      })}
    </div>
  );
};

export default Connections;
