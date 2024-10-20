import React from "react";
import { createPortal } from "react-dom";
import sm from "./SuccessModal.module.css";
const SuccessModal = ()=>{
    return createPortal(
        <div className={sm["backdrop-modal"]}>
            
        </div>,
        document.querySelector("#modal")
    )
}

export default SuccessModal;