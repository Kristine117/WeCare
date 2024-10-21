import React from "react";
import gh from "./Paymaya.module.css";
import { BiArrowBack } from "react-icons/bi";
import Button from "../../Button/Button";

const Paymaya = ({handleBackFunc})=>{
    return (
        <React.Fragment>
           <header className={gh["header"]}> 
                <BiArrowBack className={gh["back"]} onClick={handleBackFunc}/> 
                <img src="./paymaya.png" className={gh["img"]}/>      
            </header>     
            <div className={gh["container"]}>   
                <input name="phone-number" type="number" className={gh["phone-no"]}/>
                <Button type="button">Pay</Button>
            </div>
        </React.Fragment>
    )
}

export default Paymaya;