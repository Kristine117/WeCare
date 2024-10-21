import React from "react";
import Button from "../../Button/Button";
import { BiArrowBack } from "react-icons/bi";
import gh from "./Gcash.module.css";
const Gcash = ({handleBackFunc})=>{
    return (
        <React.Fragment>
           <header className={gh["header"]}> 
                <BiArrowBack className={gh["back"]} onClick={handleBackFunc}/> 
                <img src="./gcash.png" className={gh["img"]}/>      
            </header>     
            <div className={gh["container"]}>   
                <input name="phone-number" type="number" className={gh["phone-no"]}/>
                <Button type="button">Pay</Button>
            </div>
        </React.Fragment>
    )
}
export default Gcash;