import { Link, Navigate, NavLink } from "react-router-dom";
import React, { useState, useContext} from "react";
import Swal from "sweetalert2";
import loginModuleCss from "./Login.module.css";
import UserContext from "../../UserContext";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState(false);

  function authenticate(e) {
    e.preventDefault();
   
    fetch(`${process.env.REACT_APP_API_URL}/main/login-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess === true) {
          Swal.fire({ title: "Log-in Successfully", icon: "success", text: "Account Login Successfully" });
          localStorage.setItem("token", data.data.token);
          retrieveUserDetails(data.data.token);
          setUser({
            token: localStorage.getItem("token"),
          });
          console.log("log-in successfully");
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again.",
          });
          console.log("log-in failed");
        }
      });
  }

  const retrieveUserDetails = (token) => {

    fetch(`${process.env.REACT_APP_API_URL}/main/user-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.data.userId);

        setUser({
          id: data.data.userId,
          encryptedId: data.data.userType,
          lastname: data.data.lastname,
          firstname: data.data.firstname,
          email: data.data.email,
          userType: data.data.userType,
          street: data.data.street,
          barangayId: data.data.barangayId,
          contactNumber: data.data.contactNumber,
          gender: data.data.gender,
          birthDate: data.data.birthDate,
          experienceId: data.data.experienceId,
        });
      });
  };

  return (
   <React.Fragment>
      <AppNavbar/>
      {!user.id && <div className={`${loginModuleCss.background1}`}>
      <div className={`${loginModuleCss.loginContainer}`}>
        <div className="login-box">
          <h3 className="pt-4 pb-4">Login account</h3>
          {user.error ? (
            <div>
              <h5 className="error">Bad Credentials</h5>
            </div>
          ) : (
            <div></div>
          )}
          <form onSubmit={(e) => authenticate(e)}>
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
              </label>
              <div className="d-flex">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle type between 'text' and 'password'
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                  />

                      <span
                          onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state on click
                          style={{
                            position: 'absolute',
                            right: '38rem',
                            top: '62.8%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                        }}
                      >
                          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye icon based on visibility */}
                      </span>
              </div>
              
            
            </div>

            <div className="form-text">
              <Link to={"/forgot-password"}>Forgot Password?</Link>
            </div>
            <div  className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn-get-started buttonSeniorSize">
                Login
              </button>
            </div>
            <div className="signup-text">
              <small>
                Don't have an account?{" "}
                <Link as={NavLink} to="/registration1" exact>
                  Sign up
                </Link>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>}

    {user.id && 
    <Navigate to={"/dashboard-main"}/>}
   </React.Fragment>
  )
}
