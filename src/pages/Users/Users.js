import React, { useContext } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import ds from "./Users.module.css"
const Users = ()=>{
   
    const {user} = useContext(UserContext);

    return(
        <main>
            {(!user?.id || user?.userType !== "admin") && <Navigate to={"/login"}/>}
            {user?.id &&  <section className={ds['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <LoggedInCommonNavBar title="Users"/>
         
                </DashboardContainer>            
            </section>}
        </main>
    )
}

export default Users;