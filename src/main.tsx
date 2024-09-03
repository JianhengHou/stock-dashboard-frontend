import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';  // Change this line to use named import
import awsconfig from './aws-exports';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { StripeStatusProvider } from './components/StripeStatusContext'; // Adjust the import path

// Configure Amplify before rendering the app
Amplify.configure(awsconfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
