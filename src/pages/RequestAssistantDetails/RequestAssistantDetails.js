import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import design from "./RequestAssistantDetails.module.css";
import UserContext from "../../UserContext";
const RequestAssistantDetails = ()=>{
    const {user} = useContext(UserContext);
    const {userId} = useParams();
    console.log(userId)
    return(
        <main>
             {(user?.userType !== "admin" && user?.userType !== null ) && <Navigate to={"/login"}/>}
            <section className={design["dashboard"]}>
                <SideMenu/>
                <DashboardContainer>
                    <div className={design["assistant-card"]}>
                        <h1>Assistant Profile</h1>
                    </div>      
                </DashboardContainer>           
            </section> 
        </main>
    )
}

export default RequestAssistantDetails;