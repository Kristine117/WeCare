import React from "react";
import Button from "../../Button/Button";
import { BiArrowBack } from "react-icons/bi";
import gh from "./Gcash.module.css";
import axios from "axios";

const Gcash = ({handleBackFunc})=>{

    // async function attachGcashPaymentMethod(paymentIntentId, phoneNumber) {
    //     try {
    //       const response = await axios.post(
    //         'https://api.paymongo.com/v1/payment_methods',
    //         {
    //           data: {
    //             attributes: {
    //               type: "gcash",
    //               details: {
    //                 phone: phoneNumber,  // GCash phone number to charge
    //               },
    //             },
    //           },
    //         },
    //         {
    //           headers: {
    //             Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`,
    //             'Content-Type': 'application/json',
    //           }
    //         }
    //       );
          
    //       const paymentMethodId = response.data.data.id;
    //       console.log('Payment Method Attached:', paymentMethodId);
      
    //       // Now confirm the payment using this payment method
    //       await confirmPaymentIntent(paymentIntentId, paymentMethodId);
    //     } catch (error) {
    //       console.error('Error attaching payment method:', error.response ? error.response.data : error.message);
    //     }
    //   }
    return (
        <React.Fragment>
           <header className={gh["header"]}> 
                <BiArrowBack className={gh["back"]} onClick={handleBackFunc}/> 
                <img src="./gcash.png" className={gh["img"]}/>      
            </header>     
            <form className={gh["container"]}>   
                <input name="phone-number" type="number" className={gh["phone-no"]}/>
                <Button type="button">Pay</Button>
            </form>
        </React.Fragment>
    )
}
export default Gcash;