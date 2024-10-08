import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import dashboard from "./DashBoard.module.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import AppNavbar from "../../components/AppNavbar/AppNavbar";

const DashBoard = ()=>{
    const {user} = useContext(UserContext);
    return(
        <main>
           {!user?.id && <Navigate to={"/login"}/>}
           {user?.id &&  <section className={dashboard['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <AppNavbar/>
                    {user.userType === 'senior' && <ProfileCard/>}    
                </DashboardContainer>            
            </section>}
        </main>        
    )
}


export default DashBoard;