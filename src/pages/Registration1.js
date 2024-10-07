
import { useNavigate } from "react-router-dom";


export default function Registration1() {


  const navigate = useNavigate(); 

  return (
    <div className="background1">
      <div className="login-container">
        <div className="login-box">
          <span className="material-symbols-outlined" onClick={() => navigate("/login")}>
            arrow_back
            </span>
          <h3 className="pb-3">Let's create your account</h3>
          <form >
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
