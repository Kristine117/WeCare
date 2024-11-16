import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import wcdesign from "./Profile.module.css";
import registerModal from "../Register/Register.module.css";
import UserContext from "../../UserContext";
import Swal from "sweetalert2";
import ProfileUpload from "../../components/ProfileUpload/ProfileUpload";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [barangayName, setBarangayName] = useState([]);
  const [editableData, setEditableData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    experienceName:"",
    experienceYrs:"",
    rate:"",
    contactNumber: "",
    gender:"",
    birthDate: "",
    profileImage:"",
    barangayId:"",
    password:""
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/main/user-profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.isSuccess) {
          setUser({
            ...user,
            id: data.data?.userId,
            userType: data.data?.userType,
            experienceId: data.data?.experienceId,
            barangayId: data.data?.barangayId,
            profileImage: data.data?.profileImage
          });
          setEditableData({
            firstname: data.data?.firstname,
            lastname: data.data?.lastname,
            email: data.data?.email,
            street: data.data?.street,
            experienceName: data.data?.experienceName,
            experienceYrs: data.data?.experienceYrs,
            rate: data.data?.rate,
            contactNumber: data.data?.contactNumber,
            barangayId: data.data?.barangayId,
          })
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching the user profile:", error);
      });


      fetch(`${process.env.REACT_APP_API_URL}/barangay/registered-barangays`,{
        method:'GET',
        headers:{
           "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.isSuccess) {
          setBarangayName(data.data); // Update the state with barangay data
        } else {
          console.error("Failed to fetch barangay data.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      })

  }, []);

  const openConfirmationModal = (e) => {
    e.preventDefault();
    setIsConfirmationModalOpen(true);  
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({ ...prevData, 
      [name]: value }));
  };

  const handleFileSelect = (base64String) => {
    setEditableData((prevData) => ({
      ...prevData,
      profileImage: base64String, 
    }));
  };


  const handleSave = () => {
    // console.log("Updated data:", editableData);
    // console.log("Data Retrieved:", user)

    const formData = new FormData();
    formData.append('lastname', editableData.lastname);
    formData.append('firstname', editableData.firstname);
    formData.append('email', editableData.email);
    formData.append('userType', user.userType);
    formData.append('street', editableData.street);
    // formData.append('barangayId', editableData.barangayId);
    formData.append('contactNumber', editableData.contactNumber);
    formData.append('gender', editableData.gender);
    formData.append('birthDate', editableData.birthDate);
    formData.append('password', editableData.password);
    // formData.append('numOfYears', editableData.experienceYrs);
    // formData.append('experienceDescription', editableData.experienceName);
    // formData.append('rate', editableData.rate);
    
    
    if (editableData.profileImage) {
      formData.append('profileImage', editableData.profileImage); // The file itself
    }


    //Log FormData contents
    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    fetch(`${process.env.REACT_APP_API_URL}/main/user-profile/update`,{
      method:'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body:formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.isSuccess === true) {
        Swal.fire({ title: "Registered Successfully", icon: "success", text: "Account Registered Successfully" });
        navigate("/dashboard-main"); 
      } else {
        console.log(data);
        Swal.fire({ title: "Registration failed", icon: "error", text: "Check account details and try again." });
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });

    
  };



  return (
    <>
    <main>
      {user?.id && (
        <section className={wcdesign["profile"]}>
          <SideMenu />
          <div className={wcdesign["profile-container"]}>
            <div className={wcdesign["profile-head"]}>Profile Edit Details</div>
            <div className={wcdesign.containerSizeDifiner}>
              <div className={`${wcdesign.card} mb-5`}>
                <form className="user-profile-form" >
                  <div className={`form-group ${wcdesign.profileImgContainer}`}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/profilePictures/${user?.profileImage}`}
                      alt="profile picture"
                      className={wcdesign.profileImage}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="text">First Name:</label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      className="form-control"
                      value={editableData.firstname}
                      onChange={handleInputChange}
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="text">Last Name:</label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      className="form-control"
                      value={editableData.lastname}
                      onChange={handleInputChange}
                      />
                  </div>


                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter Password"
                      name="password"
                      value={editableData.password}
                      onChange={handleInputChange}
                      minLength="9"
                      required
                    />
                  </div>



                  <div className="form-group sex-checkBox-container mb-4">
                    <label>Sex: </label>
                    <div className="d-flex">
                    <input type="radio" name="gender" className="mr-2" id="male"
                        value="male" // Corrected to set a specific value
                        onChange={handleInputChange}
                        required/>
                        <label htmlFor="male">Male</label>
                    </div>

                    <div className="d-flex">
                    <input type="radio" name="gender" className="mr-2" id="female" 
                        value="female" // Corrected to set a specific value
                        onChange={handleInputChange}
                        required/>
                        <label htmlFor="female">Female</label>
                    </div>
                </div>



                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="form-control"
                      value={editableData.email}
                      onChange={handleInputChange}
                    />
                  </div>



                <div className="form-group">
                <label htmlFor="barangay">Barangay:</label>
                  <select
                  id="barangay"
                  name="barangayId"
                  className={`${registerModal.marginPhone1} form-control`}
                  required
                  value={editableData.barangayId} // Ensure you have this defined
                  onChange={handleInputChange} // Ensure you have a handleChange function defined
                >
                  <option value="">Select Barangay</option>
                  {barangayName.map((barangay) => (
                    <option key={barangay.barangayId} value={barangay.barangayId}>
                      {barangay.barangay}
                    </option>
                  ))}
                </select>
                </div>

                  <div className="form-group">
                    <label htmlFor="street">Street:</label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      className="form-control"
                      value={editableData.street}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <div>Contact Number:</div>
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="text"
                      className="form-control"
                      value={editableData.contactNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <div>Birth Date:</div>
                    <input
                      id="birthDate"
                      name="birthDate"
                      type="date" 
                      className="form-control"
                      value={editableData.birthDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group d-block mt-4">
                      <ProfileUpload onFileSelect={handleFileSelect} />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={openConfirmationModal}>
                    Update
                  </button>

                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>


  {/* Confirmation Modal */}
  {isConfirmationModalOpen && (  
    <div className={registerModal.modalConfirmation}>
      <div className={registerModal.modalContentConfirmation}>
        <h4>Confirm Submission</h4>
        <p>Are you sure you want to submit the form?</p>
        <div className="d-flex">
        <button onClick={handleSave}  className="m-3 btn-get-started buttonSeniorSize">Confirm</button>
        <button onClick={() => setIsConfirmationModalOpen(false)} className="m-3 btn-get-started buttonSeniorSize">
          Cancel
        </button>
        </div>
      </div>
    </div>
    )} 
    </>
  );
};

export default Profile;
