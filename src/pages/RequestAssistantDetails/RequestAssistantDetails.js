import React, { useContext } from "react";
import { Navigate, useLoaderData, useParams } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import design from "./RequestAssistantDetails.module.css";
import UserContext from "../../UserContext";

const RequestAssistantDetails = ()=>{
    const {user} = useContext(UserContext);
    const {userId} = useParams();


    return(
        <main>
             {(user?.userType !== "admin" && user?.userType !== null ) && <Navigate to={"/login"}/>}
            <section className={design["dashboard"]}>
                <SideMenu/>
                <DashboardContainer>
                    <div className={design["assistant-card"]}>
                        <h1>Assistant Profile</h1>

                        <img src={user.profileImage} alt="Profile Image"/>

                        <div>{user.firstname} {user.lastname}</div>
                    </div>      
                </DashboardContainer>           
            </section> 
        </main>
    )
}

export default RequestAssistantDetails;

export async function retrieveUserDetailsFunc({request,params}){
    const {applicantId} = await params;
    console.log(applicantId);
    let data;
    try{
        let initial = await fetch(`${process.env.REACT_APP_API_URL}/admin/assistant-details`)
    }catch(e){
        throw new Error(e.message);
    }

    return {
        kwankwan: "kwankwan"
    }
}

