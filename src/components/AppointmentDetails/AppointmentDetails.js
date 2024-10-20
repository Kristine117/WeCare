import React from "react";
import design from "./AppointmentDetails.module.css";
import { FaUser } from "react-icons/fa";
import Button from "../Button/Button";

import useUpdateAppointment from "../../hooks/useUpdateAppointment";
const AppointmentDetails = ({
  appId,
  description,
  statusDes,
  price,
  servingName,
  loggedInUserType,
  servingProfileImage,
}) => {
  const { updateAppointment, error } = useUpdateAppointment();

  const decideHandler = async (e) => {
    const method = "PUT";
    await updateAppointment(appId, method, {
      servingName: servingName,
      result: e.target.name,
    });
  };

  const userTypeCheck = loggedInUserType === "assistant";
  return (
    <div className={design["card"]}>
      <div>
        {servingProfileImage && (
          <img
            src={servingProfileImage}
            className={design["profile-image"]}
            alt="This is your Serving User Image"
          />
        )}
        {!servingProfileImage && (
          <FaUser size={40} className={design["default-profile"]} />
        )}
      </div>
      <div>
        {userTypeCheck && (
          <div className={design["indicator"]}>
            <strong>{servingName}</strong> would like to request an appointment
            with you.
          </div>
        )}
        {!userTypeCheck && (
          <div className={design["indicator"]}>
            You have appointment with <strong>{servingName}</strong>{" "}
          </div>
        )}
        <div className={design["price"]}>Price: {price}</div>
        <div className={design["description"]}>Description: {description}</div>
      </div>

      {userTypeCheck && (
        <div>
          <Button type="button" name="accept" onClick={decideHandler}>
            Accept
          </Button>
          <Button type="button" name="reject" onClick={decideHandler}>
            Reject
          </Button>
        </div>
      )}

      {!userTypeCheck && <div>{statusDes}</div>}
    </div>
  );
};

export default AppointmentDetails;
