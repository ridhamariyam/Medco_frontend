import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import ApiService from './Api';

function CheckoutForm() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // Handle real-time validation errors from the CardElement.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: card,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Call your API service to save Stripe information
      ApiService.saveStripeInfo({
        email: email,
        payment_method_id: paymentMethod.id,
      })
        .then((response) => {
          console.log(response.data);
          // Handle success, e.g., show a success message to the user
        })
        .catch((error) => {
          console.log(error);
          // Handle error, e.g., show an error message to the user
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          className="form-input"
          id="email"
          name="name"
          type="email"
          placeholder="jenny.rosen@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit Payment
      </button>
    </form>
  );
}

export default CheckoutForm;
