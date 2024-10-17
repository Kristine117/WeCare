import React from "react"; 
import dsgn from "./AppointmentListController.module.css";
import Button from "../Button/Button";

const AppointmentListController = ()=>{
    return(
        <section className={dsgn["header"]}>
            <Button name="ongoing">Ongoing</Button>
            <Button name="approve">Approve</Button>
        </section>
    )
}

export default AppointmentListController;