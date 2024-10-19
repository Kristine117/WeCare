import React, { useContext } from "react";
import UserContext from "../../UserContext";
import ds from "./Ratings.module.css";
import { Navigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";

const Ratings = ()=>{
    const {user} = useContext(UserContext);

    return (
        <main>
        {(!user?.id || user?.userType !== "admin") && <Navigate to={"/login"}/>}
        {user?.id &&  <section className={ds['dashboard']}>
            <SideMenu/>
            <DashboardContainer>
                <LoggedInCommonNavBar title="Ratings"/>
     
            </DashboardContainer>            
        </section>}
    </main>
    )
}


export default Ratings;