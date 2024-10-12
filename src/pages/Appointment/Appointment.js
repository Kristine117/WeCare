import React, { useContext } from "react";
import appnt from "./Appointment.module.css";
import UserContext from "../../UserContext";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import { Navigate } from "react-router-dom";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";

const Appointment = ()=>{
  const {user} = useContext(UserContext);

  return (
    <main>
      {!user?.id && <Navigate to={"/login"}/>}
           {user?.id &&  <section className={dashboard['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <AppointmentForm/>
              </DashboardContainer>            
            </section>}
    </main>

  )
}

export default Appointment;