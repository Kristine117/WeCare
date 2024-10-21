import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import pm from "./Payment.module.css";
import Button from "../Button/Button";
import Gcash from "../PaymentTypes/Gcash/Gcash";
import Paymaya from "../PaymentTypes/Paymaya/Paymaya";
import CreditCard from "../PaymentTypes/CreditCard/CreditCard";
import axios from "axios";

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

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

const Payment = ({openModal,amount})=>{

    const [pay,setPay] = useState(null);
    const [payMethod,setPayMethod] = useState(null);

    const [errMsg,setErrMsg]= useState("");

    function selectedPaymentMethod(e){
        setPayMethod({mode: e.target.dataset.pay})
    }

    const newAmount = String(amount) + "00";
   
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

    async function createPaymentIntent() {
        try {
            const response = await axios.post(
            'https://api.paymongo.com/v1/payment_intents',
            {
                data: {
                attributes: {
                    amount: +newAmount,  // Amount in centavos (50000 = PHP 500.00)
                    payment_method_allowed: ["gcash","card","paymaya"],
                    currency: "PHP",
                    description: "Transfer via Payment Method",
                    statement_descriptor: "We Care",
                }
                }
            },
            {
                headers: {
                Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`,
                'Content-Type': 'application/json',
                }
            }
            );
            console.log('Payment Intent Created:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating payment intent:', error.response ? error.response.data : error.message);
        }
    }

      async function confirmPaymentIntent(paymentIntentId, paymentMethodId) {
        try {
          const response = await axios.post(
            `https://api.paymongo.com/v1/payment_intents/${paymentIntentId}/attach`,
            {
              data: {
                attributes: {
                  payment_method: paymentMethodId,
                }
              }
            },
            {
              headers: {
                Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`,
                'Content-Type': 'application/json',
              }
            }
          );
          
          console.log('Payment Confirmed:', response.data);
        } catch (error) {
          console.error('Error confirming payment:', error.response ? error.response.data : error.message);
        }
      }
      
      
  
    const gcash = pay?.mode === "GCash" && <Gcash handleBackFunc={handleBackFuncHandler}/>;
    
    const paymaya = pay?.mode === "Paymaya" && <Paymaya handleBackFunc={handleBackFuncHandler}/>;
    
    const cc = pay?.mode === "Credit Card" && <CreditCard handleBackFunc={handleBackFuncHandler}/>;

    return createPortal(    
        <React.Fragment>
             <div className={pm["backdrop-modal"]} onClick={openModal}>
            
            </div>
            <div className={pm["payment-selection"]}>
                {errMsg && <div className={pm['error-msg']}>{errMsg}</div>}
                {gcash}
                {paymaya}
                {cc}
               {!pay &&
               <div className={pm["payment-selection__header"]}>
               {PAYMENT_SELECTION.map(val=>{
                       return(
                           <div key={val.src} data-pay={val.mode} 
                           onClick={selectedPaymentMethod} className={pm["payment-selection__item"]}>
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


