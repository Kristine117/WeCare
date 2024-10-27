import React from "react";
import design from "./AppointmentDetails.module.css";
import { FaEllipsisV, FaUser } from "react-icons/fa";
import Button from "../Button/Button";

import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUpdate from "../../hooks/useUpdate";

const AppointmentDetails = ({
  appId,
  description,
  statusDes,
  price,
  servingName,
  loggedInUserType,
  servingProfileImage,
  statusId,
  openModal,
  statusTab,
}) => {
  const navigate = useNavigate();

  const { updateFunc, error } = useUpdate();

  const decideHandler = async (e) => {
    const newAppId = encodeURIComponent(appId);
    const composedUrl = `appointment/update-appointment/${newAppId}`;
    const method = "PUT";
    const result = await updateFunc(method, {
      servingName: servingName,
      result: e.target.name,
    },composedUrl);

    const declaredOption = e.target.name === "approve" ? "Approve" : "Rejected";
    if (result.isSuccess) {
      Swal.fire({
        title: `You have ${declaredOption} Appointment with ${servingName}`,
        icon: "successful",
        text: "Your Appointment is Successfully Approved.",
      });

      navigate("/appointment");
    }
  };

  const userTypeCheck = loggedInUserType === "assistant";

  return (
    <React.Fragment>
      {updateFunc.isSuccess && <Navigate to={"/dashboard-main"} />}
      <div className={design["card"]}>
        <div>
          {servingProfileImage && (
            <img
              src={`${process.env.REACT_APP_API_URL}/profilePictures${servingProfileImage}`}
              className={design["profile-image"]}
              alt="This is your Serving User Image"
            />
          )}
          {!servingProfileImage && (
            <FaUser size={40} className={design["default-profile"]} />
          )}
        </div>

        {statusTab === "ongoing" && (
          <div className={design["container-indicator"]}>
            {userTypeCheck && (
              <div className={design["indicator"]}>
                <strong>{servingName}</strong> would like to request an
                appointment with you.
              </div>
            )}
            {!userTypeCheck && (
              <div className={design["indicator"]}>
                You have booked appointment with <strong>{servingName}</strong>{" "}
              </div>
            )}
            <div className={design["price"]}>Price: {price}</div>
            <div className={design["description"]}>
              Description: {description}
            </div>
          </div>
        )}

        {statusTab === "approve" && (
          <div>
            <h1>{servingName}</h1>
          </div>
        )}

        {userTypeCheck && statusTab === "ongoing" && (
          <div>
            <Button type="button" name="approve" onClick={decideHandler}>
              Accept
            </Button>
            <Button type="button" name="reject" onClick={decideHandler}>
              Reject
            </Button>
          </div>
        )}

        {!userTypeCheck && statusTab === "ongoing" && (
          <div className={design["app-status"]}>
            <div>
              <strong>{statusDes}</strong>
            </div>
            {statusId === 2 && (
              <Button type="button" data-appid={appId} data-amount={price} onClick={openModal}>
                Pay Now
              </Button>
            )}
          </div>
        )}

        {statusTab === "approve" && (
          <div>
            <FaEllipsisV className={design["ellipsis"]} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AppointmentDetails;
