import React, { useState } from "react";
import cc from "./CreditCard.module.css";
import Button from "../../Button/Button";
import axios from "axios";

const PAYMONGO_SECRET_KEY = "sk_test_C62auzHAPXNnEp88vSASfGYC";

const CreditCard = ({handleBackFunc,confirmPaymentFunc,createPaymentIntentFunc})=>{
  const [ccName,setCCName]= useState("");
  const [expiration,setExpiration]=useState("");
  const [cardNumber,setCardNumber] = useState("");
  const [cyy,setCyy] = useState("");
  const [error,setError] = useState("");

    async function attachCardPaymentMethod(paymentIntentId, cardDetails) {
        try {
          const response = await axios.post(
            'https://api.paymongo.com/v1/payment_methods',
            {
              data: {
                attributes: {
                  type: "card",
                  details: {
                    card_number: cardDetails.number,
                    exp_month: cardDetails.exp_month,
                    exp_year: cardDetails.exp_year,
                    cvc: cardDetails.cvc,
                  },
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
          console.log('Card Payment Method Attached:', paymentMethodId);
      
          await confirmPaymentFunc(paymentIntentId, paymentMethodId,"Credit Card");
        } catch (error) {
          setError("Error with your Card Details. Kindly check for the following fields")
          console.error('Error attaching card payment method:', error.response ? error.response.data : error.message);
        }
      }

      const cardDetails = {
        number:cardNumber,  // Test card number
        exp_month: +expiration.split("/")[0],
        exp_year: +expiration.split("/")[1],
        cvc: cyy
      };

    async function processPayment(e) {
        e.preventDefault();
        try {
          // Step 1: Create the Payment Intent with all methods allowed
          const paymentIntentData = await createPaymentIntentFunc();
      
          if (paymentIntentData) {
            const paymentIntentId = paymentIntentData.data.id;
      
            attachCardPaymentMethod(paymentIntentId, cardDetails);
          }


        } catch (error) {
          console.error('Error processing payment:', error.message);
        }
      }

      
    return(
        <React.Fragment>
         {error &&  <p className={cc["error-msg"]}>{error}</p>}
          <form className={cc["container"]} onSubmit={processPayment}>
            <img src="./cc.png" className={cc["img"]}/>
            <div className={cc["cc-container"]}>
                <div className={cc["form-group"]}>
                    <label htmlFor="cs-name">Name</label>
                    <input name="cs-name" onChange={(e)=>setCCName(e.target.value)}/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="expiration">Expiration</label>
                    <input name="expiration" onChange={(e)=>setExpiration(e.target.value)}/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="card-number">Card No.</label>
                    <input name="card-number" type="number" onChange={(e)=>setCardNumber(e.target.value)}/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="cyy">CYY</label>
                    <input name="cyy" onChange={(e)=>setCyy(e.target.value)}/>
                </div>
            </div>
            <div className={cc["footer"]}>
                
            <Button type="button" onClick={handleBackFunc} className={cc['btn']}>Cancel</Button>
            <Button type="submit" className={cc['btn']}>Proceed</Button>
            </div>
        </form>
        </React.Fragment>
    )
}

export default CreditCard;