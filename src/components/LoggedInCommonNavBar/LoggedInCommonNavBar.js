
import React, { useState, useRef ,useContext,useEffect} from "react";
import style from "./LoggedInCommonNavBar.module.css";
import wcdesign from "../ChatListComponent/ChatListComponent.module.css";
import NotificationComponent from "../NotificationComponent/NotificationComponent"
import { FaBell, FaUser, FaSearch } from 'react-icons/fa';
import UserContext from "../../UserContext";
import io from 'socket.io-client';
import { Link } from "react-router-dom";

<<<<<<< HEAD
const apiUrl = `${process.env.REACT_APP_API_URL}`;

const LoggedInCommonNavBar = ({ title }) => {
    const { user } = useContext(UserContext);
=======
const LoggedInCommonNavBar = ({ title, onSelectChange }) => {
    
>>>>>>> cc027d97fe13cf4b6b8e36a298a72c039b48f735
    const [isOpen, setIsOpen] = useState(false);
    const[isNotifOpen,setIsNotifOpen]= useState(false);
    const notifModalRef = useRef(null);
    const [notiflist,setNotifList]  = useState([]);
    const userId= user.id
    const [profileImg, setProfileImg] = useState("");
    const [fullName, setFullName] = useState("");
<<<<<<< HEAD
    

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

=======
    const [list, setList] = useState([]);
    const [status, setStatus] = useState(["approve"]);
>>>>>>> cc027d97fe13cf4b6b8e36a298a72c039b48f735

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
        async function getAppointmentList() {
          const data = await fetch(
            `${process.env.REACT_APP_API_URL}/appointment/appointment-list`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                status: status,
              },
            }
          );
          const parseData = await data.json();
          setList(parseData?.data);
          console.log(list);
        }
        getAppointmentList();
    }, []);


    return (
        <>
<div className={style.container}>

            <div className={style["title"]}>{title}</div>
                <div className={`${style.subContainer}`}>
                    {title === 'Notes' ? (
                        <select
                            className={style.modernSelect}
                            onChange={(e) => onSelectChange(e.target.value)}
                        >
                            <option value={0}>--Select Appointment Notes--</option>
                            {list.map((item) =>
                                !item.isExpired && (
                                <option key={item.appointmentId} value={item.appointmentId}>
                                    {item.serviceDescription}
                                </option>
                                )
                            )}
                        </select>
                    ) : (
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
                    )}
                    <div className={style.navbarIconContainer}>
                        <button onClick={toggleNotif} className={style.bell}> <FaBell size={28} className={style.icons} /></button>
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
