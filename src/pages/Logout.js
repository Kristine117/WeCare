import React from "react";
import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../UserContext";

export default function Logout() {
  const { unsetUser, setUser } = useContext(UserContext);
  unsetUser();

  useEffect(() => {
    setUser({
      id: null,
      userType: null,
    });
  }, []);

  return <Navigate to="/login" />;
}
