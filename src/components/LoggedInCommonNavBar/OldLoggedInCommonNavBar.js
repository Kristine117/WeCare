import React, { useContext,useState, useRef, useEffect } from "react";
import style from "./LoggedInCommonNavBar.module.css";
import wcdesign from "../ChatListComponent/ChatListComponent.module.css";
import { FaBell, FaUser, FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";

const LoggedInCommonNavBar = ({ title }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [profileImg, setProfileImg] = useState("");
    const [fullName, setFullName] = useState("");

    const { user, setUser } = useContext(UserContext);
    const [barangayName, setBarangayName] = useState("");
    const [experience, setExperienceName] = useState("");
    const [experienceYrs, seteExperienceYrs] = useState(0);
    const [rate, setRate] = useState(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Create a reference to the input element
    const inputRef = useRef(null);

    // Function to handle click on the search icon
    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();  // Focus the input field
        }
    };
    
    useEffect(() => {        
        fetch(`${process.env.REACT_APP_API_URL}/main/user-profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => {
              if (!res.ok) {
                // If the response has an error status (e.g., 404, 500), throw an error
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.json();
            })
            .then((data) => {
             setProfileImg(data.data?.profileImage);
             setFullName(data.data?.firstname + " " + data.data?.lastname);
            })
            .catch((error) => {
              console.error("An error occurred while fetching the user profile:", error);
            });
//      console.log(`${process.env.REACT_APP_API_URL}/profilePictures/${user.profileImage}`);
    })

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
        <>
            <div className={style.container}>
                <div className={style["title"]}>{title}</div>
                <div className={`${style.subContainer}`}>
                    <div className={style.navbarIconSearchContainer}>
                        <div className={style.inputSearch}>
                            <input
                                type="text"
                                ref={inputRef}  // Attach the ref to the input
                                className={style.search}
                                placeholder="Search..."
                            />
                            <FaSearch className="search-icon" onClick={handleIconClick} />
                        </div>
                    </div>

                    <div className={style.navbarIconContainer}>
                        <button className={style.bell} data-notif-count={notifCount}> <FaBell size={28} className={style.icons} /></button>
                        <button onClick={toggleMenu} className={style.profile}> <FaUser size={28} className={style.profileButton} /></button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <>
                    <div className={wcdesign["overlay"]} onClick={toggleMenu}></div>
                    <div className={`${wcdesign.sidebarProfile} ${wcdesign.profileContainer}`}>

                        <div className={wcdesign["hamburgerProfile"]} onClick={toggleMenu}>
                            <span className={`material-symbols-outlined ${wcdesign.specificPointerIcon}`}>close</span>
                        </div>

                         <div className={wcdesign["profile-picture-chat"]}>
                            <div className={wcdesign["piture-section-chat"]}>
                                <img
                                src={`${process.env.REACT_APP_API_URL}/profilePictures${profileImg}`}
                                alt="Nurse holding syringe"
                                className={wcdesign["profile-image-chat"]}
                                ></img>
                            </div>
                        </div>

                        <div className={wcdesign.profileNameSlideMenu}>
                            {fullName}
                        </div> 
                        {user?.id && (
                            <section className={wcdesign["profile"]}>
                                <form className="user-profile-form">

                                {/* <div className="form-group">
                                    <label htmlFor="text">Name:</label>
                                    <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    value={user?.firstname + " " + user?.lastname || "data has not been loaded"}
                                    readOnly
                                    />
                                </div> */}

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

                                </form>
                            </section>
                        )}
                        <Link to={"/profile"} className={` ${wcdesign.profileIconSlideMenu}`}>
                        Edit Profile
                        <span className={`material-symbols-outlined`}>edit</span>
                        </Link>


                    </div>
                </>
            )}
        </>
    );
}

export default LoggedInCommonNavBar;
