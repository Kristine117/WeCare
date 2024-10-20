import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";

export default function ProfileCard({ list }) {
  console.log(list);

  return (
    <div className={styles["profile-card"]}>
      <div className={styles["profile-head"]}>
        <div className={styles["h1-authencated"]}>Recommended</div>

        <Link to={"/find"} className={styles["link-section"]}>
          <div className={styles["h1-authencated"]}>
            See more{""}
            <span
              className={
                'material-symbols-outlined styles["material-symbols-outlined h1-authencated"]'
              }
            >
              arrow_forward
            </span>
          </div>
        </Link>
      </div>
      <div className={styles["profile-users"]}>
        {list?.map((val) => {
          return (
            <div className={styles["card"]} key={val.userId}>
              <img
                src={val.profileImage}
                alt="We Care"
                className={styles["profile-image"]}
              />
              <div className={styles["card-body"]}>{val.fullName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
