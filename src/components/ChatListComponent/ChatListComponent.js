import React from "react";
import wcdesign from "./ChatListComponent.module.css";

const ChatListComponent = ({ firstName, lastName, userId }) => {
  return (
    <a href={`/chat/:senderId/${userId}`}>
      <div className={wcdesign["list"]}>
        <div className={wcdesign["userProfile"]}>
          Profile Picture
          {/*  <image src={require("../../../public/wecare_logo.pngs")}></image> */}
        </div>
        <div>
          <div className={wcdesign["username"]}>
            {firstName}
            {lastName}
          </div>
          <div className={wcdesign["message"]}>
            <div>This is a sample message</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ChatListComponent;
