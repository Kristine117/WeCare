import React, { useState } from "react";
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
    const [pay,setPay] = useState(null);
    const [payMethod,setPayMethod] = useState({
        method:""
    });
    function selectedPaymentMethod(e){
        setPayMethod({method: e.target.dataset.pay})
    }

    function proceedPaymentPage(){
        
        setPay(payMethod);
    }
    return createPortal(
        <React.Fragment>
             <div className={pm["backdrop-modal"]} onClick={openModal}>
            
            </div>

            <div className={pm["payment-selection"]}>
                
               {!pay &&
               <div className={pm["payment-selection__header"]}>
               {PAYMENT_SELECTION.map(val=>{
                       return(
                           <div key={val.src} onClick={selectedPaymentMethod} data-pay={val.mode}>
                               <img className={pm["img"]} src={val.src}/>
                               <div className={pm["title"]}>{val.mode}</div>
                           </div>
                       )
                   })}

               <Button type="button" onClick={openModal}>Cancel</Button>
               <Button type="button" onClick={proceedPaymentPage}>Proceed</Button>
              </div>}
            </div>
        </React.Fragment>
       ,
        document.querySelector("#modal")
    )
}

export default Payment;

