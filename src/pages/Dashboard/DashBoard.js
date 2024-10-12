import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import dashboard from "./DashBoard.module.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import AssistantContent from "../../components/AssistantContent/AssistantContent";
const DashBoard = ()=>{
    const {user} = useContext(UserContext);
    return(
        <main>
           {!user?.id && <Navigate to={"/login"}/>}
           {user?.id &&  <section className={dashboard['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <LoggedInCommonNavBar/>
                    {user.userType === 'senior' && <ProfileCard/>}
                    {user?.userType === 'assistant' && <AssistantContent/>}     
                </DashboardContainer>            
            </section>}
        </main>        
    )
}


export default DashBoard;