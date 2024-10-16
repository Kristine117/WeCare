import React from "react";
import { Link } from "react-router-dom";
import design from "./AppointmentDetails.module.css";
const AppointmentDetails = ({appId,description,statusDes,price,assistantName})=>{
    return (
        <div>
            <div className={design['header']}>
            <div>Appointment ID: {appId}</div>
            </div>
            <div>You have Appointment Pending with {assistantName}</div>
            
            <div>Price: {price}</div>
            <div>Description: {description}</div>
          
            {statusDes === '0' && 
            <div>
                <p>Waiting for Assistant to Approve</p>
                <Link>Contact {assistantName}</Link>
                </div>}
    </div>
    )
}

export default AppointmentDetails;
