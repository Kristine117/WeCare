import React from "react";
import design from "./AppointmentDetails.module.css";
import { FaUser} from 'react-icons/fa'; 
import Button from "../Button/Button";

const AppointmentDetails = ({appId,description,statusDes,price,servingName,loggedInUserType,servingProfileImage})=>{

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

        
            if(!data.ok){
                throw new Error("Failed to Update");
            }

            console.log(await data.json());
        }catch(e){
            console.log(e.message);
        }
    }
    return (
        <div className={design["card"]}>
            <div>
                {servingProfileImage && <img src={servingProfileImage} alt="This is your Serving User Image"/>}
                {!servingProfileImage && <FaUser size={40} className={design["default-profile"]}/>}   
            </div>
            <div>
                <div className={design["indicator"]}><strong>{servingName}</strong> would like to request an appointment with you.</div>
                <div className={design["price"]}>Price: {price}</div>
                <div className={design["description"]}>Description: {description}</div>
            </div>
            {/* <div>Status: {statusDes === "0" && "Pending"}</div> */}
            {/* {statusDes === '0' && 
            <div>
                {loggedInUserType === "senior"&&
                <p>Waiting for Assistant to Approve</p>}
                </div>} */}

            {loggedInUserType === "assistant"&& <div>
                <Button name="accept" onClick={decideHandler}>Accept</Button>
                <Button name="reject" onClick={decideHandler}>Accept</Button>
            </div>}
    </div>
    )
}

export default AppointmentDetails;
