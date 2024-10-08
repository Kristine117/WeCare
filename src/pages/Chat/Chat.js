import React, { useContext } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import dashboard from "./Chat.module.css";
const Chat = ()=>{
    const {user}= useContext(UserContext);
    return(
        <main>
        {!user?.id && <Navigate to={"/login"}/>}

        {user?.id &&  <section className={dashboard['dashboard']}>
             <SideMenu/>
             <DashboardContainer>
                 {/* {user.userType === 'senior' && <ProfileCard/>}     */}
             </DashboardContainer>            
         </section>}
     </main>        
    )
}

export default Chat;