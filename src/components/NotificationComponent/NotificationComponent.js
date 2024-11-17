import React,{useState} from "react";
import style from "./Notification.module.css"
import { useNavigate} from "react-router-dom";


function Notification({ notiflist,userType }) {
  const navigate = useNavigate();


  const handleClick = (notifId, isFromReminder) => {
    // Determine the navigation path based on isFromReminder
    if (isFromReminder === 1) {
      navigate(`/notes`);
    } else {
      navigate(`/appointment`);
    }
    updateReadFlg(notifId); // Update the notification read flag
  };
  
  
  const updateReadFlg = async (notifid) => {
    try {
      console.log("yoww")
      console.log(notifid);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/notifications/updateNotifReadFlag`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ notificationId:notifid ,userType:userType}),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // const data = await response.json();
      console.log("Notification updated successfully");
    } catch (error) {
      console.error("Failed to update notification:", error);
    }
  };
  
  return (
    <div>
      <div>
        {console.log(notiflist)}
        {notiflist?.map((notif, index) => (
          <div
            className={`${notif.readFlag === 0 ? style.unread : style.read} ${style.notifitem}`}
            key={notif.notificationId} // Use a unique key
          >
            {notif.isFromReminder === 1 && <div>Reminder:</div>}
            <div>{notif.message}</div>
            <div className={style.viewdiv}>
              <div
                className={style.viewappointment}
                onClick={() =>
                  handleClick(notif.notificationId, notif.isFromReminder)
                }
              >
                {notif.isFromReminder === 1 ? "Go to Notes" : "Go to Appointments"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Notification;
