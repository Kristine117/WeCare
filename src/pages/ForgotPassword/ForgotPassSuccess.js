import React from 'react'
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import ForgotPassModule from './ForgotPass.module.css';

const ForgotPassSuccess = () => {
    return (
      <>
      <AppNavbar />
      <div className={ForgotPassModule.loginContainer}>
          <div className={ForgotPassModule.contentContainer}>
              <h3 className="pt-4 pb-4">Forgot Password Recovery Successfull</h3>
              <label>
                Password instruction has been sent to your email successfully.
              </label>
          </div>
      </div>
      </>
    )
  }

export default ForgotPassSuccess
