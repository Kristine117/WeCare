import React from "react";
import gh from "./Paymaya.module.css";
import { BiArrowBack } from "react-icons/bi";
import Button from "../../Button/Button";
import axios from "axios";

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;

const Paymaya = ({handleBackFunc,confirmPaymentFunc,createPaymentIntentFunc})=>{

    async function attachPayMayaPaymentMethod(paymentIntentId, phoneNumber) {
        try {
          const response = await axios.post(
            'https://api.paymongo.com/v1/payment_methods',
            {
              data: {
                attributes: {
                  type: "paymaya",
                  details: {
                    phone: phoneNumber,  // PayMaya phone number
                  },
                },
              },
            },
            {
              headers: {
                Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`,
                'Content-Type': 'application/json',
              }
            }
          );
      
          const paymentMethodId = response.data.data.id;
          console.log('PayMaya Payment Method Attached:', paymentMethodId);
      
          await confirmPaymentFunc(paymentIntentId, paymentMethodId);
        } catch (error) {
          console.error('Error attaching PayMaya payment method:', error.response ? error.response.data : error.message);
        }
      }
      

    async function processPayment(e) {

        e.preventDefault();

        const formData = await formData(e.target);
        const {phoneNumber} = formData.get("phone-number")
        try {
          // Step 1: Create the Payment Intent with all methods allowed
          const paymentIntentData = await createPaymentIntentFunc();
      
          if (paymentIntentData) {
            const paymentIntentId = paymentIntentData.data.id;

            await attachPayMayaPaymentMethod(paymentIntentId, phoneNumber);
          }
        } catch (error) {
          console.error('Error processing payment:', error.message);
        }
      }

      

    return (
        <React.Fragment>
           <header className={gh["header"]}> 
                <BiArrowBack className={gh["back"]} onClick={handleBackFunc}/> 
                <img src="./paymaya.png" className={gh["img"]}/>      
            </header>     
            <form className={gh["container"]} onSubmit={processPayment}>   
                <input name="phone-number" type="number" className={gh["phone-no"]}/>
                <Button type="button">Pay</Button>
            </form>
        </React.Fragment>
    )
}

export default Paymaya;