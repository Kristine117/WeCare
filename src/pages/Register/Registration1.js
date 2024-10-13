import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moduleCSS from './Register.module.css';

export default function Registration1() {
  const navigate = useNavigate();

  // Initialize initialData from localStorage or set to default
  const [initialData, setInitialData] = useState(() => {
    const storedData = localStorage.getItem("initialData");
    return storedData ? JSON.parse(storedData) : { email: "", password: "", confirmPassword: "" };
  });

  // Update localStorage whenever initialData changes
  useEffect(() => {
    localStorage.setItem("initialData", JSON.stringify(initialData));
  }, [initialData]);

  function collectData(e) {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Check if the password and confirm password match
    if (initialData.password !== initialData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/main/get-all-email`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => { // Directly using the response as an array of emails
       // const emails = data.emails;
        console.log(data);
        console.log("inputed value: " + initialData.email);
        // Check if the provided email exists in the fetched emails
        if (data.includes(initialData.email)) {
          console.log('has email');
          alert("Email is already registered. Please use a different email.");
        } else {
          navigate("/registration3");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className={moduleCSS.background1}>
      <div className="login-container">
        <div className="login-box">
          <span className="material-symbols-outlined" onClick={() => navigate("/login")}>
            arrow_back
          </span>
          <h3 className="pb-3">Let's create your account</h3>
          <form onSubmit={collectData}>
            <div className="form-group">
              <label className="pb-3">Step 1: Account Details</label>
              <label className="pb-3">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email Address"
                name="email"
                value={initialData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="pb-3">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password"
                name="password"
                value={initialData.password}
                onChange={handleChange}
                minLength="9"
                required
              />
            </div>
            <div className="form-group">
              <label className="pb-3">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Re Enter Password"
                name="confirmPassword"
                value={initialData.confirmPassword}
                onChange={handleChange}
                minLength="9"
                required
              />
            </div>
            <div className="d-flex justify-content-center">                
              <input type="submit" value="Submit and Next" className="btn-get-started" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
