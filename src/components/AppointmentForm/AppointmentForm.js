import React from "react-router-dom";
import "../../components/css/Appointment.css";
import wcdesign from "./AppointmentForm.module.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AppointmentForm = ({ assistantId, fullName }) => {
  const today = new Date().toISOString().split("T")[0];
  const appointmentDate = today;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assistant,setAssistant] = useState(null);

  useEffect(()=>{
    async function getAssistantDetails(){
        try{
          const data = await fetch(`${process.env.REACT_APP_API_URL}/main/assistant-details/${assistantId}`,{
            headers:{
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
          })

          if(!data.ok){
            throw new Error("Something went wrong");
          }

          const newData = await data.json();

          setAssistant(newData?.data)
        }catch(e){
          throw new Error(e.message)
        }
    }

    getAssistantDetails();
  },[assistantId])

  console.log(assistant);
  function sendAppointment(e) {
    e.preventDefault();

    console.log("sent boy!");

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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess === true) {
          Swal.fire({
            title: "Appointment Successfully Sent",
            icon: "error",
            text: "Check your login details and try again.",
          });

          console.log("log-in successfully");
        } else {
          Swal.fire({
            title: "Appointment failed",
            icon: "error",
            text: "Check your login details and try again.",
          });
          console.log("log-in failed");
        }
      });
  }

  return (
    <div className={wcdesign["form-container"]}>
      <h3 className="head"> Appointment Details</h3>
      <p>Assistant Name: {assistant?.fullName}</p>
      <form onSubmit={(e) => sendAppointment(e)}>
        <div className="form-group">
          <label>Service Start Date</label>
          <input
            type="Date"
            id="startDate"
            className="form-control"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Service End Date</label>
          <input
            type="Date"
            id="startDate"
            className="form-control"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>


        <div className="form-group">
          <label htmlFor="service-duration">Service Duration</label>
          <input type="number"
          id="service-duration"
          className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-login">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
