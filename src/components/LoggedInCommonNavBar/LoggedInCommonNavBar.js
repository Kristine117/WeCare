import React from "react";
import style from "./LoggedInCommonNavBar.module.css";
import { FaBell,FaUser,FaSearch} from 'react-icons/fa'; 

const LoggedInCommonNavBar = ()=>{
    return (
        <div className={style.container}>
            <div>
                <h1>Home</h1>
            </div>
           <div className={style.navbarIconSearchContainer}>
                <div className={style.inputSearch}>
                    <input type="text" className={style.search} placeholder="Search..."></input>
                    <FaSearch className="search-icon" />
                </div>
                <div className={style.navbarIconContainer}>
                    <div className={style.bell}>
                        <button> <FaBell size={40} className={style.icons} /></button>
                    </div>
                    <div className={style.profile}>
                        <button> <FaUser size={40} className={style.profileButton}   /></button>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default LoggedInCommonNavBar;