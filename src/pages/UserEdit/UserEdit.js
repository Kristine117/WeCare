import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import ds from "./UserEdit.module.css";
import UserContext from "../../UserContext";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
const UserEdit = ()=>{
    const {userId} = useParams();
    const {user} = useContext(UserContext);
    console.log(userId)
    return(
        <main>
        {(!user?.id || user?.userType !== "admin") && <Navigate to={"/login"}/>}
        {user?.id &&  <section className={ds['dashboard']}>
            <SideMenu/>
            <DashboardContainer>
                <section className={ds["user-profile"]}>

                </section>
           </DashboardContainer>            
        </section>}
    </main>
)
    
}


export default UserEdit;