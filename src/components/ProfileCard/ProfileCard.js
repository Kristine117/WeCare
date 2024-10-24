import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";

export default function ProfileCard({ list }) {
  const navigate = useNavigate();

  const handleRequest = (val) => {
    navigate(`/appointment-page/${encodeURIComponent(val.userId)}`, {
      state: {
        assistantId: val.userId,
        fromFind: true,
        assistantName: val.fullName,
        assistantProfile: val.profileImage,
      },
    });
  };

  return (
    <div className={styles["profile-card"]}>
      <div className={styles["profile-head"]}>
        <div className={styles["h1-authencated"]}>Recommended</div>

        <div className="d-flex">
            <Link to={"/find"} className={styles["link-section"]}>
              <div className={styles["h1-authencated"]}>
                See more{""}
              </div>
            </Link>
            <span
                  className={
                   `${styles.iconColor} material-symbols-outlined styles["material-symbols-outlined h1-authencated"]`
                  }
                >
              arrow_forward
            </span>
        </div>
      </div>
      <div className={styles["profile-users"]}>
        {list?.slice(0, 3).map((val) => {
          return (
            <button
              className={styles["card"]}
              key={val.userId}
              onClick={() => handleRequest(val)}
            >
              <img
                src={val.profileImage}
                alt="We Care"
                className={styles["profile-image"]}
              />
              <div className={styles["card-body"]}>{val.fullName}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
