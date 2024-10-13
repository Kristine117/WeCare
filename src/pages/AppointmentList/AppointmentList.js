import React, { useContext } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import appList from "./AppointmentList.module.css";
import SideMenu from "../../components/SideMenu/SideMenu";

const AppointmentList = ()=>{
    const {user} = useContext(UserContext);
    return(
        <main>
           {(!user?.id && user.userType !== 'senior' && user.userType !== null) && <Navigate to={"/login"}/>}
           {(user.userType === 'senior' && user.userType !== null) && <section className={appList['page-flex']}>
                <SideMenu/>
                <DashboardContainer>
                    <p>Hello World</p>
                </DashboardContainer>            
            </section>}
        </main>        
    )
}

export default AppointmentList;