import React from "react";
import wcdesign from "./ChatListComponent.module.css";
import { useNavigate } from "react-router-dom";

const ChatListComponent = ({ firstName, lastName, userId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat/:senderId/:receiverId", {
      state: { recipientId: userId },
    });
  };
  return (
    <div className={wcdesign["list"]} onClick={handleClick}>
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
  );
};

export default ChatListComponent;
