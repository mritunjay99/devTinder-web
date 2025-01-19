import { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { addRequest } from "../utils/requestSlice";
import RequestCard from "./RequestCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";

const Request = () => {
    // const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const getRequests = async () => {
    try {
      if (requests) return;
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequest(response.data.data));
    //   if (response.data.data.length === 0) {
    //     setToast(true);
    //   }
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="w-4/12 mx-auto">
         <h2 className="font-bold font-extrabold text-center m-1 text-sky-500">Requests</h2>
      {requests?.map((req) => {
        return <RequestCard key={req._id} request={req} />;
      })}
    </div>
  );
};

export default Request;
