import { useContext } from "react";
import "./css/Banner.css";
import UserContext from "../UserContext";

export default function UnderMaintenance() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="banner d-flex">
      <p className="greeting">Your broken ...</p>
      <p className="user">
        {user.firstname} {user.lastname}
      </p>
    </div>
  );
}
