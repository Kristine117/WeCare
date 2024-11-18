import React from "react";
import Button from "../../Button/Button";
import { BiArrowBack } from "react-icons/bi";
import gh from "./Gcash.module.css";
import axios from "axios";

const PAYMONGO_SECRET_KEY = "sk_test_C62auzHAPXNnEp88vSASfGYC";

const Gcash = ({handleBackFunc,confirmPaymentFunc,createPaymentIntentFunc})=>{

    async function attachGcashPaymentMethod(paymentIntentId, phoneNumber) {
        try {
          const response = await axios.post(
            'https://api.paymongo.com/v1/payment_methods',
            {
              data: {
                attributes: {
                  type: "gcash",
                  details: {
                    phone: phoneNumber,  
                    
                  },
                  returnUrl: "http://localhost:3000/dashboard-main"
                },
              },
            },
            {
              headers: {
                Authorization: `Basic ${btoa(`${PAYMONGO_SECRET_KEY}`)}`,
                'Content-Type': 'application/json',
              }
            }
          );
          
          const paymentMethodId = response.data.data.id;

          // Now confirm the payment using this payment method
          await confirmPaymentFunc(paymentIntentId, paymentMethodId,"Gcash");
        } catch (error) {
          console.error('Error attaching payment method:', error.response ? error.response.data : error.message);
        }
      }

    async function processPayment(e) {
        e.preventDefault();

        const form = new FormData(e.target);
        const phoneNumber = await form.get("phone-number");

        try {
          // Step 1: Create the Payment Intent with all methods allowed
          const paymentIntentData = await createPaymentIntentFunc();
      
          if (paymentIntentData) {
            const paymentIntentId = paymentIntentData.data.id;
      
           attachGcashPaymentMethod(paymentIntentId,phoneNumber)
          }
        } catch (error) {
          console.error('Error processing payment:', error.message);
        }
      }
      
    return (
        <React.Fragment>
           <header className={gh["header"]}> 
                <BiArrowBack className={gh["back"]} onClick={handleBackFunc}/> 
                <img src="./gcash.png" className={gh["img"]}/>      
            </header>     
            <form className={gh["container"]} onSubmit={processPayment}>   
                <input name="phone-number" type="number" className={gh["phone-no"]}/>
                <Button type="submit" className={gh["pay-btn"]}>Pay</Button>
            </form>
        </React.Fragment>
    )
}
export default Gcash;