import React from "react";
import style from "./Notification.module.css"


function Notification({ notiflist }) {
  return (
    <div> 
      <div>
        {console.log(notiflist)}
        {notiflist?.map((notif, index) => (
          <div className={style.notifItem} key={index}>
            <div>{notif.message}</div>
            <button>View Appointment</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
