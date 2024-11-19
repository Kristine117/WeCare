import { useNavigate } from "react-router-dom"; // Import navigate hook
import React, { useContext} from "react";
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";

export default function ProfileCard({ list }) {
  const navigate = useNavigate();
  const {user} = useContext(UserContext);

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
      {user.userType === 'assistant' && (<div className={styles["h1-authencated"]} >Requests</div>)}
      {user.userType === 'senior' && (<div className={styles["h1-authencated"]} >Recomended</div>)}
        <div className="d-flex">
            {user.userType === 'assistant' && <Link to={"/appointment"} className={styles["link-section"]}>
              <div className={styles["h1-authencated"]}>
                See more{""}
              </div>
            </Link>}
            {user.userType === 'senior' && <Link to={"/find"} className={styles["link-section"]}>
              <div className={styles["h1-authencated"]}>
                See more{""}
              </div>
            </Link>}
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
                  src={`${process.env.REACT_APP_API_URL}/profilePictures${val.profileImage}`}
                  alt="Profile"
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
