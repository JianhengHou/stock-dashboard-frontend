import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { fetchUserAttributes } from '@aws-amplify/auth';
import { useStripeStatus } from './StripeStatusContext';
import {setSessionVariableWithExpiration, getSessionVariableWithExpiration} from './sessionOperation.tsx'



const withAuth = (WrappedComponent) => {
    return (props) => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isExemptUser, setIsExemptUser] = useState(false);
        const [stripeActiveStatus, setActiveStripeStatus] = useState(false);
//          const { stripeCustomerId, setStripeCustomerId,
//           preferredName, setPreferredName,
//           email, setEmail,
//           planName, setPlanName,
//           status, setStatus,
//           startDate, setStartDate,
//           endDate, setEndDate } = useStripeStatus(); // Use the context
        const [stripeCustomerId, setStripeCustomerId] = useState(null)
        console.log("initially, stripeCustomerId, status is", stripeCustomerId, status)
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const attributes = await fetchUserAttributes();
                    const currentTime = new Date().getTime();
                    const cognito_data = getSessionVariableWithExpiration('session_cognito_status')
                    const expirationTime = new Date().getTime() + 60 * 1000 * 30; // Calculate expiration timestamp (30mins)
                    console.log('current_time: ', currentTime, 'saved_time: ', cognito_data.expiration)

                    console.log("auth cognito data", cognito_data)
                    const record = {
                                     stripeCustomerId:attributes['custom:stripe_customer_id'],
                                     preferredName: attributes['preferred_username'],
                                     cognifyEmail:attributes['email'],
                                     expiration: cognito_data?cognito_data.expiration:expirationTime
                                    }
                    setSessionVariableWithExpiration('session_cognito_status', record);
                    console.log("reset session cognito data", record)
//                     setStripeCustomerId(attributes['custom:stripe_customer_id']);
//                     setPreferredName(attributes['preferred_username']);
//                     setEmail(attributes['email']);
                    setStripeCustomerId(attributes['custom:stripe_customer_id'])
                    if (attributes['custom:exempt'] === 'Y') {setIsExemptUser(true)}

                    setIsAuthenticated(true);
                    console.log("attribute received:", attributes)
                } catch (error) {
                    console.error("Cognito Account Authentication Error:", error)
                    navigate('/auth/signin');
                }
            };
            checkAuth();
        }, [history]);

        useEffect(() => {
            const checkStripe = async () => {

               console.log("with auth stripeCustomerId", stripeCustomerId)
                if (stripeCustomerId && !isExemptUser) {
                console.log("Secondly, status is", status)
                    // Retrieving the variable
                    const userSession = getSessionVariableWithExpiration('session_stripe_status');
                    console.log("auth stripe session info", userSession)
                    if (userSession) {
                       const status = userSession.status
                       console.log("auth stripe status", status)
                      if (status === 'Active') {
                        setActiveStripeStatus(true)
                        }
                        else {
                            console.log("current stripe status:", status)
                            navigate('/settings')
                        }
                    } else {
                        console.log("current stripe status:", status)
                        navigate('/auth/signin');
                    }
//                     if (status === 'Active') {
//                         setActiveStripeStatus(true)
//                     }
//                     else {
//                         console.log("current stripe status:", status)
//                         navigate('/settings')
//                     }
                }
            };
            checkStripe()
        }, [stripeCustomerId]);


        return isAuthenticated & (isExemptUser | stripeActiveStatus) ? <WrappedComponent {...props} /> : null;
    };
};

export default withAuth;
