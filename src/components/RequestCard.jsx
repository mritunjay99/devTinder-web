/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const RequestCard = ({request}) => {
    const dispatch=useDispatch();
    const { firstName, lastName, age, gender, photoURL, about } = request.fromUserId;
    const handleRequest=async(status)=>{
        try{
         const response=await axios.post(BASE_URL+"/request/review/"+status+"/"+request._id,{},{withCredentials:true});
         dispatch(removeRequest(request._id));
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className="card card-side bg-base-300 shadow-xl m-2">
      <figure>
        <img src={photoURL} alt="Movie" className="h-full w-48" />
      </figure>
      <div className="card-body">
        <h2 className="card-title"></h2>
        <p>{firstName+" "+lastName}</p>
        <p>{about}</p>
        <div className="card-actions">
          <button className="btn btn-primary" onClick={()=>{handleRequest("accepted")}}>Accept</button>
          <button className="btn btn-secondary" onClick={()=>{handleRequest("rejected")}}>Reject</button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
