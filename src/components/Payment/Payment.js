import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import pm from "./Payment.module.css";
import Button from "../Button/Button";
import Gcash from "../PaymentTypes/Gcash/Gcash";
import Paymaya from "../PaymentTypes/Paymaya/Paymaya";

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
    const [payMethod,setPayMethod] = useState(null);

    const [errMsg,setErrMsg]= useState("");

    function selectedPaymentMethod(e){
        setPayMethod({mode: e.target.dataset.pay})
    }

    function proceedPaymentPage(){
        if(payMethod){
            
           setPay(payMethod);
        }else {
            setErrMsg("Please Choose a Payment method");
        }
    
    }
    useEffect(()=>{
        return ()=>{
            setTimeout(()=>{
                setErrMsg("");
            },3000)
        }
    },[errMsg])

    function handleBackFuncHandler(){
        setPay(null);
    }
  
    const gcash = pay?.mode === "GCash" && <Gcash handleBackFunc={handleBackFuncHandler}/>;
    
    const paymaya = pay?.mode === "Paymaya" && <Paymaya handleBackFunc={handleBackFuncHandler}/>;
    return createPortal(    
        <React.Fragment>
             <div className={pm["backdrop-modal"]} onClick={openModal}>
            
            </div>
            <div className={pm["payment-selection"]}>
                {errMsg && <div className={pm['error-msg']}>{errMsg}</div>}
                {gcash}
                {paymaya}
               {!pay &&
               <div className={pm["payment-selection__header"]}>
               {PAYMENT_SELECTION.map(val=>{
                       return(
                           <div key={val.src} data-pay={val.mode} onClick={selectedPaymentMethod} >
                               <img className={pm["img"]} src={val.src} data-pay={val.mode} onClick={selectedPaymentMethod}/>
                               <div className={pm["title"]} data-pay={val.mode} onClick={selectedPaymentMethod}>{val.mode} </div>
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

