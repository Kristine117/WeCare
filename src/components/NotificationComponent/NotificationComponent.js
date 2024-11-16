import React from "react";
import style from "./Notification.module.css"


function Notification({ notiflist }) {
  return (
    <div> 
      <div>
        {console.log(notiflist)}
        {notiflist?.map((notif, index) => (
          <div
           className={`${notif.readFlag === 0 ? style.unread : style.read} ${style.notifitem}`}
            key={index}
          >
             {notif.isFromReminder === 1 && <div>Reminder:</div>}
            <div>{notif.message}</div>
            <div className={style.viewdiv}>
              <a className={style.viewappointment} href="/appointment" >Go to Appointments</a>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
}


export default Notification;
