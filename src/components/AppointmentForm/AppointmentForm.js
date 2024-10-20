import React, { useNavigate } from "react-router-dom";
import "../../components/css/Appointment.css";
import wcdesign from "./AppointmentForm.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AppointmentList from "../../pages/AppointmentList/AppointmentList";

const AppointmentForm = ({ assistantId, assistantName, assistantProfile }) => {
  const today = new Date().toISOString().split("T")[0];
  const appointmentDate = today;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [assistant, setAssistant] = useState(null);
  const [serviceDuration, setServiceDuration] = useState(null);
  const [serviceDescription, setServiceDescription] = useState(null);
  const [serviceDate, setServiceDate] = useState(null);
  const navigate = useNavigate();

  /*  useEffect(() => {
    async function getAssistantDetails() {
      try {
        const data = await fetch(
          `${process.env.REACT_APP_API_URL}/main/assistant-details/${encodeURIComponent(assistantId)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!data.ok) {
          throw new Error("Something went wrong");
        }

        const newData = await data.json();

        setAssistant(newData?.data);
      } catch (e) {
        throw new Error(e.message);
      }
    }

    getAssistantDetails();
  }, [assistantId]); */

  function sendAppointment(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/appointment/create-appointment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentDate: appointmentDate,
        startDate: startDate,
        endDate: endDate,
        assistantId: assistantId,
        numberOfHours: serviceDuration,
        serviceDescription: serviceDescription,
        serviceDate: serviceDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess === true) {
          Swal.fire({
            title: "Appointment Successfully Sent",
            icon: "successfull",
            text: "Your Appointment is Successfull.",
          });

          navigate(<AppointmentList />);
        } else {
          Swal.fire({
            title: "Appointment failed",
            icon: "error",
            text: "Your Appointment was not Successfull.",
          });
          console.log("log-in failed");
        }
      });
  }

  return (
    <div className={wcdesign["form-container"]}>
      <div className={wcdesign["form-head"]}>Appointment</div>
      <div className={wcdesign["form-section"]}>
        <div className={wcdesign["profile-section"]}>
          <img
            src={assistantProfile}
            alt="assitan"
            className={wcdesign["profile-image"]}
          ></img>
          <p className={wcdesign["name"]}>Assistant Name: {assistantName}</p>
        </div>
        <form onSubmit={(e) => sendAppointment(e)}>
          <div className="form-group">
            <label htmlFor="serviceDate">Service Date</label>
            <input
              type="Date"
              id="serviceDate"
              className="form-control"
              onChange={(e) => setServiceDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="Date"
              id="startDate"
              className="form-control"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="Date"
              id="endDate"
              className="form-control"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="service-duration">Service Duration</label>
            <input
              type="number"
              id="service-duration"
              className="form-control"
              onChange={(e) => setServiceDuration(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="service-decription">Service Description</label>

            <textarea
              type="textarea"
              id="service-description"
              className="form-control"
              onChange={(e) => setServiceDescription(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`btn btn-login ${wcdesign["submit-button"]}`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
