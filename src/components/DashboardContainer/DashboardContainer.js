import React, { useContext } from "react";
import UserContext from "../../UserContext";
import AppNavbar from "../AppNavbar/AppNavbar";


const DashboardContainer = (props)=>{
    const {user}= useContext(UserContext);
    
    return(
        <section>
            <AppNavbar/>
            {props.children}
        </section>
    )
}


export default DashboardContainer;