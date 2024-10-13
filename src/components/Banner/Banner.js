import { useContext } from "react";
import style from "./Banner.module.css"
import UserContext from "../../UserContext";
export default function Banner() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={style.banner}>
      <p className={style.greeting}>WELCOME!</p>
      <p className={style.user}>
        {user.firstname} {user.lastname}
      </p>
    </div>
  );
}
