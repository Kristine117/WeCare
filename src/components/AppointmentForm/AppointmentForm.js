import { useContext, useState } from "react";
import UserContext from "../../UserContext";

import "../../components/css/Appointment.css";
import { useParams } from "react-router-dom";
const AppointmentForm = ()=> {
  const seniorId = useParams();
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="banner d-flex">
      <h3 className="head"> Appointment Details</h3>
      <form>
        
        <div className="form-group">
          <label>Appointment Date</label>
          <input type="Date" className="form-control" />
        </div>
        <div className="form-group">
          <label>Service Date</label>
          <input type="Date" className="form-control" />
        </div>
        <div className="form-group">
          <label>Start Date</label>
          <inp  ut type="Date" className="form-control" />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="Date" className="form-control" />
        </div>

        <button type="submit" className="btn btn-login">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;