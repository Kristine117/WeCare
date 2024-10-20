import React from "react";
import { createPortal } from "react-dom";
import pm from "./Payment.module.css";
import Button from "../Button/Button";

const PAYMENT_SELECTION =[
    {
        src: "./cc.png",
        mode: "Credit Card"
    },
    {
        src: "./paymaya.png",
        mode: "Paymaya"
    },
    {
        src: "./gcash.png",
        mode: "GCash"
    }
]
const Payment = ({openModal})=>{
    return createPortal(
        <div className={pm["backdrop-modal"]}>
            <div className={pm["payment-selection"]}>
               <div className={pm["payment-selection__header"]}>
                {PAYMENT_SELECTION.map(val=>{
                        return(
                            <div key={val.src}>
                                <img className={pm["img"]} src={val.src}/>
                                <div className={pm["title"]}>{val.mode}</div>
                            </div>
                        )
                    })}

                <Button type="button" onClick={openModal}>Cancel</Button>
                <Button type="button">Proceed</Button>
               </div>
            </div>
        </div>,
        document.querySelector("#modal")
    )
}

export default Payment;

