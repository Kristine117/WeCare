import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import pm from "./RatingModal.module.css";
import useFetchData from "../../hooks/useGetData";
import Button from "../Button/Button";

const RatingModal = ({openRatingModal,appId})=>{
    const [activeRating,setActiveRating]= useState(
        new Array(5).fill(false)
      );
    const [assistant, setAssistant] = useState(null);
    const {fetchDataFuncHandler,loading}=useFetchData();
         // State for form values
  const [rating, setRating] = useState(0);
    async function fetchData(){
      const composedUrl = `senior/assistant-details/${encodeURIComponent(appId)}`;
      const {data}= await fetchDataFuncHandler(composedUrl);
  
      setAssistant(data);
    }
    
    useEffect(()=>{
      fetchData();
    },[])


    function handleRatingClick(e){
        const rating = +e.target.dataset.value;

        const newRates = activeRating.map((val,i)=> {
            if(rating === 5){
                return !val
            }
        })

        console.log(newRates)
        console.log(e.target.dataset.value)
    }


    return createPortal(
        <React.Fragment>

            <div className={pm["backdrop-modal"]} onClick={openRatingModal}>
            </div>

            <div className={pm["content"]}>
                <form className={pm["content-details"]}>
                    <h3 className={pm["header"]}>Submit a Rating</h3>
                    <p>Add a review for</p>
                    <img src={assistant?.profileImage} alt="Assistant Profile"
                    className={pm["profile-image"]}/>
                    <p>{assistant?.fullName}</p>

                    <textarea className={pm["textarea"]} rows="10" cols="50">

                    </textarea>

                    <div className={pm["rate-me"]}>
                        <label>Rate Me</label>
                        {[5, 4, 3, 2, 1].reverse().map((starValue,i) => (
                          <div
                          data-value={starValue}
                          key={starValue}
                          className={`${pm["rating-star"]} ${activeRating[i] ? pm["rating-star__active"]:
                            pm["rating-star__inactive"]
                          }`}
                          onClick={handleRatingClick}></div>
                        ))}
                    </div>

                    <div className={pm["form-footer"]}>
                        <Button type="button" className={pm["btn"]}
                        onClick={openRatingModal}>Cancel</Button>
                        <Button className={pm["btn"]}>Submit</Button>
                    </div>
                </form>
            </div>
        </React.Fragment>
         ,
         document.querySelector("#modal")
    )
}


export default RatingModal;