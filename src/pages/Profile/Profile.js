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
            <div className={wcdesign["profile-head"]}>Profile Edit Details</div>
            <form>
              <div className={wcdesign["details-section"]}>
                <div className={wcdesign["detail"]}>
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    type="text"
                    className="form-control"
                    value={"Hakdog@mail.com"}
                  ></input>
                </div>
                <div className={wcdesign["detail"]}>
                  <label htmlFor="barangay">Barangay:</label>
                  <select id="barangy" className="form-control">
                    <option>Mabolo</option>
                  </select>
                </div>
                <div className={wcdesign["detail"]}>
                  <label htmlFor="street">Street:</label>
                  <input
                    id="street"
                    type="text"
                    className="form-control"
                    value={"Kidanpawan St."}
                  ></input>
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
            </form>
          </div>
        </section>
      )}
    </main>
  );
};

export default Profile;
