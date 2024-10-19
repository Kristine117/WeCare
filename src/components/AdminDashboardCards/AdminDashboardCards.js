import React from "react";
import db from "./AdminDashboardCards.module.css";
const AdminDashboardCards = ()=>{
    return (
        <div className={db["header"]}>
            <div>Total Users</div>
            <div>Assistance</div>
            <div>New Users</div>
        </div>
    )
}

export default AdminDashboardCards;