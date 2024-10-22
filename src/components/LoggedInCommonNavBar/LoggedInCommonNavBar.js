import React, { useRef } from 'react';
import style from "./LoggedInCommonNavBar.module.css";
import { FaBell,FaUser,FaSearch} from 'react-icons/fa'; 

const LoggedInCommonNavBar = ({title})=>{

      // Create a reference to the input element
      const inputRef = useRef(null);

      // Function to handle click on the search icon
      const handleIconClick = () => {
        if (inputRef.current) {
          inputRef.current.focus();  // Focus the input field
        }
      }; 
    return (
        
        <div className={style.container}>
            <div>
                <h1>{title}</h1>
            </div>
           <div className={style.navbarIconSearchContainer}>

                <div className={style.inputSearch}>
                        <input
                            type="text"
                            ref={inputRef}  // Attach the ref to the input
                            className={style.search}
                            placeholder="Search..."
                        />
                        <FaSearch className="search-icon" onClick={handleIconClick} />  {/* Add onClick handler */}
                </div>    
           </div>

           <div className={style.navbarIconContainer}>
                <div >
                    <button className={style.bell}> <FaBell size={40} className={style.icons} /></button>
                </div>
                <div >
                    <button className={style.profile}> <FaUser size={40} className={style.profileButton}   /></button>
                </div>
            </div>

        </div>
    )
}

export default LoggedInCommonNavBar;