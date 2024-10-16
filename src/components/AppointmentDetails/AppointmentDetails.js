import React from "react";
import { Link } from "react-router-dom";
import design from "./AppointmentDetails.module.css";
const AppointmentDetails = ({appId,description,statusDes,price,servingName,loggedInUserType})=>{

    async function decideHandler(e){

        try {
            const data = await fetch(`${process.env.REACT_APP_API_URL}/appointment/update-appointment/${appId}`,{
                method:"put",
                headers:{
                    servingName: servingName,
                    appId:appId,
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body:JSON.stringify(
                    {result: e.target.name}
                )
            })

            console.log(await data)

            if(!data.ok){
                throw new Error("Failed to Update");
            }

            console.log(await data.json());
        }catch(e){
            console.log(e.message);
        }
    }
    return (
        <div>
            <div className={design['header']}>
            <div>Appointment ID: {appId}</div>
            </div>
            <div>You have Appointment Pending with {servingName}</div>
            
            <div>Price: {price}</div>
            <div>Description: {description}</div>
            <div>Status: {statusDes === "0" && "Pending"}</div>
            {statusDes === '0' && 
            <div>
                {loggedInUserType === "senior"&&
                <p>Waiting for Assistant to Approve</p>}
                <Link>Contact {servingName}</Link>
                </div>}

            {loggedInUserType === "assistant"&& <div>
                <button name="accept" onClick={decideHandler}>Accept</button>
                <button name="reject" onClick={decideHandler}>Reject</button>
            </div>}
    </div>
    )
}

export default AppointmentDetails;
