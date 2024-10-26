import React, { useState, useRef } from "react";
import style from "./LoggedInCommonNavBar.module.css";
import wcdesign from "../ChatListComponent/ChatListComponent.module.css";
import { FaBell, FaUser, FaSearch } from 'react-icons/fa';

const LoggedInCommonNavBar = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);
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
                    <div className={wcdesign["sidebarProfile"]}>
                        <div className={wcdesign["hamburgerProfile"]} onClick={toggleMenu}>
                            <span className={`material-symbols-outlined`}>close</span>
                        </div>
                        {/* <div className={wcdesign["profile-picture-chat"]}>
                            <div className={wcdesign["piture-section-chat"]}>
                                <img
                                // src={profileImage}
                                alt="Nurse holding syringe"
                                className={wcdesign["profile-image-chat"]}
                                ></img>
                            </div>
                            </div> */}
                    </div>
                </>
            )}
        </>
    );
}

export default LoggedInCommonNavBar;
