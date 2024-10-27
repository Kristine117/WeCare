import React from "react";
import wcdesign from "./ChatListComponent.module.css";
import { Link, useNavigate } from "react-router-dom";

const ChatListComponent = ({
  fullName,
  userId,
  profileImage,
  message,
  date,
  readFlag,
  isFromLoggedInUser,
  messageId,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    updateReadFlg(messageId);
    navigate(`/chat/${encodeURIComponent(userId)}`, {
      state: {
        recipientId: userId,
        fullName: fullName,
        profileImage: profileImage,
      },
    });
  };

  const updateReadFlg = async (msgId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/chat/updateReadFlg`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ messageId: msgId }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Message updated successfully");
    } catch (error) {
      console.error("Failed to update message:", error);
    }
  };

  return (
    <div className={wcdesign["list"]} onClick={handleClick}>
      <div className={wcdesign["profile-section-chat"]}>
        <div className={wcdesign["profile-picture-chat"]}>
          <div className={wcdesign["piture-section-chat"]}>
            <img
              src={profileImage}
              alt="Profile Picture"
              className={wcdesign["profile-image-chat"]}
            ></img>
          </div>
        </div>
        <div className={wcdesign["message-section-chat"]}>
          <div className={wcdesign["message-container-chat"]}>
            <div className={wcdesign["profile-name-chat"]}>{fullName}</div>
            <div
              className={`${wcdesign["profile-message-chat"]} ${
                readFlag || isFromLoggedInUser
                  ? wcdesign["read"]
                  : wcdesign["unread"]
              }`}
            >
              <div>
                {!message ? "No message yet. Start Chat Now!" : message}
              </div>
              <div className={`ml-auto ${wcdesign["online-time"]}`}>
                {date}
                {console.log("date" + date)}
                <span
                  className={`${wcdesign.iconSize} material-symbols-outlined wcdesign["active-time"]`}
                >
                  radio_button_checked
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListComponent;
