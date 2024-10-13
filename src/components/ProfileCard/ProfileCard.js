import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";

export default function ProfileCard({list}) {

  return (
    <div className={styles["profile-card"]}>
      <div className={styles["profile-head"]}>
        <div className={styles["h1-authencated"]}>Recommended</div>
        <div className={styles["h1-authencated"]}>
          See more{""}
         <Link to={'/find'}>
         <span className={'material-symbols-outlined styles["material-symbols-outlined h1-authencated"]'}
         >
            arrow_forward
          </span>
         </Link>
        </div>
      </div>
      <div className="profile-users">
        {list?.map(val=>{
          return(
            <div className="card" key={val.userId}>
              <img
                src="./wecare_logo_smartphone.png"
                alt="We Care"
                width="100px"
                height="auto"
                className="user-picture"
              />
              <div className="card-body">
                <h5 className="card-title text-blue">{val.fullName}</h5>
              </div>
            </div>
          )
        })}
      </div>
    </div>

  );
}
