import React, { useContext, useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import wcdesign from "./Profile.module.css";
import UserContext from "../../UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [barangayName, setBarangayName] = useState("");
  const [experience, setExperienceName] = useState("");
  const [experienceYrs, seteExperienceYrs] = useState(0);
  const [rate, setRate] = useState(0);

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
          setUser({
            ...user,
            id: data.data?.userId,
            encryptedId: data.data?.userType,
            lastname: data.data?.lastname,
            firstname: data.data?.firstname,
            email: data.data?.email,
            userType: data.data?.userType,
            street: data.data?.street,
            barangayId: data.data?.barangayId,
            contactNumber: data.data?.contactNumber,
            gender: data.data?.gender,
            birthDate: data.data?.birthDate,
            experienceId: data.data?.experienceId,
            profileImage: data.data?.profileImage,
          });
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching the user profile:", error);
      });
  }, []);

  useEffect(() => {
      fetchBarangayName();
      fetchExperience();
  }, []);

  const fetchExperience = () => {
    fetch(`${process.env.REACT_APP_API_URL}/experience/getSpecific-experience/${user.experienceId}`, {
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
          setExperienceName(data.data?.experienceDescription || "Experience not found");
          seteExperienceYrs(data.data?.numOfYears || "Experiences Years not found");
          setRate(data.data?.rate || "Rate Years not found");
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching the experience:", error);
      });
  };


  const fetchBarangayName = () => {
    fetch(`${process.env.REACT_APP_API_URL}/barangay/getSpecific-barangay/${user.barangayId}`, {
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
          setBarangayName(data.data?.barangay || "Barangay not found");
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching the barangay:", error);
      });
  };

  return (
    <main>
      {user?.id && (
        <section className={wcdesign["profile"]}>
          <SideMenu />
          <div className={wcdesign["profile-container"]}>
            <div className={wcdesign["profile-head"]}>Profile Edit Details</div>
            <div className={wcdesign.containerSizeDifiner}>
              <div className={`${wcdesign.card}`}>
                <form className="user-profile-form">
                  <div className={`form-group ${wcdesign.profileImgContainer}`}>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/profilePictures/${user?.profileImage}`}
                      alt="profile picture"
                      className={wcdesign.profileImage}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="text">Name:</label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      value={user?.firstname + " " + user?.lastname || "data has not been loaded"}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      id="email"
                      type="text"
                      className="form-control"
                      value={user?.email || "data has not been loaded"}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="barangay">Barangay:</label>
                    <input
                      id="barangay"
                      className="form-control"
                      value={barangayName || "data has not been loaded"}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="street">Street:</label>
                    <input
                      id="street"
                      type="text"
                      className="form-control"
                      value={user?.street || "data has not been loaded"}
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <div>Contact Number:</div>
                    <div>{user?.contactNumber || "data has not been loaded"}</div>
                  </div>

                  <div className="form-group">
                    <div>Birth Date:</div>
                    <div>
                    {user?.birthDate 
                      ? new Date(user.birthDate).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
                      : "data has not been loaded"}                    
                    </div>
                  </div>

                  {user.userType === "assistant" ? (
                    <>
                      <div className="form-group">
                        <div>Experience Description:</div>
                        <div>{experience}</div>
                      </div>

                      <div className="form-group">
                        <div>Years of Experience:</div>
                        <div>{experienceYrs}</div>
                      </div>

                      <div className="form-group">
                        <div>Rate:</div>
                        <div>{rate}</div>
                      </div>
                    </>
                  ) : null}

                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
