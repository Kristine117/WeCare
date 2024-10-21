import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import wcdesign from "./Profile.module.css";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
const Profile = () => {
  const { user } = useContext(UserContext);

  //   const [assistantList, setAssistantList] = useState([]);

  //   useEffect(() => {
  //     async function getAssistantList() {
  //       const data = await fetch(
  //         `${process.env.REACT_APP_API_URL}/senior/assistant-list`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );

  //       if (!data.ok) {
  //         throw new Error("Something went wrong");
  //       }

  //       const list = await data.json();
  //       setAssistantList(list.data);
  //     }
  //     getAssistantList();
  //   }, []);

  return (
    <main>
      {/* {!user?.id && <Navigate to={"/login"} />} */}
      {user?.id && (
        <section className={wcdesign["profile"]}>
          <SideMenu />
          <div className={wcdesign["profile-container"]}>
            <div className={wcdesign["profile-head"]}>Profile Details</div>
            <div className={wcdesign["profile-body"]}>
              <div className={wcdesign["profile-image-section"]}>
                <img
                  src="https://images.stockcake.com/public/3/a/0/3a0180f8-3d87-4c69-bcbc-223d52e6f902_large/dynamic-basketball-action-stockcake.jpg"
                  alt="We Care"
                  className={wcdesign["profile-image"]}
                />
                <div>John Loyd Cruz</div>
              </div>
              <div className={wcdesign["details-section"]}>
                <div className={wcdesign["detail"]}>
                  <div>Email:</div>
                  <div>Hakdog@mail.com</div>
                </div>
                <div className={wcdesign["detail"]}>
                  <div>Address:</div>
                  <div>Kidanpawan St.,Mabolo,Cebu City</div>
                </div>
                <div className={wcdesign["detail"]}>
                  <div>Contact Number:</div>
                  <div>Hakdog@mail.com</div>
                </div>
                <div className={wcdesign["detail"]}>
                  <div>Birth Date:</div>
                  <div>March 20, 1989</div>
                </div>
                <div className={wcdesign["detail"]}>
                  <div>Experience:</div>
                  <div>2yrs</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
