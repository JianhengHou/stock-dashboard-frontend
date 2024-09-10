// StripeStatusContext.tsx
import { fetchUserAttributes, getCurrentUser } from '@aws-amplify/auth';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface StripeStatusContextType {
  stripeCustomerId: string | null;
  setStripeCustomerId: React.Dispatch<React.SetStateAction<string | null>>;
  preferredName: string | null;
  setPreferredName: React.Dispatch<React.SetStateAction<string | null>>;
  email: string | null;
  setEmail: React.Dispatch<React.SetStateAction<string | null>>;
  planName: string | null;
  setPlanName: React.Dispatch<React.SetStateAction<string | null>>;
  status: string | null;
  setStatus: React.Dispatch<React.SetStateAction<string | null>>;
  startDate: string | null;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  endDate: string | null;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
}


// Function to get a variable from session storage and check if it's expired
const getSessionVariableWithExpiration = (key: string) => {
  const storedData = sessionStorage.getItem(key);
  if (storedData) {
    const data = storedData;
    const currentTime = new Date().getTime();

    if (currentTime < data.expiration) {
      return data; // Return the value if it hasn't expired
    } else {
      sessionStorage.removeItem(key); // Remove the item if it has expired
    }
  }
  return null; // Return null if the item is expired or doesn't exist
};

const StripeStatusContext = createContext<StripeStatusContextType | undefined>(undefined);

export const StripeStatusProvider = ({ children }: { children: ReactNode }) => {
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [preferredName, setPreferredName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [planName, setPlanName] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const setSessionVariableWithExpiration = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
  const fetchUserInfo = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
          console.log("received the current user")
          const attributes = await fetchUserAttributes();
          setStripeCustomerId(attributes['custom:stripe_customer_id']);
          setPreferredName(attributes['preferred_username']);
          setEmail(attributes['email']);
          console.log("========== login fetch user info========")
          const expirationTime = new Date().getTime() + 60 * 1000 * 30; // Calculate expiration timestamp (30mins)
          const record = {
                'stripeCustomerId':attributes['custom:stripe_customer_id'],
                'preferredName': attributes['preferred_username'],
                'email': attributes['email'],
                'expiration': expirationTime
                }

//           console.log('stripeStatusContext cognify data to save', record)
          await setSessionVariableWithExpiration('session_cognito_status', record);
//           console.log("stripeStatusContext cognify data saved: ", getSessionVariableWithExpiration('session_cognify_status'))
//           console.log("stripeCustomerId: ", stripeCustomerId)

//           console.log("variable assigned", attributes)
      } else {
        console.error('User is not authenticated');
        }
    } catch (error) {
      console.error('Error fetching user attributes:', error);
    }
  };


  const reFetchUserInfo = async () => {
    setLoading(true); // Set loading to true before re-fetching
    await fetchUserInfo();
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserStripe = async () => {
      console.log("in context, stripeCustomerId is:", stripeCustomerId)
      if (stripeCustomerId) {
        try {
          const response = await fetch('https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/stripe-customer-retrieval', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stripe_customer_id: stripeCustomerId }),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setPlanName(data.plan);
          setStatus(data.account_status);
          setStartDate(data.start_date);
          setEndDate(data.end_date);
          console.log("context:", data)

         console.log("========== login fetch stripe info========")
        const expirationTime = new Date().getTime() + 60 * 1000 * 30; // Calculate expiration timestamp (30mins)
        const record = {
        'planName':data.plan,
        'status': data.account_status,
        'startDate': data.start_date,
        'endDate': data.end_date,
        'expiration': expirationTime
        }
        console.log('stripeStatusContext stripe data to save', record)
        await setSessionVariableWithExpiration('session_stripe_status', record);
        console.log("stripeStatusContext stripe data saved: ", getSessionVariableWithExpiration('session_stripe_status'))
        } catch (error) {
          console.error('Error fetching user Stripe Info:', error);
        } finally {
          setLoading(false);
        }
      }
    };

  const reFetchUserStripe = async () => {
        await fetchUserStripe();

  };

  useEffect(() => {
    fetchUserStripe();
  }, [stripeCustomerId]);

  return (
    <StripeStatusContext.Provider value={{ stripeCustomerId, setStripeCustomerId, preferredName, setPreferredName, email, setEmail, planName, setPlanName, status, setStatus, startDate, setStartDate, endDate, setEndDate, loading, setLoading, reFetchUserInfo, reFetchUserStripe}}>
      {children}
    </StripeStatusContext.Provider>
  );
};

export const useStripeStatus = (): StripeStatusContextType => {
  const context = useContext(StripeStatusContext);
  if (context === undefined) {
    throw new Error('useStripeStatus must be used within a StripeStatusProvider');
  }
  return context;
};
