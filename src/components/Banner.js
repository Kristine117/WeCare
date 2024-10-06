import { useContext } from "react";
import "./css/Banner.css";
import UserContext from "../UserContext";

export default function Banner() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="banner d-flex">
      <p className="greeting">WELCOME!</p>
      <p className="user">
        {user.firstname} {user.lastname}
      </p>
    </div>
  );
}
