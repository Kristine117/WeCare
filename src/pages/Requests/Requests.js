import React, { useContext } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import ds from "./Requests.module.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";

const Requests = ()=>{
    const {user} = useContext(UserContext);

    return(
        <main>
        {(user?.userType !== "admin" && user?.userType !== null ) && <Navigate to={"/login"}/>}
        {user?.id &&  <section className={ds['dashboard']}>
            <SideMenu/>
            <DashboardContainer>
                <LoggedInCommonNavBar title="Requests"/>
     
            </DashboardContainer>            
        </section>}
    </main> 
    )
}

export default Requests;