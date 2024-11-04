import React, { useState, useRef ,useContext,useEffect} from "react";
import style from "./LoggedInCommonNavBar.module.css";
import wcdesign from "../ChatListComponent/ChatListComponent.module.css";
import NotificationComponent from "../NotificationComponent/NotificationComponent"
import { FaBell, FaUser, FaSearch } from 'react-icons/fa';
import UserContext from "../../UserContext";
import io from 'socket.io-client';


const apiUrl = `${process.env.REACT_APP_API_URL}`;

const LoggedInCommonNavBar = ({ title }) => {
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const[isNotifOpen,setIsNotifOpen]= useState(false);
    const notifModalRef = useRef(null);
    const [notiflist,setNotifList]  = useState([]);
    const userId= user.id
    

    useEffect(() => {
        const socket= io(apiUrl);

        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
            //console.log(userId)
    });

    socket.on('newNotifsReceived', () => { 
       fetchNotif(); 
       console.log("receiving...")
    });


        return () => {
            socket.disconnect(); 
        };
    }, []);

    const fetchNotif =async () => {
       console.log(userId)
        await  fetch(`${process.env.REACT_APP_API_URL}/notifications/getAllNotifs`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                userId: userId,
            },
         
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.nottifications);
              setNotifList(data.nottifications);
              console.log(notiflist)
            });
        };
      
        useEffect(() => {
     fetchNotif();
        }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleNotif = () =>{
        setIsNotifOpen(true);
    }

     // Handle clicks and touches outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isNotifOpen &&
        notifModalRef.current &&
        !notifModalRef.current.contains(event.target)
      ) {
        setIsNotifOpen(false);
      }
    };
    

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Handle touch events

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isNotifOpen]);

    

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
                        <button onClick={toggleNotif} className={style.bell}> <FaBell size={28} className={style.icons} /></button>
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
              {isNotifOpen && (
                <>
                   <div ref={notifModalRef} >
                    <div  className={style.notifContainer} >
                        <NotificationComponent notiflist={notiflist}/>
                    </div> 
                   </div>
                </>
            )}
        </>
    );
}

export default LoggedInCommonNavBar;
