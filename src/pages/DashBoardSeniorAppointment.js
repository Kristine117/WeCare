import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SideMenu from "../components/SideMenu";
import { Link, Navigate, NavLink } from "react-router-dom";
import Appointment from "../components/Appointment";

const DashBoardSeniorAppointment = () => {
  const { user } = useContext(UserContext);

  // return user.id === null ? (
  //   <Navigate to="/login" />
  // ) : (
  //   <div>
  //     <SideMenu activeAppointment={true} />
  //     <div className=" nav-content shifted">
  //       <Appointment />
  //     </div>
  //   </div>
  // );


  return (
    <div>
         <SideMenu activeAppointment={true} />
      <div className=" nav-content shifted">
        <Appointment />
       </div>    
    </div>
  )
};

export default DashBoardSeniorAppointment;
