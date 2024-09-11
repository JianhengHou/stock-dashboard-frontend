import userThree from '../images/user/user-03.png';
import DefaultLayout from '../layout/DefaultLayout';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchUserAttributes, getCurrentUser } from '@aws-amplify/auth';
import { useStripeStatus } from '../components/StripeStatusContext';
import CoverOne from '../images/cover/cover-01.png';
import {getSessionVariableWithExpiration} from '../components/sessionOperation.tsx'

const Settings = () => {
  const navigate = useNavigate();
  const [loadingManageSubscription, setLoadingManageSubscription] = useState<boolean>(false);
  const cognito_data = getSessionVariableWithExpiration('session_cognito_status')
  const stripe_data = getSessionVariableWithExpiration('session_stripe_status')

  useEffect(() => {
    if (cognito_data === null) {
      navigate('/auth/signin'); // Redirect to login if cognito_data is null
    }
  }, [cognito_data]);
  if (cognito_data === null) {
    return null; // Or a loading spinner, or an appropriate message
  }

  const {stripeCustomerId, preferredName, cognifyEmail} = cognito_data
  const { planName = "", status = "", startDate = "", endDate = "" } = stripe_data || {};

  const defaultLang = 'en';
  const language = localStorage.getItem('language') || defaultLang;

  const handleManageSubscriptionClick = async () => {
    setLoadingManageSubscription(true)

    try {
      const response = await fetch('https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stripe_customer_id:  stripeCustomerId}), // Replace with actual session_id
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      window.location.href = data.billing_url; // Redirect to Stripe Checkout session URL
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
  <DefaultLayout>
    <div className="mx-auto max-w-280 pt-40">
      <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3 flex flex-col">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:white dark:bg-boxdark flex flex-col h-full">
            <div className="border-b border-stroke py-4 px-7 dark:white">
              <h3 className="font-medium text-black dark:text-white">
              {language === 'en'
                        ? 'Personal Information'
                        : '个人信息'
              }
              </h3>
            </div>
            <div className="flex flex-col flex-grow p-7">
              <form action="#" className="flex flex-col flex-grow">
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="Username"
                  >
                    {language === 'en'
                        ? 'Preferred Name'
                        : '用户昵称'
                    }
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill=""
                              />
                            </g>
                          </svg>
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:white dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="preferred_username"
                      id="Username"
                      placeholder={preferredName}
                      defaultValue={preferredName}
                      readOnly

                    />
                  </div>
                </div>

                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="emailAddress"
                  >
                    {language === 'en'
                        ? 'Email Address'
                        : '注册邮箱'
                    }
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4">
                      <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                    </span>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:white dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="email"
                      name="emailAddress"
                      id="emailAddress"
                      placeholder={cognifyEmail}
                      defaultValue={cognifyEmail}
                      readOnly

                    />
                  </div>
                </div>

                {/* Spacer to push the button to the bottom */}
                <div className="flex-grow"></div>

                <div className="flex justify-end mt-4">
                  <Link to="/auth/reset-password">
                  <button
                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:white dark:text-white"
                    type="button"
                  >
                    {language === 'en'
                        ? 'Reset Your Password'
                        : '重置密码'
                    }
                  </button>
                </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Plan Information Section */}
        <div className="col-span-5 xl:col-span-2 flex flex-col">
          <div className="rounded-lg border border-stroke bg-white shadow-lg dark:white dark:bg-boxdark flex-grow flex flex-col">
            <div className="border-b border-stroke py-4 px-6 dark:white">
              <h3 className="font-medium text-black dark:text-white">
              {language === 'en'
                        ? 'Plan Information'
                        : "账户套餐信息:"
                  }
              </h3>
            </div>
            <div className="p-7 flex-grow">
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-stroke py-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                  {language === 'en'
                        ? 'Plan:'
                        : "套餐:"
                  }
                  </label>
                  <span className="text-black dark:text-white">{planName}</span>
                </div>

                <div className="flex justify-between items-center border-b border-stroke py-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                  {language === 'en'
                        ? 'Status:'
                        : "账户状态:"
                  }
                  </label>
                    <span
                    className={`text-black dark:text-white ${
                      status === "Inactive" ? "font-bold text-red-500" : ""
                    }`}
                  >
                  {language === 'en'
                        ? status === "Inactive" ? "Expired" : status
                        : status === "Inactive" ? "已过期" : status
                  }
                  </span>
                </div>

                <div className="flex justify-between items-center border-b border-stroke py-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                  {language === 'en'
                        ? 'Start Date:'
                        : "开始日期:"
                  }
                  </label>
                  <span className="text-black dark:text-white">{startDate}</span>
                </div>

                <div className="flex justify-between items-center border-b border-stroke py-2">
                  <label className="text-sm font-medium text-black dark:text-white">
                  {language === 'en'
                        ? planName === 'One-time Payment' ? 'Expiration Date:' : 'Next Billing Date:'
                        :planName === 'One-time Payment' ? '到期日:' : '下次账单日:'
                  }

                  </label>
                  <span className="text-black dark:text-white">{endDate}</span>
                </div>
              </div>
            </div>
            <div className="p-7 flex justify-end items-center">
                 <button
                      className={`flex justify-center rounded border border-stroke py-2 px-6 font-medium text-gray-400 hover:shadow-1 dark:white dark:text-white`}
                      type="button"
                      onClick={handleManageSubscriptionClick}
                      disabled={loadingManageSubscription} // Optionally disable the button while loading
                    >
                      {loadingManageSubscription ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 mr-3 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        language === 'en'
                        ? 'Manage Subscription'
                        : '订阅管理'
                      )}
                    </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
);

}
export default Settings;
