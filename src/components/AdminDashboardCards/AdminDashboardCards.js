import React, { useEffect, useState } from "react";
import db from "./AdminDashboardCards.module.css";
const AdminDashboardCards = ({fullName})=>{
    
    
    useEffect(()=>{
      async function getAdminDashBoardData(){
        try{
            
        }catch(e){
            throw new Error(e.message);
        }

      }
    },[fullName])
    return (
       <React.Fragment>
        <h1>Hi, {fullName}</h1>
         <div className={db["header"]}>
            <div>Total Users</div>
            <div>Assistance</div>
            <div>New Users</div>
        </div>
       </React.Fragment>
    )
}

export default AdminDashboardCards;