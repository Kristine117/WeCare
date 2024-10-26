import React, { useContext, useEffect, useState } from "react";

import SideMenu from "../../components/SideMenu/SideMenu";
import io from 'socket.io-client';
import wcdesign from "./ChatList.module.css";
import UserContext from "../../UserContext";
import ChatListComponent from "../../components/ChatListComponent/ChatListComponent";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";

const apiUrl =`${process.env.REACT_APP_API_URL}`;

const ChatList = () => {
  const [assistantUserList, setAssistantUserList] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const socket= io(apiUrl);

    socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
  });

  socket.on('newMessageReceived', () => { 

      fetchData(); 
  });

    return () => {
        socket.disconnect(); // Clean up the socket connection when component unmounts
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/main/user-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAssistantUserList(data.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);



 const convertdate = (dateTime) =>  {
    const now = new Date();
    const pastDate = new Date(dateTime);
    const diffInSeconds = Math.floor((now - pastDate) / 1000);
  
    const seconds = diffInSeconds;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) {
      return seconds === 1 ? "1s" : `${seconds}s`;
    } else if (minutes < 60) {
      return minutes === 1 ? "1m" : `${minutes}m`;
    } else if (hours < 24) {
      return hours === 1 ? "1h" : `${hours}h`;
    } else if (days < 7) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (days < 365) {
      // Format as '10 Oct' or '13 Mar', etc.
      const options = { month: 'short', day: 'numeric' };
      return pastDate.toLocaleDateString(undefined, options);
    } else {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    }
  }
  

  const { user } = useContext(UserContext);
  return (
    <main>
      {/* {!user?.id && <Navigate to={"/login"}/>} */}
      {user?.id && (
        <section className={wcdesign["dashboard"]}>
          <SideMenu />
          <div className={wcdesign["message-container"]}>
            <div className={wcdesign["message-header"]}>
              <div className={wcdesign["message-head-content"]}>Messages</div>
              <div className="ml-auto mr-4"></div>


            </div>
            <div className={wcdesign["message-list-container"]}>
              {assistantUserList?.map((val) => {
                return (
                  <ChatListComponent
                    key={val.userId}
                    fullName={val.fullName}
                    userId={val.userId}
                    profileImage={`${process.env.REACT_APP_API_URL}/profilePictures/${val.profileImage}`}
                    message={
                      val.messageContent === null 
                        ? '' 
                        : val.contentType === 'picture' 
                          ? `${val.isFromLoggedInUser ? 'You' : val.fullName} sent a photo`
                          : val.contentType === 'file' 
                            ? `${val.isFromLoggedInUser ? 'You' : val.fullName} sent a file`
                            : `${val.isFromLoggedInUser ? 'You ' : val.fullName} : ${val.messageContent}`
                    }
                    
                    date={val.date ? convertdate(val.date) : ''}
                    readFlag={val.readFlag}
                    isFromLoggedInUser={val.isFromLoggedInUser}
                    messageId={val.messageId}      
                   
                  />
                  
                );
              })}
            </div>





          </div>
        </section>
      )}
    </main>
  );
};

export default ChatList;
