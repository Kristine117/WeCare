import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import wcdesign from "./Profile.module.css";
import registerModal from "../Register/Register.module.css";
import UserContext from "../../UserContext";
import Swal from "sweetalert2";
import loginModuleCss from "../Login/Login.module.css";
import ProfileUpload from "../../components/ProfileUpload/ProfileUpload";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [barangayName, setBarangayName] = useState([]);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [editableData, setEditableData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    experienceId: "",
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
        if (data.isSuccess) {
          const formattedBirthDate = data.data?.birthDate
          ? new Date(data.data.birthDate).toISOString().split("T")[0]
          : "";
          setUser({
            ...user,
            id: data.data?.userId,
            userType: data.data?.userType,
            barangayId: data.data?.barangayId,
            profileImage: data.data?.profileImage
          });
          setEditableData({
            firstname: data.data?.firstname,
            lastname: data.data?.lastname,
            email: data.data?.email,
            street: data.data?.street,
            experienceId: data.data?.experienceId,
            experienceName: data.data?.experienceName,
            gender: data.data?.gender,
            experienceYrs: data.data?.experienceYrs,
            rate: data.data?.rate,
            experienceId: data.data?.experienceId,
            birthDate: formattedBirthDate,
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

  // const openConfirmationModal = (e) => {
  //   e.preventDefault();
  //   setIsConfirmationModalOpen(true);  
  // };

  const validateFields = () => {
    const newErrors = {};
    if (!editableData.profileImage) {
      newErrors.profileImage = "Profile picture is required.";
    }
    if (!editableData.firstname) newErrors.firstname = "First Name is required.";
    if (!editableData.lastname) newErrors.lastname = "Last Name is required.";
    if (!editableData.email) newErrors.email = "Email is required.";
    if (!editableData.contactNumber)
      newErrors.contactNumber = "Contact Number is required.";
    if (!editableData.gender) newErrors.gender = "Gender is required.";
    if (!editableData.birthDate)
      newErrors.birthDate = "Birth Date is required.";
    if (!editableData.barangayId)
      newErrors.barangayId = "Barangay is required.";
    if (!editableData.password)
      newErrors.password = "Password is required and must be at least 9 characters.";
    if (!editableData.profileImage)
      newErrors.profileImage = "Profile Picture is required.";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const openConfirmationModal = (e) => {
    e.preventDefault();
    if (validateFields()) {
      Swal.fire({
        title: "Are you sure?",
        text: "If you have no intended changes, you can cancel this action or proceed.",
        icon: "question",
        showCancelButton: true,
        showDenyButton: true, // Add a third button
        confirmButtonText: "Continue",
        cancelButtonText: "Go to DashBoard",
        denyButtonText: "Cancel", // Label for the third button
      }).then((result) => {
        if (result.isConfirmed) {
          handleSave();
          //navigate("/dashboard-main"); 
          //Swal.fire("Success!", "Profile has been saved.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Navigate back to the dashboard
          navigate("/dashboard-main");
        } else if (result.isDenied) {
          // Just close the modal (no action needed)
          Swal.fire("Cancelled", "No changes have been made.", "info");
        }
      });
    } else {
      Swal.fire({
        title: "Missing Information",
        icon: "error",
        html: Object.values(errors)
          .map((error) => `<div>${error}</div>`)
          .join(""),
      });
    }
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({ ...prevData, 
      [name]: value }));
  };

  const handleFileSelect = (base64String) => {
    if (base64String) {
      setEditableData((prevData) => ({
        ...prevData,
        profileImage: base64String, // Store the file object (or just a flag if you don't need the file itself)
      }));
      setErrors((prev) => ({ ...prev, profileImage: "" })); // Clear any previous error
    } else {
      setErrors((prev) => ({ ...prev, profileImage: "Please upload a profile image." }));
    }
  };
  


  const handleSave = () => {
    const formData = new FormData();
    formData.append('lastname', editableData.lastname);
    formData.append('firstname', editableData.firstname);
    formData.append('email', editableData.email);
    formData.append('userType', user.userType);
    formData.append('street', editableData.street);
    formData.append('barangayId', editableData.barangayId);
    
    if(user.userType === "senior"){
      formData.append('experienceId', 1);
    } else {
      formData.append('experienceId', editableData.experienceId);
    }

    formData.append('contactNumber', editableData.contactNumber);
    formData.append('gender', editableData.gender);
    formData.append('birthDate', editableData.birthDate);
    formData.append('password', editableData.password);
    
    
    if (editableData.profileImage) {
      formData.append('profileImage', editableData.profileImage); // The file itself
    }


    //Log FormData contents
    console.log('FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }


    // fetch(`${process.env.REACT_APP_API_URL}/main/user-profile/update`,{
    //   method:'PUT',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body:formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.isSuccess === true) {
    //     console.log(data);
    //   } else {
    //     console.log(data);
    //   }
    // })
    // .catch(error => {
    //   console.error("Error:", error);
    // });

    
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
                      required
                    />
                  {errors.firstname && (
                    <small className="text-danger">{errors.firstname}</small>
                  )}
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
                      required
                      />
                  {errors.lastname && (
                    <small className="text-danger">{errors.lastname}</small>
                  )}
                  </div>


                  <div className="form-group">
                    <label>Password</label>
                    <div className="d-flex">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          placeholder="Enter Password"
                          name="password"
                          value={editableData.password}
                          onChange={handleInputChange}
                          minLength="9"
                          required
                        />
                        <span
                          onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state on click
                          className={`${loginModuleCss.curserPoint} ${wcdesign.EyeSpan}`}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye icon based on visibility */}
                        </span>
                    </div>
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>



                  <div className="form-group sex-checkBox-container mb-4">
                    <label>Sex: </label>
                    <div className="d-flex">
                      <input
                        type="radio"
                        name="gender"
                        className="mr-2"
                        id="male"
                        value="male"
                        checked={editableData.gender === "male"} // Check if gender is 'male'
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="male">Male</label>
                      {errors.gender && (
                        <small className="text-danger">{errors.gender}</small>
                      )}
                    </div>

                    <div className="d-flex">
                      <input
                        type="radio"
                        name="gender"
                        className="mr-2"
                        id="female"
                        value="female"
                        checked={editableData.gender === "female"} // Check if gender is 'female'
                        onChange={handleInputChange}
                        required
                      />
                      <label htmlFor="female">Female</label>
                      {errors.gender && (
                        <small className="text-danger">{errors.gender}</small>
                      )}
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
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
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
                {errors.barangayId && (
                      <small className="text-danger">{errors.barangayId}</small>
                )}
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
                    {errors.street && (
                        <small className="text-danger">{errors.street}</small>
                    )}
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
                    {errors.street && (
                        <small className="text-danger">{errors.street}</small>
                    )}
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
                    {errors.birthDate && (
                        <small className="text-danger">{errors.birthDate}</small>
                    )}
                  </div>

                  <div className="form-group d-block mt-4">
                      <ProfileUpload onFileSelect={handleFileSelect} />
                      {errors.profileImage && (
                        <small className="text-danger">{errors.profileImage}</small>
                      )}
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
