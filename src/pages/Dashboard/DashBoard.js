import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import dashboard from "./DashBoard.module.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserContext from "../../UserContext";

const DashBoard = ()=>{
    const {user} = useContext(UserContext);
    console.log(user)
    return(
        <React.Fragment>
            <SideMenu/>
            {user.userType === 'senior' && <ProfileCard/>}
        </React.Fragment>        
    )
}


export default DashBoard;