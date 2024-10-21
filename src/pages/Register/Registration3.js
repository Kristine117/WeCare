import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import registerModal from "./Register.module.css";
import Swal from "sweetalert2";
import ProfileUpload from "../../components/ProfileUpload/ProfileUpload";


export default function Registration3() {
    const navigate = useNavigate();

    // Retrieve and parse the initialData from localStorage
    let storedInitialData = JSON.parse(localStorage.getItem("initialData"));

    // Extract email and password from the parsed object
    let storedEmail = storedInitialData ? storedInitialData.email : "";
    let storedPassword = storedInitialData ? storedInitialData.password : "";
  
    const [barangays, setBarangays] = useState([]);
    const [people, setPeople] = useState([]);
    const [activeForm, setActiveForm] = useState(null);
    const [isSeniorModalOpen, setIsSeniorModalOpen] = useState(false);
    const [isCaregiverModalOpen, setIsCaregiverModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // State for confirmation modal
    const [formCompletedSenior, setFormCompletedSenior] = useState(false);  
    const [formCompletedGiver, setFormCompletedGiver] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
    const [age, setAge] = useState('');

  
    // Initialize initialData without Redux state
    const [initialData, setInitialData] = useState({
      lastname: "",
      firstname: "",
      email: "",  
      userType: "",
      street: "",
      contactNumber: "",
      gender: "", 
      birthDate: "",
      numOfYears:"",
      experienceDescription:"",
      rate:"",
      password: "",
      profileImage: "",
      seniorNumber: "",
      prescribeMeds: "",
      healthStatus:"",
      remarks:"",
      relationships: [] // This will store authorized people
    });



  
    const isSeniorFormComplete = () => {
      return activeForm === 'senior' && 
             initialData.firstname && 
             initialData.lastname && 
             initialData.gender && 
             initialData.contactNumber.length === 11 && // Assuming contact number has 11 digits
             initialData.birthDate && 
             initialData.userType && 
             initialData.barangayId && 
             initialData.profileImage &&
             initialData.seniorNumber &&
             initialData.prescribeMeds &&
             initialData.healthStatus &&
             initialData.remarks &&
             initialData.street;
    };
    
    const isCaregiverFormComplete = () => {
      return activeForm === 'caregiver' && 
             initialData.firstname && 
             initialData.lastname && 
             initialData.gender && 
             initialData.contactNumber.length === 11 && // Assuming contact number has 11 digits
             initialData.birthDate && 
             initialData.userType && 
             initialData.barangayId && 
             initialData.numOfYears &&
             initialData.experienceDescription &&
             initialData.rate &&
             initialData.street;
    };
    
    const openSeniorModal = () => {
      setActiveForm('senior');
      setIsSeniorModalOpen(true);
      setInitialData((prevData) => ({
        ...prevData,
        userType: "senior",
        numOfYears:"",
        experienceDescription:"",
        rate:"",
        email: storedEmail,
        password: storedPassword,
      }));
    };
    
    const openCaregiverModal = () => {
      setActiveForm('caregiver');
      setIsCaregiverModalOpen(true);
      setInitialData((prevData) => ({
        ...prevData,
        userType: "assistant",
        email: storedEmail,
        password: storedPassword,
      }));
    };
    
  
    const closeSeniorModal = () => setIsSeniorModalOpen(false);
    const closeCaregiverModal = () => setIsCaregiverModalOpen(false);





            // Fire this function when the component starts
  useEffect(() => {
    // Perform any initialization logic here

    fetch(`${process.env.REACT_APP_API_URL}/barangay/registered-barangays`,{
      method:'GET',
      headers:{
         "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.isSuccess) {
        setBarangays(data.data); // Update the state with barangay data
      } else {
        console.error("Failed to fetch barangay data.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    })
    

  }, []);


        // Open the confirmation modal when the user clicks submit
        const openConfirmationModal = (e) => {
          e.preventDefault();
        
          // Check if activeForm has a value
          if (!activeForm) {
            setErrorMessage("Please select either 'Senior' or 'Caregiver' before proceeding.");
            return; // Prevent further execution if no activeForm is selected
          }
          // Reset error message if activeForm is valid
          setErrorMessage("");
          // If activeForm is valid, open the confirmation modal
          setIsConfirmationModalOpen(true);
        };

  
        const collectDataRegistration1 = (e) => {
          e.preventDefault(); // Prevent default form submission
        
          // Prepare FormData object to send file and other data
          const formData = new FormData();
          
          // Append all user data to the formData
          formData.append('lastname', initialData.lastname);
          formData.append('firstname', initialData.firstname);
          formData.append('email', initialData.email);
          formData.append('userType', initialData.userType);
          formData.append('street', initialData.street);
          formData.append('barangayId', initialData.barangayId);
          formData.append('contactNumber', initialData.contactNumber);
          formData.append('gender', initialData.gender);
          formData.append('birthDate', initialData.birthDate);
          formData.append('password', initialData.password);
          
          if (initialData.seniorNumber) {
            formData.append('seniorNumber', initialData.seniorNumber);
          } else {
            formData.append('seniorNumber', "");
          }
          if (initialData.prescribeMeds) {
            formData.append('prescribeMeds', initialData.prescribeMeds);            
          } else {
            formData.append('prescribeMeds', "");
          }
          if (initialData.healthStatus) {
            formData.append('healthStatus', initialData.healthStatus);
          } else {
            formData.append('healthStatus', "");
          }
          formData.append('remarks', initialData.remarks);
          
          console.log(initialData.relationships.length)
          
          if(initialData.relationships && initialData.relationships.length > 0){
            console.log("the relationship has value");          
            formData.append('relationships', JSON.stringify(initialData.relationships));  
          } else {
            console.log("the relationship has no value");
            formData.append('relationships', JSON.stringify([])); // Ensure an empty array is passed as a string
          }
          


          if (initialData.profileImage) {
            formData.append('profileImage', initialData.profileImage); // The file itself
          }
        
          // Log FormData contents
          console.log('FormData contents:');
          for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
        
          // Send the request using fetch with FormData
          fetch(`${process.env.REACT_APP_API_URL}/main/register-user`, {
            method: 'POST',
            body: formData // Send FormData directly
          })
          .then(response => response.json())
          .then(data => {
            if (data.isSuccess === true) {
              Swal.fire({ title: "Registered Successfully", icon: "success", text: "Account Registered Successfully" });
              navigate("/"); 
            } else {
              console.log(data.errorMessage);
              Swal.fire({ title: "Registration failed", icon: "error", text: "Check account details and try again." });
            }
          })
          .catch(error => {
            console.error("Error:", error);
          });
        
        };

    const collectDataRegistration2 = (e) => {
      e.preventDefault();
      setIsSeniorModalOpen(false);
      setIsCaregiverModalOpen(false);
    
      // Assuming form submission here...
      if(activeForm === 'senior'){
        setFormCompletedSenior(true);
        setFormCompletedGiver(false);
      } else if (activeForm === 'caregiver') {
        setFormCompletedGiver(true);
        setFormCompletedSenior(false);
      }

      };
    


    const calculateAge = (dateString) => {
      const birthDate = new Date(dateString);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      // Adjust age if the birth date hasn't occurred yet this year
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }

      return age;
    };

  
        // Handle changes in form input fields
        const handleChange = (e) => {
          const { name, value } = e.target;
          setInitialData((prevData) => ({
              ...prevData,
              [name]: value,
          }));
  
          // If the changed field is the birth date, calculate the age
          if (name === 'birthDate') {
              if (value) {
                  const calculatedAge = calculateAge(value);
                  setAge(calculatedAge);
              } else {
                  setAge('');
              }
          }
      };
  

    const handleFileSelect = (base64String) => {
      setInitialData((prevData) => ({
        ...prevData,
        profileImage: base64String, // Store the base64 string of the image
      }));
    };

        // Handle changes in the dynamic fields for each person
        const handlePersonChange = (index, e) => {
          const { name, value } = e.target;
          const newPeople = [...people];
          newPeople[index][name] = value;
          setPeople(newPeople);
          setInitialData((prevData) => ({
              ...prevData,
              relationships: newPeople
          }));
      };
  
      // Function to add a new person input set
      const addPersonHandler = (e) => {
          e.preventDefault();
          setPeople([...people, { name: '', age: '', relationship: '', civilstatus: '', occupation: '', contactNumber: '' }]);
      };


      // Function to remove the latest added person
      const removePersonHandler = (e) => {
        e.preventDefault();
        if (people.length > 0) {
          const newPeople = people.slice(0, -1); // Remove the last person
          setPeople(newPeople); // Update the state
          setInitialData((prevData) => ({
            ...prevData,
            relationships: newPeople
          }));
        } else {
          alert('No person to remove.');
        }
      };
    
  
    const seniorButtonClass = isSeniorFormComplete() || formCompletedSenior
    ? `${registerModal.complete} ${registerModal["square-place-holder"]}`
    : `${registerModal["square-place-holder"]}`;
  
  const caregiverButtonClass = isCaregiverFormComplete() || formCompletedGiver
    ? `${registerModal.complete} ${registerModal["square-place-holder"]}`
    : `${registerModal["square-place-holder"]}`;  


    return (
      <div className={registerModal.background1}>
        <div className={registerModal.loginContainer}>
          <div className={registerModal.loginBox}>
            <span
              className="material-symbols-outlined hover-glow"
              onClick={() => navigate("/registration1")}
            >
              arrow_back
            </span>
            <h3 className="pb-3">Almost Finish!</h3>

            <form onSubmit={openConfirmationModal}>
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

              <div>
                <input type="checkbox" className="mr-2" required />
                <label className="pb-1">I agree to the Data Privacy</label>
              </div>

              <div>
                <input type="checkbox"  className={`${registerModal.inputDisableCssDefault} mr-2`} required />
                <label className="pb-2">I agree to the Terms & Conditions.</label>
              </div>
            </div>
            <div>
              {/* Display error message if it exists */}
              {errorMessage && <p className={registerModal.errorMessage}>{errorMessage}</p>}
              
              {/* Your form, modals, and other content */}
            </div>
            <div className="d-flex justify-content-center pt-3">
              <button type="submit" className="btn-get-started buttonSeniorSize">
                Register
              </button>
            </div>
          </form>


          </div>
        </div>



          {/* Confirmation Modal */}
          {isConfirmationModalOpen && (  
            <div className={registerModal.modalConfirmation}>
              <div className={registerModal.modalContentConfirmation}>
                <h4>Confirm Submission</h4>
                <p>Are you sure you want to submit the form?</p>
                <div className="d-flex">
                <button onClick={collectDataRegistration1} className="m-3 btn-get-started buttonSeniorSize">Confirm</button>
                <button onClick={() => setIsConfirmationModalOpen(false)} className="m-3 btn-get-started buttonSeniorSize">
                  Cancel
                </button>
                </div>
              </div>
            </div>
           )} 


 {/* Senior Citizen Modal */}
 {isSeniorModalOpen && (
        <div className={registerModal.modal}>
          <div className={registerModal.modalContentSenior}>
            <span className="close" onClick={closeSeniorModal}>
              &times;
            </span>
            <h2>Senior Application Form</h2>
            <form onSubmit={collectDataRegistration2} className="spacing">

            <div className="d-flex mt-5">  

             <div className="d-block">  
                <div className="form-group d-flex">
                <input type="text" className="form-control mr-4" 
                      placeholder="Enter Family Name" id="familyName" name="lastname" 
                      value={initialData.lastname}
                      onChange={handleChange} required/>
                <input type="text" className="form-control" placeholder="Enter First Name"
                      id="firstName" name="firstname" 
                      value={initialData.firstname}
                      onChange={handleChange}
                      required />
                </div>

                <div className="form-group d-flex mt-4">
                <select
                  id="barangay"
                  name="barangayId"
                  className="form-control"
                  required
                  value={initialData.barangayId} // Ensure you have this defined
                  onChange={handleChange} // Ensure you have a handleChange function defined
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((barangay) => (
                    <option key={barangay.barangayId} value={barangay.barangayId}>
                      {barangay.barangay}
                    </option>
                  ))}
                </select>

                    <input type="text" className="form-control ml-3" placeholder="Enter Street"
                      id="street" name="street" 
                      value={initialData.street}
                      onChange={handleChange}  required/>
                </div>

                <div className={`registerModal.spacingLabel form-group d-flex`}>
                <label className={registerModal.spacingLabel}>
                  Birth Date
                  </label>                  
                </div>
                <div className="form-group d-flex">
                        <input 
                    type="date" 
                    className="form-control mr-4" 
                    name="birthDate" // Ensure name matches initialData
                    value={initialData.birthDate}
                    onChange={handleChange}
                    required 
                />
                    <input 
                        type="number" 
                        className="form-control UserAge" 
                        placeholder="Enter Age" 
                        value={age} // Set the value to the calculated age
                        readOnly // Make the age input read-only
                        required 
                    />
                  </div>


                <div className="form-group d-flex mt-4">
                <input 
                type="text"
                className="form-control mr-2"
                placeholder="Enter contact no."
                id="contact"
                name="contactNumber"
                pattern="\d{11}"  
                minLength="11"    
                maxLength="11"    
                title="Contact number must be exactly 11 digits" 
                value={initialData.contactNumber}
                onChange={handleChange} // Corrected here
                required
              />
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
                </div>
                    
                    <div className="form-group d-block">
                    
                        <input type="text" className="form-control" placeholder="Enter senior citizen number"
                      id="seniorNumber" name="seniorNumber" 
                      value={initialData.seniorNumber}
                      onChange={handleChange}
                      />
                        <label className="mt-2">(If Applicable)</label>
                    </div>
                </div> 
            </div> 
 

            <div className="d-flex mb-5 mt-3"> 
                <label className="mr-3">Health status:</label>
                <input type="radio" name="healthStatus" value="physicallyFit" onChange={handleChange} className="mr-2" id="physicallyFit" required/>
                <label className="mr-3">Physically fit</label>
                <input type="radio" name="healthStatus" value="frailSickly" onChange={handleChange} className="mr-2" id="frailSickly" required/>
                <label className="mr-3">Frail/Sickly</label>
                <input type="radio" name="healthStatus" value="pwd" onChange={handleChange} className="mr-2" id="pwd" required/>
                <label className="mr-3">PWD</label>
                <input type="radio" name="healthStatus" value="bedRidden" onChange={handleChange} className="mr-2" id="bedRidden" required/>
                <label>Bedridden</label>
            </div> 
 

            <div className="d-block mb-3 mt-4"> 
                <label className="mr-3 mb-3">Are you taking medicines/maintenance as prescribed by a doctor?</label>

                <input type="radio" name="prescribeMeds" value="medsYes" onChange={handleChange} className="mr-2" id="medsYes" required/>
                <label className="mr-3">YES</label>
                <input type="radio" name="prescribeMeds" value="medsNo" onChange={handleChange} className="mr-2" id="medsNo" required/>
                <label>NO</label>
            </div>

            <div className="sex-checkBox-container mb-3 mt-4 ml-2"> 
            <label className="mr-3 mb-1">If yes, please write the prescribed medicine/s</label>
            <textarea id="remarks" name="remarks" rows="4" cols="50" 
            value={initialData.remarks}
            onChange={handleChange} // Corrected here
            className="form-control" required>
           
            </textarea>
            </div>

            <div className="sex-checkBox-container mb-3 mt-4 ml-2">
              <label className="mr-3"> Authorized representative (Leave Blank if None)</label>
              <button className="btn-get-started buttonSeniorSize mr-4" onClick={addPersonHandler}>Add Person</button>
              <button className="btn-get-started buttonSeniorSize" onClick={removePersonHandler}>Remove Person</button>
            </div>

            <div>
                {people.map((person, index) => (
                  <div key={index} className="person-inputs mt-4">
                    <h5>Relationship {index + 1}</h5> {/* Dynamic label showing "Relationship X" */}
                    <div className="form-group">
                      <label>Name:</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={person.name} 
                        onChange={(e) => handlePersonChange(index, e)} 
                        className="form-control" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Age:</label>
                      <input 
                        type="number" 
                        name="age" 
                        value={person.age} 
                        onChange={(e) => handlePersonChange(index, e)} 
                        className="form-control" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Relationship:</label>
                      <input 
                        type="text" 
                        name="relationship" 
                        value={person.relationship} 
                        onChange={(e) => handlePersonChange(index, e)} 
                        className="form-control" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Civil Status:</label>
                      <input 
                        type="text" 
                        name="civilstatus" 
                        value={person.civilstatus} 
                        onChange={(e) => handlePersonChange(index, e)} 
                        className="form-control" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Occupation:</label>
                      <input 
                        type="text" 
                        name="occupation" 
                        value={person.occupation} 
                        onChange={(e) => handlePersonChange(index, e)} 
                        className="form-control" 
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Contact Number:</label>
                      <input 
                        type="text" 
                        name="contactNumber" 
                        value={person.contactNumber} 
                        onChange={(e) => handlePersonChange(index, e)} 
                        className="form-control" 
                        required
                      />
                    </div>
                    <hr />
                  </div>
                ))}
              </div>


            
            <div className="form-group d-block mt-4">
                <ProfileUpload onFileSelect={handleFileSelect} />
            </div>


 
              {/* Add more fields as necessary */}
              <div className="d-flex justify-content-center">
              <input type="submit" className="btn-get-started buttonSeniorSize" value="Submit" />
              </div>

            </form>
          </div>
        </div>
      )}



        {/* Caregiver Modal */}
        {isCaregiverModalOpen && (
        <div className={registerModal.modal}>
          <div className={registerModal.modalContent}>
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
                      onChange={handleChange} 
                      required/>
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
                  name="barangayId"
                  className="form-control"
                  required
                  value={initialData.barangayId} // Ensure you have this defined
                  onChange={handleChange} // Ensure you have a handleChange function defined
                >
                  <option value="">Select Barangay</option>
                  {barangays.map((barangay) => (
                    <option key={barangay.barangayId} value={barangay.barangayId}>
                      {barangay.barangay}
                    </option>
                  ))}
                </select>

                    <input type="text" className="form-control ml-3" placeholder="Enter Street"
                      id="street" name="street" 
                      value={initialData.street}
                      onChange={handleChange} required/>
                </div>


                <div className={`registerModal.spacingLabel form-group d-flex`}>
                <label className={registerModal.spacingLabel}>
                  Birth Date
                  </label>                  
                </div>
                <div className="form-group d-flex">
                        <input 
                    type="date" 
                    className="form-control mr-4" 
                    name="birthDate" // Ensure name matches initialData
                    value={initialData.birthDate}
                    onChange={handleChange}
                    required 
                />
                    <input 
                        type="number" 
                        className="form-control UserAge" 
                        placeholder="Enter Age" 
                        value={age} // Set the value to the calculated age
                        readOnly // Make the age input read-only
                        required 
                    />
                  </div>


                <div className="form-group d-flex mt-4">
                <input 
                type="text"
                className="form-control mr-2"
                placeholder="Enter contact no."
                id="contact"
                name="contactNumber"
                pattern="\d{11}"  
                minLength="11"    
                maxLength="11"    
                title="Contact number must be exactly 11 digits" 
                value={initialData.contactNumber}
                onChange={handleChange} // Corrected here
                required
              />
                </div>

                <div className="form-group d-flex mt-4">
                <input 
                type="number"
                className="form-control mr-2"
                placeholder="Enter years of experience"
                id="numOfYears"
                name="numOfYears"  
                value={initialData.numOfYears} 
                onChange={handleChange}               
                required
              />
                </div>

                <div className="form-group d-flex mt-4">
                <input 
                type="text"
                className="form-control mr-2"
                placeholder="Enter experience description"
                id="experienceDescription"
                name="experienceDescription"  
                value={initialData.experienceDescription} 
                onChange={handleChange}               
                required
              />
                </div>

                <div className="form-group d-flex mt-4">
                <input 
                type="number"
                className="form-control mr-2"
                placeholder="Enter rate"
                id="rate"
                name="rate"  
                value={initialData.rate} 
                onChange={handleChange}               
                required
              />
                </div>


                <div className="form-group d-block mt-4">
                    <ProfileUpload onFileSelect={handleFileSelect} />
                </div>

                

              </div> 




            </div> 



              {/* Add more fields as necessary */}
              <div className="d-flex justify-content-center">
              <input type="submit" className="btn-get-started buttonSeniorSize" value="Submit" />
              </div>




            </form>


          </div>
        </div>
      )}
        
      </div>
    );
}
