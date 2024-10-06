
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getRegisteredData } from "../store/registration_action";

export default function Registration2() {
  const dispatch = useDispatch();

  const [initialData,setInitialData] = useState({
    firstname:"",
    contactNumber:"",
    birthDate: ""
  })

  const data = useSelector(state=>state.registration);

  function collectData(e){  
    
    setInitialData({...initialData,[e.target.name]:e.target.value });
    
    console.log({...data,...initialData});
    dispatch(getRegisteredData({...data,...initialData}));
  }
  return (
    <div className="background1">
      <div className="login-container">
        <div class="login-box">
          <Link
            as={NavLink}
            to="/registration1"
            exact
            class="material-symbols-outlined"
          >
            arrow_back
          </Link>
          <h3 className="pb-3">A few more steps</h3>
          <form>
            <div className="form-group">
              <label for="email" className="pb-3">
                Step 2: Profile Setup
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
              />
            </div>
            <div className="form-group">
              <label for="firstname" className="pb-3">
                Display Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                placeholder="Enter Display Name"
                name="firstname"
                value={initialData.firstname}
                onChange={collectData}
              />
            </div>
            <div className="form-group">
              <label for="password" className="pb-3">
                Contact No.
              </label>
              <input
                type="text"
                className="form-control"
                id="contactNumber"
                placeholder="Enter Contact Number"
                name="contactNumber"
                value={initialData.contactNumber}
                onChange={collectData}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthDate" className="pb-3">
                Birthday.
              </label>
              <input type="date" id="start" 
              name="birthDate" 
               value={initialData.birthDate}
               onChange={collectData}
               onFocus={collectData}
            
               />
              
            </div>
            <Link as={NavLink} to="/registration3" className="btn btn-login">
              Next
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
