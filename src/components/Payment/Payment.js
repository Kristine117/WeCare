import React from "react";
import { createPortal } from "react-dom";
import pm from "./Payment.module.css";
const Payment = ()=>{
    return createPortal(
        <div className={pm["backdrop-modal"]}>
            <div className={pm["payment-selection"]}>
                
            </div>
        </div>,
        document.querySelector("#modal")
    )
}

export default Payment;

