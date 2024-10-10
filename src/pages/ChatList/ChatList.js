
import React, { useContext, useEffect,useState } from "react";

import SideMenu from "../../components/SideMenu/SideMenu";
import dashboard from "./ChatList.module.css";
import UserContext from "../../UserContext";
import ChatListComponent from "../../components/ChatListComponent/ChatListComponent";

const ChatList = () => {
  const [assistantUserList, setAssistantUserList] = useState([]);
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
        <section className={dashboard["dashboard"]}>
          <SideMenu />
          <div className={dashboard["message-container"]}>
            <div className={dashboard["message-header"]}>
              <div className={dashboard["message-head-content"]}>Messages</div>
              <div className="search-icon ml-auto mr-4">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search"
                />
              </div>
              <div>
                <span className="material-symbols-outlined side-menu-color icon-size mr-2">
                  notifications
                </span>
              </div>
              <div>
                <span className="material-symbols-outlined side-menu-color icon-size mr-5">
                  account_circle
                </span>
              </div>
            </div>
            <div className={dashboard["message-list-container"]}>
              {assistantUserList.map((val) => {
                return (
                  <ChatListComponent
                    key={val.userId}
                    firstName={val.firstname}
                    lastName={val.lastname}
                    userId={val.userId}
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
