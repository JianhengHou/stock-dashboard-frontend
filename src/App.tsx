// src/App.tsx

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClientProvider, queryClient } from './queryClient'; // Import from queryClient.ts
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import HeatMap from './pages/HeatMap';
import Dashboard from './pages/Dashboard';
import Strategy from './pages/Strategy';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import UnderMaintenance from './pages/Authentication/UnderMaintenance';
import ResetPassword from './pages/Authentication/ResetPassword';
import ComingSoon from './pages/ComingSoon';
import Invoice from './pages/Invoice';
import PricingTables from './pages/PricingTables';
import Home from './pages/Home';
import Payment from './pages/Payment';
import TutorialCapitalFlowHistory from './components/HomeComponents/TutorialCapitalFlowHistory';
import TutorialCapitalHeatMap from './components/HomeComponents/TutorialCapitalHeatMap';
import TutorialCapitalStrategy from './components/HomeComponents/TutorialCapitalStrategy';
import { Authenticator } from '@aws-amplify/ui-react';


import React, { useCallback} from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  Navigate
} from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe("pk_test_51PjEmO07rXC94v6g6LgVQRZ8wdPZSifP3LqPMjPRTSAO3bqrkBnUFfHeZd8wz6kmIsykkUWKwefs00hw4IGF1AMn00vnoR0wRR");

const CheckoutForm = () => {
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Home | AlphaHood" />
              <Home />
            </>
          }
        />
        <Route
          path="/TutorialCapitalFlowHistory"
          element={
            <>
              <PageTitle title="Tutorial: Capital Flow History | AlphaHood" />
              <TutorialCapitalFlowHistory />
            </>
          }
        />
        <Route
          path="/TutorialCapitalHeatMap"
          element={
            <>
              <PageTitle title="Tutorial: Capital Flow HeatMap | AlphaHood" />
              <TutorialCapitalHeatMap />
            </>
          }
        />
        <Route
          path="/TutorialCapitalStrategy"
          element={
            <>
              <PageTitle title="Tutorial: Stock Strategy | AlphaHood" />
              <TutorialCapitalStrategy />
            </>
          }
        />
        <Route
         path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | AlphaHood" />
              <Dashboard />
            </>
          }

        />

        <Route
         path="/heatmap"
          element={
            <>
              <PageTitle title="Heatmap | AlphaHood" />
              <HeatMap />
            </>
          }
        />
        <Route
         path="/strategy"
          element={
            <>
              <PageTitle title="Strategy | AlphaHood" />
              <Strategy />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | AlphaHood" />
              <Settings />
            </>
          }
        />
        <Route
          path="pricing-tables"
          element={
            <>
              <PageTitle title="Pricing Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <PricingTables />
            </>
          }
        />
        <Route
          path="coming-soon"
          element={
            <>
              <PageTitle title="Coming Soon | AlphaHood" />
              <ComingSoon />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | AlphaHood" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | AlphaHood" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | AlphaHood" />
              <SignUp />
            </>
          }
        />
      <Route
          path="/auth/reset-password"
          element={
            <>
              <PageTitle title="Reset Password | AlphaHood" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/invoice"
          element={
            <>
              <PageTitle title="Invoice | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Invoice />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <PageTitle title="Payment | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Payment />
            </>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
