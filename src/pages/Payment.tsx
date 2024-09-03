// // import React, { useEffect, useState } from 'react';
// // import { loadStripe } from '@stripe/stripe-js';
// // import { Elements } from '@stripe/react-stripe-js';
// // import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
// // import '../css/payment.css';
// //
// // const stripePromise = loadStripe('your-publishable-key-here');
// //
// // const CheckoutForm: React.FC = () => {
// //   const stripe = useStripe();
// //   const elements = useElements();
// //
// //   const handleSubmit = async (event: React.FormEvent) => {
// //     event.preventDefault();
// //     if (!stripe || !elements) return;
// //
// //     const result = await stripe.confirmPayment({
// //       elements,
// //       confirmParams: {
// //         return_url: 'https://your-website.com/checkout-success',
// //       },
// //     });
// //
// //     if (result.error) {
// //       console.error(result.error.message);
// //     }
// //   };
// //
// //   return (
// //     <form onSubmit={handleSubmit} className="checkout-form">
// //       <PaymentElement />
// //       <button type="submit" disabled={!stripe} className="submit-button">
// //         Pay
// //       </button>
// //     </form>
// //   );
// // };
// //
// // const Payment: React.FC = () => {
// //   const [clientSecret, setClientSecret] = useState<string | null>(null);
// //
// //   useEffect(() => {
// //     // Fetch the clientSecret from your backend
// //     fetch('/create-payment-intent', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ /* any necessary parameters */ })
// //     })
// //       .then((res) => res.json())
// //       .then((data) => setClientSecret(data.clientSecret));
// //   }, []);
// //
// //   const options = {
// //     clientSecret: clientSecret as string,
// //   };
// //
// //   return (
// //     <div className="payment">
// //       <div className="payment-preview">
// //         <h3>Pay Alpha Hood</h3>
// //         <div className="amount">$39.99</div>
// //         <div className="plan-details">
// //           <div className="plan-item">
// //             <span>Monthly Plan</span>
// //             <span>$39.99</span>
// //           </div>
// //           <div className="plan-item">
// //             <span>Subtotal</span>
// //             <span>$39.99</span>
// //           </div>
// //           <div className="promotion-code">
// //             <a href="#">Add promotion code</a>
// //           </div>
// //           <div className="total-due">
// //             <strong>Total due</strong>
// //             <strong>$39.99</strong>
// //           </div>
// //         </div>
// //       </div>
// //       <div className="payment-section">
// //         {clientSecret && (
// //           <Elements stripe={stripePromise} options={options}>
// //             <CheckoutForm />
// //           </Elements>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };
// //
// // export default Payment;
// // import React, { useState } from 'react';
// // import '../css/payment.css';; // Import CSS for styling
// //
// // const Payment: React.FC = () => {
// //   const [showPromotionCode, setShowPromotionCode] = useState<boolean>(false);
// //
// //   const handlePromotionClick = () => {
// //     setShowPromotionCode(!showPromotionCode);
// //   };
// //
// //   return (
// //     <div className="payment-page">
// //       <div className="payment-details">
// //         <h1 className="company-name">Company Name</h1>
// //         <h2 className="monthly-plan-title">Monthly Plan Title</h2>
// //         <p className="free-trial">7 Days Free</p>
// //         <p className="subline">($39 per month after the trial ends)</p>
// //         <div className="invoice-item">
// //           <p>Monthly Plan: <strong>$39/month</strong></p>
// //         </div>
// //         <div className="account-initiation-fee">
// //           <p>Account Initiation Fee</p>
// //         </div>
// //         <div className="subtotal">
// //           <p>Subtotal</p>
// //         </div>
// //         <div className="promotion-code">
// //           <button onClick={handlePromotionClick}>
// //             {showPromotionCode ? 'Hide Promotion Code' : 'Add Promotion Code'}
// //           </button>
// //           {showPromotionCode && (
// //             <input type="text" placeholder="Enter promotion code" />
// //           )}
// //         </div>
// //         <div className="tax">
// //           <p>Tax</p>
// //           <p className="tax-notice">Enter an address to calculate.</p>
// //         </div>
// //         <div className="total-due-today">
// //           <p>Total Due Today</p>
// //         </div>
// //       </div>
// //       <div className="payment-form">
// //         <h2>Payment Details</h2>
// //         <form>
// //           <input type="text" placeholder="Card Number" />
// //           <input type="text" placeholder="Expiry Date" />
// //           <input type="text" placeholder="CVV" />
// //           <input type="text" placeholder="Billing Address" />
// //           <button type="submit">Submit Payment</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };
// //
// // export default Payment;
//
import React, { useState } from 'react';
// import './App.css';

const Payment: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const signupLookupKey = formData.get('signup_lookup_key') as string;
    const subscriptionLookupKey = formData.get('subscription_lookup_key') as string;

    try {
      const response = await fetch('https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev//create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signup_lookup_key: signupLookupKey,
                               subscription_lookup_key: subscriptionLookupKey
                             }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      window.location.href = data.checkout_url;  // Redirect to Stripe Checkout session URL
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to initiate checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="product">
        <Logo />
        <div className="description">
          <h3>Starter plan</h3>
          <h5>$20.00 / month</h5>
        </div>
      </div>
      <form onSubmit={handleCheckout}>
          <input type="hidden" name="signup_lookup_key" value="initiation_fee" />
          <input type="hidden" name="subscription_lookup_key" value="recurring_monthly_plan" />
          <button id="checkout-and-portal-button" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Checkout'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
    </section>
  );
};

const Logo: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14px"
    height="16px"
    viewBox="0 0 14 16"
    version="1.1"
  >
    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>
  </svg>
);

export default Payment;

//
// import React, { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
//
// // Load Stripe with your public key
// const stripePromise = loadStripe('pk_test_51PjEmO07rXC94v6g6LgVQRZ8wdPZSifP3LqPMjPRTSAO3bqrkBnUFfHeZd8wz6kmIsykkUWKwefs00hw4IGF1AMn00vnoR0wRR');
//
// const PaymentForm: React.FC = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//
//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       return;
//     }
//
//     setIsProcessing(true);
//
//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       setError('Card Element not found.');
//       setIsProcessing(false);
//       return;
//     }
//
//     const { paymentMethod, error } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });
//
//     if (error) {
//       setError(error.message || 'An unexpected error occurred.');
//       setIsProcessing(false);
//     } else {
//       try {
//           setError(null);
//           const response = await fetch('https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/create-subscription', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               paymentMethodId: paymentMethod?.id,
//               signup_lookup_key: 'initiation_fee',
//               subscription_lookup_key: 'recurring_monthly_plan'
//             }),
//           });
//           console.log(response)
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//       } catch (error) {
//                       setIsProcessing(false);
//                       console.error('Error:', error);
//                       setError('Failed to initiate checkout. Please try again.');
//       } finally {
//           setIsProcessing(false);
//       }
//     }
//   };
//
//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <CardElement id="card-element" />
//       <button type="submit" disabled={!stripe || isProcessing}>
//         {isProcessing ? 'Processing...' : 'Submit Payment'}
//       </button>
//       {error && <div>{error}</div>}
//     </form>
//   );
// };
//
// // Wrap the PaymentForm component with Elements
// const Payment: React.FC = () => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm />
//   </Elements>
// );
//
// export default Payment;

