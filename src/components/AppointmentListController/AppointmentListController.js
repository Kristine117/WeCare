import React from "react"; 
import dsgn from "./AppointmentListController.module.css";
import Button from "../Button/Button";

const AppointmentListController = ({switchListRequests})=>{
    return(
        <section className={dsgn["header"]}>
            <Button name="ongoing" onClick={switchListRequests}>Ongoing</Button>
            <Button name="approve" onClick={switchListRequests}>Approve</Button>
        </section>
    )
}

export default AppointmentListController;