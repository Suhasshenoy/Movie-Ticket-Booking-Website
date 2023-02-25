import React from 'react';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { isAuthenticated } from '../auth/helper';

import { paymentStripe } from './helper/coreapicalls';




const   StripeCheck = ({
    selectedSeatIds,
    setPaymentMade,
    show,
    
}) => {

 
let user = isAuthenticated().user;
let signinToken = isAuthenticated().token;

 const amount = selectedSeatIds.length * show.cost;

 const makePayment = (token) => {
   paymentStripe(selectedSeatIds,token,user.user_id,signinToken,show.show_id)
   .then(response => {
    setPaymentMade(true);

   })
 }

 const showStripeButton = () => {
    return isAuthenticated() ? (
        <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token = {makePayment}
            amount = {amount*100}
            name = "Book Tickets"
            currency='INR'
            // shippingAddress
            // billingAddress
        >
        <button className="btn btn-warning mt-3">
           Make Payment
        </button>
        </StripeCheckout>
    ): (
        <Link to="/signin">
            <button className="btn btn-warning">Signin</button>
        </Link>
    )
 }

  return (
    <div>
       

        {showStripeButton()}
    </div>
  )
}
export default  StripeCheck;

