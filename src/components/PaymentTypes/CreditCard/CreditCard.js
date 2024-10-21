import React from "react";
import cc from "./CreditCard.module.css";
import Button from "../../Button/Button";
const CreditCard = ({handleBackFunc})=>{
    return(
        <div className={cc["container"]}>
            <img src="./cc.png" className={cc["img"]}/>

            <div className={cc["cc-container"]}>
                <div className={cc["form-group"]}>
                    <label htmlFor="cs-name">Name</label>
                    <input name="cs-name"/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="expiration">Expiration</label>
                    <input name="expiration"/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="card-number">Card No.</label>
                    <input name="card-number" type="number"/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="cyy">CYY</label>
                    <input name="cyy"/>
                </div>
            </div>
            <div className={cc["footer"]}>
                
            <Button type="button" onClick={handleBackFunc} className={cc['btn']}>Cancel</Button>
            <Button type="button" className={cc['btn']}>Proceed</Button>
            </div>
        </div>
    )
}

export default CreditCard;