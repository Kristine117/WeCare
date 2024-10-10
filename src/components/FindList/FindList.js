import React, { useState } from "react";
import wcdesign from "./FindList.module.css";

function FindList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div>
      <div className={wcdesign["profile-section"]} onClick={openModal}>
        <div className={wcdesign["profile-picture"]}>
          <div className={wcdesign["piture-section"]}>
            <img
              src="https://images.stockcake.com/public/1/1/a/11a88fd4-67cd-46f6-ba91-ce86df5f891c/nurse-holding-syringe-stockcake.jpg"
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
            <div className={wcdesign["rating-section"]}>4.50 (12 reviews)</div>
          </div>
        </div>
        <div className={wcdesign["message-section"]}>
          <div className={`material-symbols-outlined ${wcdesign["arrow"]}`}>
            arrow_left
          </div>
          <div className={wcdesign["message-container"]}>
            <div className={wcdesign["profile-name"]}>Hi! User Name</div>
            <div className={wcdesign["profile-message"]}>
              Dedicated caregiver with 3 years of experience providing
              compassionate care to elderly and disabled individuals. Skilled in
              personal care, medication management, mobility assistance, and
              emotional support. Known for building strong relationships with
              clients and creating a safe, supportive environment that enhances
              quality of life. Certified in CPR and First Aid, with a deep
              commitment to improving the well-being and comfort of those in my
              care.
            </div>
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
                      src="https://images.stockcake.com/public/1/1/a/11a88fd4-67cd-46f6-ba91-ce86df5f891c/nurse-holding-syringe-stockcake.jpg"
                      alt="Nurse holding syringe"
                      className={wcdesign["profile-image"]}
                    ></img>
                  </div>
                </div>
                <div className={wcdesign["message-section-modal"]}>
                  <div className={wcdesign["message-container-modal"]}>
                    <div className={wcdesign["profile-name-modal"]}>
                      <div>User Name</div>
                      <span class="material-symbols-outlined">female</span>
                      <div>29</div>
                    </div>
                    <div className={wcdesign["profile-exp"]}>
                      <span className={`material-symbols-outlined`}>
                        list_alt_check
                      </span>
                      <div>2.5yrs work experience</div>
                    </div>
                    <div className={wcdesign["profile-address"]}>
                      <span class="material-symbols-outlined">home</span>
                      <div>Cabahug St.123, Cebu, City</div>
                    </div>
                    <div className={wcdesign["profile-rate"]}>
                      <span class="material-symbols-outlined">
                        attach_money
                      </span>
                      <div>Rate: 500.00/hr</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={wcdesign["modal-footer"]}>
              <button className={wcdesign["button"]} onClick={closeModal}>
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
