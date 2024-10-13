import React from "react";
import wcdesign from "./ChatListComponent.module.css";
import { useNavigate } from "react-router-dom";

const ChatListComponent = ({ firstName, lastName, userId, profileImage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/chat/:senderId/:receiverId", {
      state: { recipientId: userId },
    });
  };
  return (
    <div className={wcdesign["list"]} onClick={handleClick}>
      <div className={wcdesign["profile-section-chat"]}>
        <div className={wcdesign["profile-picture-chat"]}>
          <div className={wcdesign["piture-section-chat"]}>
            <img
              src={profileImage}
              alt="Nurse holding syringe"
              className={wcdesign["profile-image-chat"]}
            ></img>
          </div>
        </div>
        <div className={wcdesign["message-section-chat"]}>
          <div className={wcdesign["message-container-chat"]}>
            <div className={wcdesign["profile-name-chat"]}>
              {firstName} {lastName}
            </div>
            <div className={wcdesign["profile-message-chat"]}>
              <div>
                Dedicated caregiver with heheheh 3 years of experience providing
                care.
              </div>
              <div className={wcdesign["online-time"]}>
                1min
                <span
                  className={`material-symbols-outlined wcdesign["active-time"]`}
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
