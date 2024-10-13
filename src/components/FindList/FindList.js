import React, { useState } from "react";
import wcdesign from "./FindList.module.css";
import { useNavigate } from "react-router-dom";

function FindList({
  fullName,
  assistant_address,
  userId,
  profileImage,
  reviews,
  gender,
  experience,
  assistant_age,
  years_exp,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
    console.log("m1");
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Close modal when clicking outside the modal content
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalOpen(false);
      console.log("m2");
    }
  };

  const handleRequest = () => {
    navigate("/appointment-page/:assistantId", {
      state: { assistantId: userId, fromFind: true },
    });
  };

  console.log(userId);

  return (
    <div>
      <div className={wcdesign["profile-section"]} onClick={openModal}>
        <div className={wcdesign["profile-picture"]}>
          <div className={wcdesign["piture-section"]}>
            <img
              src={profileImage}
              alt="Nurse holding syringe"
              className={wcdesign["profile-image"]}
            ></img>
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
            <div className={wcdesign["rating-section"]}>
              4.50 ({reviews} reviews)
            </div>
          </div>
        </div>
        <div className={wcdesign["message-section"]}>
          <div className={`material-symbols-outlined ${wcdesign["arrow"]}`}>
            arrow_left
          </div>
          <div className={wcdesign["message-container"]}>
            <div className={wcdesign["profile-name"]}>{fullName}</div>
            <div className={wcdesign["profile-message"]}>{experience}</div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={wcdesign["modal-overlay"]} onClick={handleOverlayClick}>
          <div className={wcdesign["modal"]}>
            <div className={wcdesign["modal-body"]}>
              <div
                className={wcdesign["profile-section-modal"]}
                onClick={openModal}
              >
                <div className={wcdesign["profile-picture-modal"]}>
                  <div className={wcdesign["piture-section-modal"]}>
                    <img
                      src={profileImage}
                      alt="Nurse holding syringe"
                      className={wcdesign["profile-image"]}
                    ></img>
                  </div>
                </div>
                <div className={wcdesign["message-section-modal"]}>
                  <div className={wcdesign["message-container-modal"]}>
                    <div className={wcdesign["profile-name-modal"]}>
                      <div>{fullName}</div>
                      {gender === "Male" ? (
                        <span className="material-symbols-outlined">male</span>
                      ) : (
                        <span className="material-symbols-outlined">
                          female
                        </span>
                      )}
                      <div>{assistant_age}</div>
                    </div>
                    <div className={wcdesign["profile-exp"]}>
                      <span className={`material-symbols-outlined`}>
                        list_alt_check
                      </span>
                      <div>{years_exp}yrs work experience</div>
                    </div>
                    <div className={wcdesign["profile-address"]}>
                      <span className="material-symbols-outlined">home</span>
                      <div>{assistant_address}</div>
                    </div>
                    <div className={wcdesign["profile-rate"]}>
                      <span className="material-symbols-outlined">
                        attach_money
                      </span>
                      <div>Rate: 500.00/hr</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={wcdesign["modal-footer"]}>
              <button className={wcdesign["button"]} onClick={handleRequest}>
                Request
              </button>
              <button className={wcdesign["button"]} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FindList;
