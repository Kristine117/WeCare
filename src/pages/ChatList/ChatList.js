import React, { useContext, useEffect, useState } from "react";

import SideMenu from "../../components/SideMenu/SideMenu";
import wcdesign from "./ChatList.module.css";
import UserContext from "../../UserContext";
import ChatListComponent from "../../components/ChatListComponent/ChatListComponent";

const ChatList = () => {
  const [assistantUserList, setAssistantUserList] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

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
              <div>
                <span className="material-symbols-outlined side-menu-color icon-size mr-2">
                  notifications
                </span>
              </div>
              <div onClick={toggleMenu}>
                <span className="material-symbols-outlined side-menu-color icon-size mr-5">
                  account_circle
                </span>
              </div>
            </div>
            <div className={wcdesign["message-list-container"]}>
              {assistantUserList?.map((val) => {
                return (
                  <ChatListComponent
                    key={val.userId}
                    fullName={val.fullName}
                    userId={val.userId}
                    profileImage={val.profileImage}
                    message={val.messageContent}
                    date={convertdate(val.date)}
                  />
                );
              })}
            </div>
            {!isOpen && (
              <>
                <div
                  className={
                    wcdesign[`${!isOpen ? "sidebarProfileOther" : "closeSide"}`]
                  }
                ></div>
                <div
                  className={
                    wcdesign[`${!isOpen ? "sidebarProfile" : "closeSide"}`]
                  }
                >
                  <div
                    className={wcdesign["hamburgerProfile"]}
                    onClick={toggleMenu}
                  >
                    <span
                      className={`material-symbols-outlined wcdesign["material-symbols-outlined"]`}
                    >
                      close
                    </span>
                  </div>
                  <div className={wcdesign["container-form"]}>
                    <div className={wcdesign["piture-section"]}>
                      <img
                        src="https://images.stockcake.com/public/1/1/a/11a88fd4-67cd-46f6-ba91-ce86df5f891c/nurse-holding-syringe-stockcake.jpg"
                        alt="Nurse holding syringe"
                        className={wcdesign["profile-image"]}
                      ></img>
                      <div className={wcdesign["username"]}>
                        {user.firstname} {user.lastname}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default ChatList;
