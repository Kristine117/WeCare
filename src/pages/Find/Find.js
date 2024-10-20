import React, { useContext, useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import UserContext from "../../UserContext";
import FindList from "../../components/FindList/FindList";

import wcdesign from "./Find.module.css";
const Find = () => {
  const [assistantUserList, setAssistantUserList] = useState([]);
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  // State for form values
  const [rating, setRating] = useState(0);
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);

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

  // Handle star rating click
  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  // Handle age checkbox change
  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Handle gender checkbox change
  const handleGenderChange = (e) => {
    const value = e.target.value;

    if (value === "both") {
      setGender(["male", "female"]);
    } else {
      setGender((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form values here
    console.log("Rating:", rating);
    console.log("Age:", age);
    console.log("Gender:", gender);
  };
  const clearRating = () => setRating(0);
  const clearAge = () => setAge([]);
  const clearGender = () => setGender([]);

  return (
    <main>
      {/* {!user?.id && <Navigate to={"/login"}/>} */}
      {user?.id && (
        <section className={wcdesign["dashboard"]}>
          <SideMenu />
          <div className={wcdesign["find-container"]}>
            <div className={wcdesign["find-header"]}>
              <div className={wcdesign["find-head-content"]}>Find</div>
              <button
                className={`ml-auto mr-4 wcdesign["find-head-content-button"]`}
                onClick={toggleMenu}
              >
                <span className="material-symbols-outlined side-menu-color icon-size  ml-auto mr-4">
                  tune
                </span>
              </button>
            </div>
            <div className={wcdesign["find-list-container"]}>
              {assistantUserList?.map((val) => {
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
              <form onSubmit={handleSubmit}>
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
                  <button
                    className={wcdesign["hamburgerProfile"]}
                    onClick={toggleMenu}
                  >
                    <span
                      className={`material-symbols-outlined wcdesign["material-symbols-outlined"]`}
                    >
                      close
                    </span>
                    <div className={wcdesign["filter"]}> Filter by:</div>
                  </button>

                  <div className={wcdesign["container-form"]}>
                    <div className={wcdesign["output-section"]}>
                      <div className="selected-filters">
                        {rating > 0 && (
                          <button
                            className={wcdesign["filter-button"]}
                            onClick={clearRating}
                          >
                            Rating
                            <span className="remove">✕</span>
                          </button>
                        )}
                        {age.length > 0 && (
                          <button
                            className={wcdesign["filter-button"]}
                            onClick={clearAge}
                          >
                            Age<span className="remove">✕</span>
                          </button>
                        )}
                        {gender.length > 0 && (
                          <button
                            className={wcdesign["filter-button"]}
                            onClick={clearGender}
                          >
                            Gender
                            <span className="remove">✕</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Rating Section */}
                    <div className={wcdesign["rating-section"]}>
                      <div className={wcdesign["section-header"]}>Rating</div>
                      <div className={wcdesign["rating"]}>
                        {/* Display 5 separate divs for each star */}
                        {[5, 4, 3, 2, 1].map((starValue) => (
                          <button
                            key={starValue}
                            className={wcdesign["rating-star-div"]}
                            onClick={() => handleRatingClick(starValue)}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#f0f0f0",
                              border:
                                rating === starValue ? "2px solid #678990" : "",
                              borderRadius: ".5rem",
                            }}
                          >
                            {[...Array(starValue)].map((_, index) => (
                              <span
                                key={index}
                                className={`material-symbols-outlined ${wcdesign["rating-star"]}`}
                              >
                                star
                              </span>
                            ))}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age Section */}
                    <div className={wcdesign["age-section"]}>
                      <div className={wcdesign["section-header"]}>Age</div>
                      <div className={wcdesign["age"]}>
                        {["18-24", "25-34", "35-44", "45-54"].map(
                          (ageRange) => (
                            <label key={ageRange}>
                              <input
                                type="radio"
                                value={ageRange}
                                checked={age.includes(ageRange)}
                                onChange={handleAgeChange}
                              />{" "}
                              {ageRange}
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    {/* Gender Section */}
                    <div className={wcdesign["gender-section"]}>
                      <div className={wcdesign["section-header"]}>Gender</div>
                      <div className={wcdesign["gender"]}>
                        {["male", "female", "both"].map((genderOption) => (
                          <label key={genderOption}>
                            <input
                              type="radio"
                              value={genderOption}
                              checked={
                                gender.includes(genderOption) ||
                                (genderOption === "both" && gender.length === 2)
                              }
                              onChange={handleGenderChange}
                            />{" "}
                            {genderOption.charAt(0).toUpperCase() +
                              genderOption.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className={wcdesign["button-section"]}>
                      <button className={wcdesign["btn-search"]} type="submit">
                        Search
                      </button>
                      <button
                        className={wcdesign["btn"]}
                        type="button"
                        onClick={() => {
                          setRating(0);
                          setAge([]);
                          setGender([]);
                        }}
                      >
                        Clear Filter
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Find;
