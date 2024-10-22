import React from "react";
import design from "./AppointmentDetails.module.css";
import { FaEllipsisV, FaUser } from "react-icons/fa";
import Button from "../Button/Button";
import useUpdateAppointment from "../../hooks/useUpdateAppointment";
import { Navigate, useNavigate } from "react-router-dom";
// import UserContext from "../../UserContext";
import Swal from "sweetalert2";
import AppointmentList from "../../pages/AppointmentList/AppointmentList";

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
  statusTab
}) => {
  const navigate = useNavigate();

  const { updateAppointment, error } = useUpdateAppointment();

  const decideHandler = async (e) => {
    const method = "PUT";
    const result= await updateAppointment(appId, method, {
        servingName: servingName,
        result: e.target.name,
      });

    const declaredOption = e.target.name === "approve" ? "Approve" : "Rejected";
    if(result.isSuccess) {
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
        {updateAppointment.isSuccess && <Navigate to={'/dashboard-main'}/>}
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

          {statusTab === 'ongoing' && 
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
            </div>}

          {statusTab === "approve" && 
            <div>
              <h1>{servingName}</h1>  
            </div>
          }

          {(userTypeCheck && statusTab === "ongoing") && 
            <div>
              <Button type="button" name="accept" onClick={decideHandler}>
                Accept
              </Button>
              <Button type="button" name="reject" onClick={decideHandler}>
                Reject
              </Button>
            </div>
          }

          {(!userTypeCheck && statusTab === "ongoing")  && 
            <div className={design["app-status"]}>
              <div>
                <strong>{statusDes}</strong>
              </div>
              {statusId === 2 && (
                <Button type="button" data-amount={price} onClick={openModal} >
                  Pay Now
                </Button>
              )}
            </div>
          }

          {statusTab === "approve" && <div>
              <FaEllipsisV className={design["ellipsis"]}/>
            </div>}
        </div>
    </React.Fragment>
  );
};

export default AppointmentDetails;
