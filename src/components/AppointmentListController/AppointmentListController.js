import React from "react"; 
import dsgn from "./AppointmentListController.module.css";
import Button from "../Button/Button";

const AppointmentListController = ({switchListRequests, status})=>{
    
    return(
        <section className={dsgn["header"]}>
            <Button name="ongoing" onClick={switchListRequests} 
            className={dsgn[`${status === "ongoing" ? "btn-active":"btn-inactive"}`]}>Ongoing</Button>
            <Button name="approve" onClick={switchListRequests} 
            className={dsgn[`${status === "approve" ? "btn-active":"btn-inactive"}`]}>Approve</Button>
        </section>
    )
}

export default AppointmentListController;