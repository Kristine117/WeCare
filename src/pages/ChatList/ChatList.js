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
                    message={val.message}
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
