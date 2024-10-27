import React, { useState, useRef, useEffect } from "react";
import style from "./LoggedInCommonNavBar.module.css";
import wcdesign from "../ChatListComponent/ChatListComponent.module.css";
import { FaBell, FaUser, FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";

const LoggedInCommonNavBar = ({ title }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [profileImg, setProfileImg] = useState("");
    const [fullName, setFullName] = useState("");

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
                        <button className={style.bell}> <FaBell size={28} className={style.icons} /></button>
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
