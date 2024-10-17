import React from "react";
import btn from "./Button.module.css";
const Button = (props) =>{
    return (
        <button className={btn["btn"]} {...props}>{props.children}</button>
    )
}

export default Button;