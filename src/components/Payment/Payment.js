import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import pm from "./Payment.module.css";
import Button from "../Button/Button";
import Gcash from "../PaymentTypes/Gcash/Gcash";
import Paymaya from "../PaymentTypes/Paymaya/Paymaya";
import CreditCard from "../PaymentTypes/CreditCard/CreditCard";
import axios from "axios";
import UserContext from "../../UserContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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

const Payment = ({openModal,amount,updateFuncHandler,appId,getDataHandler})=>{

    const {user}=useContext(UserContext);
    const PAYMONGO_SECRET_KEY = "sk_test_C62auzHAPXNnEp88vSASfGYC";

    const [pay,setPay] = useState(null);
    const [payMethod,setPayMethod] = useState(null);

    const [errMsg,setErrMsg]= useState("");
    const navigate = useNavigate();

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
                    amount: +newAmount,  
                    payment_method_allowed: ["gcash","card","paymaya"],
                    currency: "PHP",
                    description: "Transfer via Payment Method",
                    statement_descriptor: "We Care",
                   
                }
                }
            },
            {
                headers: {
                Authorization: `Basic ${btoa(`${PAYMONGO_SECRET_KEY}`)}`,
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

      async function confirmPaymentIntent(paymentIntentId, paymentMethodId,paymentMethod) {
        try {
          const response = await axios.post(
            `https://api.paymongo.com/v1/payment_intents/${paymentIntentId}/attach`,
            {
              data: {
                attributes: {
                  payment_method: paymentMethodId,
                   return_url: "http://localhost:3000/dashboard-main"
                }
              }
            },
            {
              headers: {
                Authorization: `Basic ${btoa(`${PAYMONGO_SECRET_KEY}`)}`,
                'Content-Type': 'application/json',
              }
            }
          );
          
          console.log('Payment Confirmed:', response.data.data.attributes);
          const processedPaymentId = response.data.data.id;


          const composedUrl = `payment/process-payment`;
          const method = "POST";
          const {isSuccess,message}= await updateFuncHandler(method,{
            paymentMethod:paymentMethod,
            appointmentId:appId,
            processedPaymentId:processedPaymentId
          },composedUrl)

          Swal.fire({
            title: isSuccess ? "Successfully processed payment": "Something went wrong",
            icon: isSuccess ? "successful":"error",
            text: message,
          });

          getDataHandler();
          openModal();
        } catch (error) {
          console.error('Error confirming payment:', error.response ? error.response.data : error.message);
        }
      }
      
      
  
    const gcash = pay?.mode === "GCash" && 
    <Gcash handleBackFunc={handleBackFuncHandler} confirmPaymentFunc={confirmPaymentIntent}
    createPaymentIntentFunc={createPaymentIntent} userId={user.userId} updateFuncHandler={updateFuncHandler}/>;
    
    const paymaya = pay?.mode === "Paymaya" && 
    <Paymaya handleBackFunc={handleBackFuncHandler} confirmPaymentFunc={confirmPaymentIntent}
    createPaymentIntentFunc={createPaymentIntent} userId={user.userId} updateFuncHandler={updateFuncHandler}/>;
    
    const cc = pay?.mode === "Credit Card" && 
    <CreditCard handleBackFunc={handleBackFuncHandler} confirmPaymentFunc={confirmPaymentIntent}
    createPaymentIntentFunc={createPaymentIntent} userId={user.userId} updateFuncHandler={updateFuncHandler}/>;

    return createPortal(    
        <React.Fragment>
             <div className={pm["backdrop-modal"]} onClick={openModal}>
            
            </div>

            {errMsg && <div className={pm['error-msg']}>{errMsg}</div>}

            <div className={pm["payment-selection"]}>
                
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

              
                <div className={pm["payment-footer"]}>
                    <Button type="button" onClick={openModal} className={pm["btn"]}>Cancel</Button>
                    <Button type="button" onClick={proceedPaymentPage} className={pm["btn"]}>Proceed</Button>
                </div>
              </div>}
            </div>
        </React.Fragment>
       ,
        document.querySelector("#modal")
    )
}

export default Payment;


