import React from "react";
import cc from "./CreditCard.module.css";
import Button from "../../Button/Button";
import axios from "axios";

const PAYMONGO_SECRET_KEY = "sk_test_C62auzHAPXNnEp88vSASfGYC";

const CreditCard = ({handleBackFunc,confirmPaymentFunc,createPaymentIntentFunc})=>{

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
      
          await confirmPaymentFunc(paymentIntentId, paymentMethodId);
        } catch (error) {
          console.error('Error attaching card payment method:', error.response ? error.response.data : error.message);
        }
      }

      const cardDetails = {
        number: '4343434343434345',  // Test card number
        exp_month: 12,
        exp_year: 2026,
        cvc: '123'
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
        <form className={cc["container"]} onSubmit={processPayment}>
            <img src="./cc.png" className={cc["img"]}/>

            <div className={cc["cc-container"]}>
                <div className={cc["form-group"]}>
                    <label htmlFor="cs-name">Name</label>
                    <input name="cs-name"/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="expiration">Expiration</label>
                    <input name="expiration"/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="card-number">Card No.</label>
                    <input name="card-number" type="number"/>
                </div>

                <div className={cc["form-group"]}>
                    <label htmlFor="cyy">CYY</label>
                    <input name="cyy"/>
                </div>
            </div>
            <div className={cc["footer"]}>
                
            <Button type="button" onClick={handleBackFunc} className={cc['btn']}>Cancel</Button>
            <Button type="submit" className={cc['btn']}>Proceed</Button>
            </div>
        </form>
    )
}

export default CreditCard;