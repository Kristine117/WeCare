import React, { useContext, useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import UserContext from "../../UserContext";
import FindList from "../../components/FindList/FindList";

import wcdesign from "./Find.module.css";
const Find = () => {
  const [assistantUserList, setAssistantUserList] = useState([]);
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/senior/assistant-list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAssistantUserList(data.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      {/* {!user?.id && <Navigate to={"/login"}/>} */}
      {user?.id && (
        <section className={wcdesign["dashboard"]}>
          <SideMenu />
          <div className={wcdesign["find-container"]}>
            <div className={wcdesign["find-header"]}>
              <div className={wcdesign["find-head-content"]}>Find</div>
              <div
                className={` ml-auto mr-4 {wcdesign["find-head-content"]}`}
                onClick={toggleMenu}
              >
                <span className="material-symbols-outlined side-menu-color icon-size  ml-auto mr-4">
                  tune
                </span>
              </div>
            </div>
            <div className={wcdesign["find-list-container"]}>
              {assistantUserList.map((val) => {
                return (
                  <FindList
                    key={val.userId}
                    fullName={val.fullName}
                    assistant_address={val.assistant_address}
                    userId={val.userId}
                    profileImage={val.profileImage}
                    reviews={val.reviews}
                    gender={val.gender}
                    experience={val.experienceDescription}
                    assistant_age={val.assistant_age}
                    years_exp={val.numOfYears}
                    rate={val.rate}
                  />
                );
              })}
            </div>

            {!isOpen && (
              <>
                <div
                  className={
                    wcdesign[`${!isOpen ? "sidebarProfileOther" : "closeSide"}`]
                  }
                ></div>
                <div
                  className={
                    wcdesign[`${!isOpen ? "sidebarProfile" : "closeSide"}`]
                  }
                >
                  <div
                    className={wcdesign["hamburgerProfile"]}
                    onClick={toggleMenu}
                  >
                    <span
                      className={`material-symbols-outlined wcdesign["material-symbols-outlined"]`}
                    >
                      close
                    </span>
                    <div className={wcdesign["filter"]}> Filter by:</div>
                  </div>
                  <div className={wcdesign["container-form"]}>
                    <div className={wcdesign["output-section"]}>
                      output Section
                    </div>
                    <div className={wcdesign["rating-section"]}>
                      <div className={wcdesign["section-header"]}>Rating</div>
                      <div className={wcdesign["rating"]}>
                        <div>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                        </div>
                        <div>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                        </div>
                        <div>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                        </div>
                        <div>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                        </div>
                        <div>
                          <span
                            className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                          >
                            star_rate_half
                          </span>
                        </div>
                        <input type="hidden"></input>
                      </div>
                    </div>
                    <div className={wcdesign["age-section"]}>
                      <div className={wcdesign["section-header"]}>Age</div>
                      <div className={wcdesign["age"]}>
                        <label>
                          <input type="checkbox" name="age" /> 18-24
                        </label>
                        <label>
                          <input type="checkbox" name="age" /> 25-34
                        </label>
                        <label>
                          <input type="checkbox" name="age" /> 35-44
                        </label>
                        <label>
                          <input type="checkbox" name="age" /> 45-54
                        </label>
                      </div>
                    </div>
                    <div className={wcdesign["gender-section"]}>
                      <div className={wcdesign["section-header"]}>Gender</div>
                      <div className={wcdesign["gender"]}>
                        <label>
                          <input type="checkbox" name="male" /> Male
                        </label>
                        <label>
                          <input type="checkbox" name="female" /> Female
                        </label>
                        <label>
                          <input type="checkbox" name="both" /> Both
                        </label>
                      </div>
                    </div>
                    <div className={wcdesign["button-section"]}>
                      <button className={wcdesign["btn-search"]}>Search</button>
                      <button className={wcdesign["btn"]}>Clear Filter</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Find;
