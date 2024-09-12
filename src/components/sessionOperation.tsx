import {fetchUserAttributes } from '@aws-amplify/auth';

export const setSessionVariableWithExpiration = (key: string, value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionVariableWithExpiration = (key: string) => {
    const storedData = sessionStorage.getItem(key);
    if (storedData) {
        const data = JSON.parse(storedData);
        const currentTime = new Date().getTime();

        if (currentTime < data.expiration) {
            return data; // Return the value if it hasn't expired
        } else {
            sessionStorage.removeItem(key); // Remove the item if it has expired
        }
    }
    return null; // Return null if the item is expired or doesn't exist
};

// Function to fetch user attributes and store them in session storage with expiration
export async function fetchAndStoreUserData() {
    try {
        // Fetch user attributes
        const attributes = await fetchUserAttributes();
        // Calculate expiration timestamp (30 minutes from now)
        const expirationTime = new Date().getTime() + 60 * 1000 * 180;
        // Prepare the Cognito data record
        const cognitoRecord = {
            stripeCustomerId: attributes['custom:stripe_customer_id'],
            preferredName: attributes['preferred_username'],
            cognifyEmail: attributes['email'],
            expiration: expirationTime
        };

        // Save the Cognito data to session storage
        await setSessionVariableWithExpiration('session_cognito_status', cognitoRecord);
//         console.log("stripeStatusContext cognify data saved: ", getSessionVariableWithExpiration('session_cognito_status'));
        if (attributes['email_verified'] && attributes['custom:exempt'] === 'Y') {return;}
        // Check if Stripe customer ID exists in attributes
        if (attributes['custom:stripe_customer_id']) {
            // Fetch Stripe customer data
            const response = await fetch('https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/stripe-customer-retrieval', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stripe_customer_id: attributes['custom:stripe_customer_id'] }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Prepare the Stripe data record
            const stripeRecord = {
                planName: data.plan || null,
                status: data.account_status || null,
                startDate: data.start_date || null,
                endDate: data.end_date || null,
                expiration: expirationTime
            };

//             console.log('stripeStatusContext stripe data to save', stripeRecord);

            // Save the Stripe data to session storage
            await setSessionVariableWithExpiration('session_stripe_status', stripeRecord);
//             console.log("stripeStatusContext stripe data saved: ", getSessionVariableWithExpiration('session_stripe_status'));
        }
    } catch (error) {
        console.error('Error fetching user or Stripe info:', error);
    }
}