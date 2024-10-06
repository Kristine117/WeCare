import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SideMenu from "../components/SideMenu";
import { Link, Navigate, NavLink } from "react-router-dom";
import Find from "../components/Find";

const DashBoardSeniorFind = () => {
  const { user } = useContext(UserContext);

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <SideMenu activeFind={true} />
      <div className=" nav-content shifted">
        <Find />
      </div>
    </div>
  );
};

export default DashBoardSeniorFind;
