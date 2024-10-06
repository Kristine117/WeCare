
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getRegisteredData } from "../store/registration_action";
// import { Link, NavLink } from "react-router-dom";
export default function Registration3() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
  
    // Retrieve email and password from Redux state
    const { email, password } = useSelector((state) => state.registration);
  
    const [activeForm, setActiveForm] = useState(null); // Tracks which form is currently active ('senior' or 'caregiver')
    const [isSeniorModalOpen, setIsSeniorModalOpen] = useState(false);
    const [isCaregiverModalOpen, setIsCaregiverModalOpen] = useState(false);
  
    // Initialize initialData with Redux email and password
    const [initialData, setInitialData] = useState({
      firstname: "",
      lastname: "",
      gender: "",
      contactNumber: "",
      birthDate: "",
      userType: "",
      barangayId: "",
      experienceId: "",
      street: "",
      email: email,        // Set email from Redux state
      password: password   // Set password from Redux state
    });
  
    // Function to check if senior form is complete
    const isSeniorFormComplete = () => {
      if (activeForm !== 'senior') return false; // Only validate if the senior form is active
      return initialData.firstname && initialData.lastname && initialData.gender &&
        initialData.contactNumber && initialData.birthDate && initialData.barangayId &&
        initialData.street;
    };
  
    // Function to check if caregiver form is complete
    const isCaregiverFormComplete = () => {
      if (activeForm !== 'caregiver') return false; // Only validate if the caregiver form is active
      return initialData.firstname && initialData.lastname && initialData.gender &&
        initialData.contactNumber && initialData.barangayId && initialData.street;
    };
  
    // Handle opening the senior modal
    const openSeniorModal = () => {
      setActiveForm('senior');
      setIsSeniorModalOpen(true);
      setInitialData((prevData) => ({
        ...prevData,
        userType: "senior citizen" // Update userType to 'senior citizen' when the button is clicked
      }));
    };
  
    // Handle opening the caregiver modal
    const openCaregiverModal = () => {
      setActiveForm('caregiver');
      setIsCaregiverModalOpen(true);
      setInitialData((prevData) => ({
        ...prevData,
        userType: "senior assistant" // Update userType to 'senior assistant' when the button is clicked
      }));
    };
  
    // Function to close modals
    const closeSeniorModal = () => setIsSeniorModalOpen(false);
    const closeCaregiverModal = () => setIsCaregiverModalOpen(false);
  
    const collectDataRegistration1 = (e) => {
        e.preventDefault();
        console.log("Registered Data in Registration3:", initialData); 
    }



    // Handle form submission
    const collectDataRegistration2 = (e) => {
      e.preventDefault();

    dispatch(getRegisteredData(initialData)); // Dispatch updated initialData to Redux

          // Close the respective modal based on the active form
    if (activeForm === 'senior') {
        setIsSeniorModalOpen(false); // Close senior modal
    } else if (activeForm === 'caregiver') {
        setIsCaregiverModalOpen(false); // Close caregiver modal
    }

    };
  
    // Handle changes in form input fields
    const handleChange = (e) => {
      const { name, value } = e.target;
      setInitialData((prevData) => ({
        ...prevData,
        [name]: value
      }));
  
      // Log all data with each change
      console.log({ ...initialData, [name]: value });
    };
  
    // Add conditional styles based on form completeness
    const seniorButtonClass = isSeniorFormComplete() ? "square-place-holder complete" : "square-place-holder";
    const caregiverButtonClass = isCaregiverFormComplete() ? "square-place-holder complete" : "square-place-holder";
  

  return (
    <div className="background1">
      <div className="login-container">
        <div className="login-box">
          <span
            className="material-symbols-outlined"
            onClick={() => navigate("/registration1")}
          >
            arrow_back
          </span>
          <h3 className="pb-3">Almost Finish!</h3>
          <form onSubmit={collectDataRegistration1}>
            <div className="form-group">
              <label className="pb-3">Step 2: Roles and Agreement</label>
            </div>
            <div className="form-group">
              <label className="pb-3">Register an account for:</label>
              <div className="d-flex justify-content-center">



                {/* Senior button */}
                <div

                className={`${seniorButtonClass} button-hover-effect p-2 m-2 d-flex flex-column align-items-center`}

                onClick={openSeniorModal}
                >
                <span className="material-symbols-outlined icon-custom">
                    elderly
                </span>
                <p className="font-white">Senior</p>
                </div>



                {/* Caregiver button */}
                <div
                className={`${caregiverButtonClass} button-hover-effect p-2 m-2 d-flex flex-column align-items-center`}

                onClick={openCaregiverModal}
                >
                <span className="material-symbols-outlined icon-custom">
                    person_apron
                </span>
                <p className="font-white">Caregiver</p>
                </div>
              </div>



              {/* Agreement section */}
              <div className="form-group">
                <label className="pt-3 pb-3">
                  To continue, please review and agree to the following:
                </label>
              </div>

              <div className="form-group">
                <input type="checkbox" className="mr-2" required/>
                <label className="pb-1">I agree to the Data Privacy</label>
              </div>

              <div className="form-group">
                <input type="checkbox" className="mr-2" required/>
                <label className="pb-2">I agree to the Terms & Conditions.</label>
              </div>
            </div>
            <button type="submit" className="btn btn-login">
              Register
            </button>
          </form>
        </div>
      </div>

      {/* Senior Citizen Modal */}
      {isSeniorModalOpen && (
        <div className="modal">
          <div className="modal-content d-block pt-4">
            <span className="close" onClick={closeSeniorModal}>
              &times;
            </span>
            <h2>Senior Application Form</h2>
            <form onSubmit={collectDataRegistration2}>

            <div className="d-flex mt-5">  

             <div className="d-block">  
                <div className="form-group d-flex">
                  <input type="text" className="form-control mr-4" 
                        placeholder="Enter Family Name" id="familyName" name="lastname" 
                        value={initialData.lastname}
                        onChange={handleChange}/>
                  <input type="text" className="form-control" placeholder="Enter First Name"
                        id="firstName" name="firstname" 
                        value={initialData.firstname}
                        onChange={handleChange}
                      required />
              </div>

                <div className="form-group d-flex mt-4">
                  <select
                      id="barangay"
                      name="barangayId" // The field that will update barangayId in initialData
                      className="form-control select-input"
                      value={initialData.barangayId}
                      onChange={handleChange}
                      required>
                      <option value="">-- Select Barangay --</option>
                      <option value="1">Pasil</option>
                      <option value="2">Minglanilla</option>
                      <option value="3">Talisay</option>
                      </select>

                    <input type="text" className="form-control ml-3" placeholder="Enter Street"
                      id="street" name="street" 
                      value={initialData.street}
                      onChange={handleChange} />
                </div>


                <div className="form-group d-flex">
                    <div className="d-block">
                        <label className="mb-2 ml-2">Birth Date</label>
                        <input type="date" className="form-control mr-4" 
                        required/>
                    </div>
                    <input type="text" className="form-control mt-4 ml-3" placeholder="Enter Age" 
                      id="birthDate" name="birthDate"
                      value={initialData.birthDate}
                      onChange={handleChange} // Corrected here
                    />
                </div>


                <div className="form-group d-flex mt-4">
                <input type="text" className="form-control" placeholder="Enter contact no."
                      id="contact" name="contactNumber" 
                      value={initialData.contactNumber}
                      onChange={handleChange}
                      required/>
                </div>
              </div> 

              <div className="d-block ml-5">  

                <div className="form-group sex-checkBox-container mb-4">
                    <label>Sex: </label>
                    
                    <div className="d-flex ml-5">
                      <input type="radio" name="gender" className="mr-2" id="male"
                          value="male" // Corrected to set a specific value
                          onChange={handleChange}
                          required/>
                        <label htmlFor="male">Male</label>
                    </div>

                    <div className="d-flex ml-5">
                      <input type="radio" name="gender" className="mr-2" id="female" 
                          value="female" // Corrected to set a specific value
                          onChange={handleChange}
                          required/>
                          <label htmlFor="female">Female</label>
                    </div>

       


                    <div className="form-group d-block">
                        <input type="number" className="form-control" placeholder="Enter Senior ID "
                        id="seniodId" name="seniodId"
                        required/>
                        <label className="mt-2">(If Applicable)</label>
                    </div>

                </div> 
            </div> 

            <div className="d-flex mb-3 mt-3 ml-3"> 
                <label className="mr-4">Civil status:</label>
                <input type="radio" name="civilStatus" value="single" className="mr-2" id="single" required/>
                <label className="mr-3">Single</label>
                <input type="radio" name="civilStatus" value="married" className="mr-2" id="married" required/>
                <label className="mr-3">Married</label>
                <input type="radio" name="civilStatus" value="separated" className="mr-2" id="separated" required/>
                <label className="mr-3">Separated</label>
                <input type="radio" name="civilStatus" value="window" className="mr-2" id="window" required/>
                <label>widow/her</label>
            </div> 


            <div className="d-flex mb-3 mt-3 ml-2"> 
                <label className="mr-3">Health status:</label>
                <input type="radio" name="healthStatus" value="physicallyFit" className="mr-2" id="physicallyFit" required/>
                <label className="mr-3">Physically fit</label>
                <input type="radio" name="healthStatus" value="frailSickly" className="mr-2" id="frailSickly" required/>
                <label className="mr-3">Frail/Sickly</label>
                <input type="radio" name="healthStatus" value="pwd" className="mr-2" id="pwd" required/>
                <label className="mr-3">PWD</label>
                <input type="radio" name="healthStatus" value="bedRidden" className="mr-2" id="bedRidden" required/>
                <label>Bedridden</label>
            </div> 
 

            <div className="d-flex mb-3 mt-4 ml-2"> 
                <label className="mr-3">Are you taking medicines/maintenance as prescribed by a doctor?</label>

                <input type="radio" name="medsTaken" value="medsYes" className="mr-2" id="medsYes" required/>
                <label className="mr-3">YES</label>
                <input type="radio" name="medsTaken" value="medsNo" className="mr-2" id="medsNo" required/>
                <label>NO</label>
            </div>

            <div className="sex-checkBox-container mb-3 mt-4 ml-2"> 
              <label className="mr-3 mb-1">If yes, please write the prescribed medicine/s</label>
              <textarea id="prescribeMed" name="prescribeMed" rows="4" cols="50" required>
            
              </textarea>
            </div>

            <div className="sex-checkBox-container mb-3 mt-4 ml-2"> 
            <label className="mr-3"> Authorized representative     (Leave Blank if None)</label>
            <input type="submit" className="btn btn-login buttonSeniorSize" value="Add Person" required/>
            </div>


 
              {/* Add more fields as necessary */}
              <div className="d-flex justify-content-center">
              <input type="submit" className="btn btn-login buttonSeniorSize" value="Submit" />
              </div>
              </div>
            </form>
          </div>
        </div>
        
      )}















      {/* Caregiver Modal */}
      {isCaregiverModalOpen && (
        <div className="modal">
          <div className="modal-content d-block pt-4">
          <span className="close" onClick={closeCaregiverModal}>
              &times;
            </span>
            <h2>Caregiver Registration Form</h2>
            <form  onSubmit={collectDataRegistration2}>

            <div className="d-flex mt-5"> 

            <div className="d-block">  
                <div className="form-group d-flex">
                <input type="text" className="form-control mr-4" 
                      placeholder="Enter Family Name" id="familyName" name="lastname" 
                      value={initialData.lastname}
                      onChange={handleChange}/>
                <input type="text" className="form-control" placeholder="Enter First Name"
                      id="firstName" name="firstname" 
                      value={initialData.firstname}
                      onChange={handleChange} 
                      required/>
                </div>


                <div className="form-group sex-checkBox-container mb-4 ml-3">
                    <label>Sex: </label>
                    <div className="d-flex ml-5">
                    <input type="radio" name="gender" className="mr-2" id="male"
                        value="male" // Corrected to set a specific value
                        onChange={handleChange}
                        required/>
                        <label htmlFor="male">Male</label>
                    </div>

                    <div className="d-flex ml-5">
                    <input type="radio" name="gender" className="mr-2" id="female" 
                        value="female" // Corrected to set a specific value
                        onChange={handleChange}
                        required/>
                        <label htmlFor="female">Female</label>
                    </div>
                </div>


                <div className="form-group d-flex mt-4">
                <select
                    id="barangay"
                    name="barangayId" // The field that will update barangayId in initialData
                    className="form-control select-input"
                    value={initialData.barangayId}
                    onChange={handleChange}
                    required>
                    <option value="">-- Select Barangay --</option>
                    <option value="1">Pasil</option>
                    <option value="2">Minglanilla</option>
                    <option value="3">Talisay</option>
                    </select>

                    <input type="text" className="form-control ml-3" placeholder="Enter Street"
                      id="street" name="street" 
                      value={initialData.street}
                      onChange={handleChange} />
                </div>


                <div className="form-group d-flex">
                    <div className="d-block">
                        <label className="mb-2 ml-2">Birth Date</label>
                        <input type="date" className="form-control mr-4" />
                    </div>
                    <input type="text" className="form-control mt-4 ml-3" placeholder="Enter Age" 
                      id="birthDate" name="birthDate"
                      value={initialData.birthDate}
                      onChange={handleChange} // Corrected here
                      required
                    />
                </div>


                <div className="form-group d-flex mt-4">
                <input type="text" className="form-control mr-2" placeholder="Enter contact no."
                      id="contact" name="contactNumber" 
                      value={initialData.contactNumber}
                      onChange={handleChange}
                      required/>
                <input
                  type="number"
                  id="experienceId"
                  name="experienceId" 
                  className="form-control"
                  placeholder="Number of Years Experience"
                  value={initialData.experienceId}
                  onChange={handleChange}
                  required
                />
                </div>

              </div> 




            </div> 

              {/* Add more fields as necessary */}
              <div className="d-flex justify-content-center">
              <input type="submit" className="btn btn-login buttonSeniorSize" value="Submit" />
              </div>




            </form>


          </div>
        </div>
      )}
    </div>
  );
}
