import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SideMenu from "../components/SideMenu";
import { Link, Navigate, NavLink } from "react-router-dom";
import UnderMaintenance from "../components/UnderMaintenance";

const DashBoardSeniorMessage = () => {
  const { user } = useContext(UserContext);

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <SideMenu activeMessage={true} />
      <div className=" nav-content shifted">
        <UnderMaintenance />
      </div>
    </div>
  );
};

export default DashBoardSeniorMessage;
