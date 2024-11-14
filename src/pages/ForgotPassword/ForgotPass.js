import React, { useState } from 'react';
import ForgotPassModule from './ForgotPass.module.css';
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import { useNavigate } from "react-router-dom";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // State for success/error messages

  const forgotPassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message before submission
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/main/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const contentType = response.headers.get("content-type");
      let data;
  
      if (contentType && contentType.includes("application/json")) {
        data = await response.json(); // Parse as JSON if possible
      } else {
        data = { message: await response.text() }; // Fallback to text response
      }
  
      if (response.ok) {
        navigate("/forgot-password-success"); // Navigate after email success
        setMessage("Password reset email sent successfully! Please check your email.");
      } else {
        setMessage(data.message || "Failed to send password reset email.");
      }
  
    } catch (error) {
      console.error("Error:", error);
      setMessage("Email does not exist. Please double-check.");
    }
  };
  


//   const forgotPassword = async (e) => {
//     e.preventDefault();
//     setMessage(""); // Reset message before submission

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/main/forgot-password`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();
//       console.log(data);
//       if (response.ok) {
//         setMessage(""); // Clear any error messages
//         navigate("/forgot-password-success"); // Navigate after email success
//       } else {
//         setMessage(data.message || "Failed to send password reset email.");
//       }
      
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("Email does not exist. Please double-check.");
//     }
//   };

  return (
    <React.Fragment>
      <AppNavbar />
      <div className={ForgotPassModule.loginContainer}>
        <div className={ForgotPassModule.contentContainer}>
          <h3 className="pt-4 pb-4">Forgot Password Recovery</h3>
          <form onSubmit={forgotPassword}>
            <label>
              To reset your password, please enter the registered email for recovery:
            </label>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // Makes email input required
              />
            </div>
            <div className='d-flex justify-content-center mb-3'>
                <button type="submit" className="btn-get-started buttonSeniorSize">
                Submit
                </button>
            </div>
          </form>
          {message && <p className='alert alert-danger'>{message}</p>} {/* Display message */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ForgotPass;
