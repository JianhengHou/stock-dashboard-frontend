import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckMark from '../CheckMarks/CheckMark';
import CloseMark from '../CloseMarks/CloseMark';

const PricingTableTwo: React.FC = () => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string | null }>({});

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>, planType: string) => {
    event.preventDefault();
    setLoading(prev => ({ ...prev, [planType]: true }));
    setError(prev => ({ ...prev, [planType]: null }));

    const formData = new FormData(event.currentTarget);
    const signupLookupKey = formData.get('signup_lookup_key') as string;
    const subscriptionLookupKey = formData.get('subscription_lookup_key') as string;
    const monthlyPlanLookupKey = formData.get('monthly_plan_lookup_key') as string;
    const yearlyPlanLookupKey = formData.get('yearly_plan_lookup_key') as string;
    // Initialize an empty object to store the key-value pairs
    const lookupKeys: { [key: string]: string } = {};

    // Add keys to the object only if they are not null
    if (signupLookupKey) {
      lookupKeys['signup_lookup_key'] = signupLookupKey;
    }
    if (subscriptionLookupKey) {
      lookupKeys['subscription_lookup_key'] = subscriptionLookupKey;
    }
    if (monthlyPlanLookupKey) {
      lookupKeys['monthly_plan_lookup_key'] = monthlyPlanLookupKey;
    }
    if (yearlyPlanLookupKey) {
      lookupKeys['yearly_plan_lookup_key'] = yearlyPlanLookupKey;
    }
    try {
      const response = await fetch('https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lookupKeys),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      window.location.href = data.checkout_url; // Redirect to Stripe Checkout session URL
    } catch (error) {
      console.error('Error:', error);
      setError(prev => ({ ...prev, [planType]: 'Failed to initiate checkout. Please try again.' }));
    } finally {
      setLoading(prev => ({ ...prev, [planType]: false }));
    }
  };
  return (
    <div className="relative z-10 overflow-hidden rounded-sm border  p-11 shadow-default border-strokedark bg-boxdark">
      <div className="w-full overflow-x-auto">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="w-1/4 min-w-[200px] px-5"></th>
              <th className="w-1/4 min-w-[200px] px-5">
                <form onSubmit={(event) => handleCheckout(event, 'monthly')}>
                    <input type="hidden" name="signup_lookup_key" value="initiation_fee" />
                    <input type="hidden" name="monthly_plan_lookup_key" value="monthly_plan" />
                    <div className="mb-10 text-left">
                      <span className="mb-3.5 block text-xl font-bold text-black text-white">
                        Monthly Plan
                      </span>
                      <h4 className="mb-4">
                        <span className="text-[28px] font-bold text-black text-white lg:text-[32px]">
                          $39.99
                        </span>
                        <span className="font-medium ml-2">for One Month</span>
                      </h4>
                      <p className="mb-6 text-base font-medium">
                        Best suited for one-time or returning users
                      </p>
                      <button
                      type="submit"
                      className="relative block w-full rounded-md bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                      disabled={loading['monthly']}
                    >
                      {loading['monthly'] ? (
                        <>
                          Processing...
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 1 0-8 8V2zm0 0a10 10 0 0 0-10 10h2a8 8 0 1 1 8-8V2z"/></svg>
                          </span>
                        </>
                      ) : (
                        'Buy Now'
                      )}
                    </button>
                      {error['monthly'] && <p className="text-red-500 mt-2">{error['monthly']}</p>}
                    </div>
                </form>
              </th>
              <th className="w-1/4 min-w-[200px] px-5">
                <form onSubmit={(event) => handleCheckout(event, 'trial')}>
                    <input type="hidden" name="signup_lookup_key" value="initiation_fee" />
                    <input type="hidden" name="subscription_lookup_key" value="recurring_monthly_plan" />
                    <div className="mb-10 text-left">
                      <span className="mb-3.5 block text-xl font-bold text-white">
                        7-day Free Trial
                      </span>
                      <h4 className="mb-4">
                      <span className="text-[28px] font-bold text-white lg:text-[32px]">
                         $0.00
                      </span>
                      <span className="font-medium ml-2" >then $39.99 Per Month</span>
                      </h4>
                      <p className="mb-6 font-medium ">
                        Best suited for new users or professionals
                      </p>
                      <button
                      type="submit"
                      className="relative block w-full rounded-md bg-[#13C296] p-3 text-center font-medium bg-secondary text-white transition hover:bg-opacity-90"
                      disabled={loading['trial']}
                    >
                      {loading['trial'] ? (
                        <>
                          Processing...
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 1 0-8 8V2zm0 0a10 10 0 0 0-10 10h2a8 8 0 1 1 8-8V2z"/></svg>
                          </span>
                        </>
                      ) : (
                        'Try Now'
                      )}
                    </button>
                    {error['trial'] && <p className="text-red-500 mt-2">{error['trial']}</p>}
                    </div>
                </form>
              </th>
              <th className="w-1/4 min-w-[200px] px-5">
                <form onSubmit={(event) => handleCheckout(event, 'yearly')}>
                    <input type="hidden" name="signup_lookup_key" value="initiation_fee" />
                    <input type="hidden" name="yearly_plan_lookup_key" value="yearly_plan" />
                    <div className="mb-10 text-left">
                      <span className="mb-3.5 block text-xl font-bold text-black text-white">
                        Yearly Plan
                      </span>
                      <h4 className="mb-4">
                        <span className="text-[28px] font-bold text-black text-white lg:text-[32px]">
                          $31.99
                        </span>
                        <span className="font-medium ml-2">Per Month x 12 </span>
                      </h4>
                      <p className="mb-6 font-medium">
                        Best suited for long-termism users
                      </p>
                      <button
                      type="submit"
                      className="relative block w-full rounded-md bg-primary p-3 text-center font-medium text-white transition hover:bg-opacity-90"
                      disabled={loading['yearly']}
                    >
                      {loading['yearly'] ? (
                        <>
                          Processing...
                          <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 1 0-8 8V2zm0 0a10 10 0 0 0-10 10h2a8 8 0 1 1 8-8V2z"/></svg>
                          </span>
                        </>
                      ) : (
                        'Buy Now'
                      )}
                    </button>
                    {error['yearly'] && <p className="text-red-500 mt-2">{error['yearly']}</p>}
                    </div>
                </form>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-t border-stroke py-5 px-7 border-strokedark">
                <h5 className="font-medium text-black text-white">
                  Key Features
                </h5>
              </td>
              <td className="border-t border-stroke py-5 px-7 border-strokedark">
                <h5 className="text-center font-medium text-black text-white">
                  Features Limits
                </h5>
              </td>
              <td className="border-t border-stroke py-5 px-7 border-strokedark">
                <h5 className="text-center font-medium text-black text-white">
                  Features Limits
                </h5>
              </td>
              <td className="border-t border-stroke py-5 px-7 border-strokedark">
                <h5 className="text-center font-medium text-black text-white">
                  Features Limits
                </h5>
              </td>
            </tr>
            <tr>
              <td className="border-t border-stroke py-5 px-7 border-strokedark">
                <p className="font-medium">Seats</p>
              </td>
              <td className="border-t border-stroke py-5 px-7 border-strokedark">
                <p className="text-center font-medium">1 Developer</p>
              </td>
              <td className="border-t border-stroke py-5 px-7 border-strokedark">
                <p className="text-center font-medium">5 Developer</p>
              </td>
              <td className="border-t border-stroke py-5 px-7 border-strokedark">
                <p className="text-center font-medium">20 Developer</p>
              </td>
            </tr>
            <tr>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="font-medium">Domains/Products</p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="text-center font-medium">5 Products</p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="text-center font-medium">5 Products</p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="text-center font-medium">5 Products</p>
              </td>
            </tr>
            <tr>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="font-medium">Email Support</p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="text-center font-medium">6 Months</p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="text-center font-medium">6 Months</p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="text-center font-medium">6 Months</p>
              </td>
            </tr>
            <tr>
              <td className="border-t py-5 px-7 border-strokedark">
                <p className="font-medium">All Pro Components</p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="flex justify-center text-center">
                  <CheckMark />
                </p>
              </td>
              <td className="border-t py-5 px-7 border-strokedark">
                <p className="flex justify-center text-center">
                  <CheckMark />
                </p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="flex justify-center text-center">
                  <CheckMark />
                </p>
              </td>
            </tr>
            <tr>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="font-medium">Design Source Files</p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="flex justify-center text-center">
                  <CloseMark />
                </p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="flex justify-center text-center">
                  <CheckMark />
                </p>
              </td>
              <td className="border-t  py-5 px-7 border-strokedark">
                <p className="flex justify-center text-center">
                  <CheckMark />
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <span className="absolute top-0 left-0 -z-1">
          <svg
            width="213"
            height="188"
            viewBox="0 0 213 188"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="75" cy="50" r="138" fill="url(#paint0_linear)" />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="75"
                y1="-88"
                x2="75"
                y2="188"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3056D3" stopOpacity="0.15" />
                <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="absolute top-30 left-11 -z-1">
          <svg
            width="50"
            height="109"
            viewBox="0 0 50 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="47.71"
              cy="107.259"
              r="1.74121"
              transform="rotate(180 47.71 107.259)"
              fill="#3056D3"
            />
            <circle
              cx="47.71"
              cy="91.9355"
              r="1.74121"
              transform="rotate(180 47.71 91.9355)"
              fill="#3056D3"
            />
            <circle
              cx="47.71"
              cy="76.6133"
              r="1.74121"
              transform="rotate(180 47.71 76.6133)"
              fill="#3056D3"
            />
            <circle
              cx="47.71"
              cy="47.0132"
              r="1.74121"
              transform="rotate(180 47.71 47.0132)"
              fill="#3056D3"
            />
            <circle
              cx="47.71"
              cy="16.7158"
              r="1.74121"
              transform="rotate(180 47.71 16.7158)"
              fill="#3056D3"
            />
            <circle
              cx="47.71"
              cy="61.6392"
              r="1.74121"
              transform="rotate(180 47.71 61.6392)"
              fill="#3056D3"
            />
            <circle
              cx="47.71"
              cy="32.0386"
              r="1.74121"
              transform="rotate(180 47.71 32.0386)"
              fill="#3056D3"
            />
            <circle
              cx="47.71"
              cy="1.74121"
              r="1.74121"
              transform="rotate(180 47.71 1.74121)"
              fill="#3056D3"
            />
            <circle
              cx="32.3877"
              cy="107.259"
              r="1.74121"
              transform="rotate(180 32.3877 107.259)"
              fill="#3056D3"
            />
            <circle
              cx="32.3877"
              cy="91.9355"
              r="1.74121"
              transform="rotate(180 32.3877 91.9355)"
              fill="#3056D3"
            />
            <circle
              cx="32.3877"
              cy="76.6133"
              r="1.74121"
              transform="rotate(180 32.3877 76.6133)"
              fill="#3056D3"
            />
            <circle
              cx="32.3877"
              cy="47.0132"
              r="1.74121"
              transform="rotate(180 32.3877 47.0132)"
              fill="#3056D3"
            />
            <circle
              cx="32.3877"
              cy="16.7158"
              r="1.74121"
              transform="rotate(180 32.3877 16.7158)"
              fill="#3056D3"
            />
            <circle
              cx="32.3877"
              cy="61.6392"
              r="1.74121"
              transform="rotate(180 32.3877 61.6392)"
              fill="#3056D3"
            />
            <circle
              cx="32.3877"
              cy="32.0386"
              r="1.74121"
              transform="rotate(180 32.3877 32.0386)"
              fill="#3056D3"
            />
            <circle
              cx="32.3877"
              cy="1.74121"
              r="1.74121"
              transform="rotate(180 32.3877 1.74121)"
              fill="#3056D3"
            />
            <circle
              cx="17.0654"
              cy="107.259"
              r="1.74121"
              transform="rotate(180 17.0654 107.259)"
              fill="#3056D3"
            />
            <circle
              cx="17.0654"
              cy="91.9355"
              r="1.74121"
              transform="rotate(180 17.0654 91.9355)"
              fill="#3056D3"
            />
            <circle
              cx="17.0654"
              cy="76.6133"
              r="1.74121"
              transform="rotate(180 17.0654 76.6133)"
              fill="#3056D3"
            />
            <circle
              cx="17.0654"
              cy="47.0132"
              r="1.74121"
              transform="rotate(180 17.0654 47.0132)"
              fill="#3056D3"
            />
            <circle
              cx="17.0654"
              cy="16.7158"
              r="1.74121"
              transform="rotate(180 17.0654 16.7158)"
              fill="#3056D3"
            />
            <circle
              cx="17.0654"
              cy="61.6392"
              r="1.74121"
              transform="rotate(180 17.0654 61.6392)"
              fill="#3056D3"
            />
            <circle
              cx="17.0654"
              cy="32.0386"
              r="1.74121"
              transform="rotate(180 17.0654 32.0386)"
              fill="#3056D3"
            />
            <circle
              cx="17.0654"
              cy="1.74121"
              r="1.74121"
              transform="rotate(180 17.0654 1.74121)"
              fill="#3056D3"
            />
            <circle
              cx="1.74121"
              cy="107.259"
              r="1.74121"
              transform="rotate(180 1.74121 107.259)"
              fill="#3056D3"
            />
            <circle
              cx="1.74121"
              cy="91.9355"
              r="1.74121"
              transform="rotate(180 1.74121 91.9355)"
              fill="#3056D3"
            />
            <circle
              cx="1.74121"
              cy="76.6133"
              r="1.74121"
              transform="rotate(180 1.74121 76.6133)"
              fill="#3056D3"
            />
            <circle
              cx="1.74121"
              cy="47.0132"
              r="1.74121"
              transform="rotate(180 1.74121 47.0132)"
              fill="#3056D3"
            />
            <circle
              cx="1.74121"
              cy="16.7158"
              r="1.74121"
              transform="rotate(180 1.74121 16.7158)"
              fill="#3056D3"
            />
            <circle
              cx="1.74121"
              cy="61.6392"
              r="1.74121"
              transform="rotate(180 1.74121 61.6392)"
              fill="#3056D3"
            />
            <circle
              cx="1.74121"
              cy="32.0386"
              r="1.74121"
              transform="rotate(180 1.74121 32.0386)"
              fill="#3056D3"
            />
            <circle
              cx="1.74121"
              cy="1.74121"
              r="1.74121"
              transform="rotate(180 1.74121 1.74121)"
              fill="#3056D3"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default PricingTableTwo;
