import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getRegisteredData } from "../store/registration_action";
import { useState } from "react";

export default function Registration1() {

  const dispatch = useDispatch();

  const navigate = useNavigate(); 

  const [initialData,setInitialData] = useState({
    email:"",
    password:""
  })
  
   function collectData(e){  
    e.preventDefault(); // Prevent form submission from reloading the page

    //setInitialData({...initialData,[e.target.name]:e.target.value });

    dispatch(getRegisteredData(initialData));

    // Navigate to the next page after form submission
    navigate("/registration3");
   }


   function handleChange(e) {
    // Use spread operator to update the specific field
    setInitialData({
      ...initialData,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="background1">
      <div className="login-container">
        <div className="login-box">
          <span className="material-symbols-outlined" onClick={() => navigate("/login")}>
            arrow_back
            </span>
          <h3 className="pb-3">Let's create your account</h3>
          <form onSubmit={collectData}>
            <div className="form-group">
              <label className="pb-3">
                Step 1: Account Details
              </label>
              <label className="pb-3">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email Address"
                name="email"
                value={initialData.email}
                onChange={handleChange} // Use a shared handler for inputs
                required
              />
            </div>
            <div className="form-group">
              <label className="pb-3">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                name="password"
                value={initialData.password}
                onChange={handleChange} // Shared handler
                required
              />
            </div>
            <div className="form-group">
              <label className="pb-3">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Re Enter Password"
                required
              />
            </div>
            <input type="submit" value="Submit and Next" className="btn btn-login" />
          </form>
        </div>
      </div>
    </div>
  );
}
