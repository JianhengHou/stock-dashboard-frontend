import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const PricingTableOne: React.FC  = ({ language }) => {
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
      {/* <!-- Pricing Item --> */}
      <div className="relative rounded-xl border  p-6 shadow-default border-strokedark bg-boxdark md:p-9 xl:p-11.5">
         <form onSubmit={(event) => handleCheckout(event, 'monthly')}>
                    <input type="hidden" name="signup_lookup_key" value="initiation_fee" />
                    <input type="hidden" name="monthly_plan_lookup_key" value="monthly_plan" />
                    <div className="mb-10 text-left">
                      <span className="mb-3.5 block text-xl font-bold text-black text-white">

                        {language === 'en'
                        ? 'Monthly Plan'
                        : '按次月度'
                        }
                      </span>
                      <h4 className="mb-4">
                        <span className="text-[28px] font-bold text-black text-white lg:text-[32px]">
                          $39.99
                        </span>
                        <span className="font-medium ml-2">
                        {language === 'en'
                        ? 'for One Month Only'
                        : '每月'
                        }
                        </span>
                      </h4>
                      <p className="mb-6 text-base font-medium whitespace-nowrap">
                        {language === 'en'
                        ?  'Best suited for one-time or returning users'
                        : '适合临时使用或者回头按需使用的用户'
                        }
                      </p>

                    </div>


        <h4 className="mt-7.5 mb-5 text-lg font-medium text-white">
          {language === 'en'
                        ?  'Features'
                        : '套餐特性'
          }
        </h4>

        <ul className="flex flex-col gap-3.5">
          <li className="font-medium">
          {language === 'en'
                        ? 'Unlimited Purchase'
                        : '无限制购买'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'All Features'
                        : '工具所有功能'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'One-time Payment'
                        : '一次性支付'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'Support Credit Card/WeChat/Paypal'
                        : '支持信用卡/微信/Paypal付款'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'No Proprietary Stock Info/News'
                        : '不支持个股相关私有消息/新闻'
          }</li>
        </ul>

        <button
                      type="submit"
                      className="mt-9 flex block w-full rounded-md bg-primary py-3 px-9 justify-center font-medium text-white transition hover:bg-opacity-90"
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
                        language === 'en' ? 'Buy Now': '立即购买'
                      )}
                    </button>
                      {error['monthly'] && <p className="text-red-500 mt-2">{error['monthly']}</p>}
        </form>
      </div>

      {/* <!-- Pricing Item --> */}
      <div className="relative rounded-xl border p-6 shadow-default border-strokedark bg-boxdark md:p-9 xl:p-11.5">
        <span className="absolute top-3.5 -right-1">
          <svg
            width={109}
            height={34}
            viewBox="0 0 109 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 0L106 0C107.657 0 109 1.34315 109 3V30L24 30L24 0Z"
              fill="#3C50E0"
            />
            <foreignObject x={24} y={0} width={81} height={30}>
              <div>
                <div className="mt-1 text-center font-satoshi text-sm font-medium text-white">
                  {language === 'en'
                        ? 'Best Value'
                        : '最值得推荐'
                        }
                </div>
              </div>
            </foreignObject>
            <path d="M0 0H24V30H0L19 15L0 0Z" fill="#3C50E0" />
            <path d="M105 34L109 30H105V34Z" fill="#2539C8" />
          </svg>
        </span>
        <form onSubmit={(event) => handleCheckout(event, 'trial')}>
                    <input type="hidden" name="signup_lookup_key" value="initiation_fee" />
                    <input type="hidden" name="subscription_lookup_key" value="recurring_monthly_plan" />
                    <div className="mb-10 text-left">
                      <span className="mb-3.5 block text-xl font-bold text-white">
                        {language === 'en'
                        ? '7-day Free Trial'
                        : '7天免费试用'
                        }
                      </span>
                      <h4 className="mb-4">
                      <span className="text-[28px] font-bold text-white lg:text-[32px]">
                         $0.00
                      </span>
                      <span className="font-medium ml-2" >
                      {language === 'en'
                        ? "then $39.99 Per Month"
                        : '试用后订阅，$39.99每月'
                        }
                        </span>
                      </h4>
                      <p className="mb-6 font-medium ">
                        {language === 'en'
                        ? 'Best suited for new users or professionals'
                        : '适合新用户或专业人士'
                        }
                      </p>
                    </div>

        <h4 className="mt-7.5 mb-5 text-lg font-medium text-white">
          {language === 'en'
                        ? 'Features'
                        : '套餐特性'
          }
        </h4>

        <ul className="flex flex-col gap-3.5">
          <li className="font-medium">
          {language === 'en'
                        ? 'New User Only'
                        : '仅限首次用户'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'All Features'
                        : '工具所有功能'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'Auto Subscription after the Free Trial'
                        : '7天后自动按月订阅'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'Support Credit Card and Paypal'
                        : '支持信用卡/Paypal付款'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'Proprietary Stock Info/News'
                        : '个股相关私有消息/新闻'
          }</li>
        </ul>

        <button
                      type="submit"
                      className="mt-9 flex block w-full rounded-md bg-meta-3 py-3 px-9 justify-center font-medium text-white transition hover:bg-opacity-90 !bg-meta-3"
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
                      language === 'en' ? 'Try Now': '立即试用'
                      )}
                    </button>
                    {error['trial'] && <p className="text-red-500 mt-2">{error['trial']}</p>}
       </form>

      </div>

      {/* <!-- Pricing Item --> */}
      <div className="relative rounded-xl border p-6 shadow-default border-strokedark bg-boxdark md:p-10 xl:p-11.5">
        <form onSubmit={(event) => handleCheckout(event, 'yearly')}>
                    <input type="hidden" name="signup_lookup_key" value="initiation_fee" />
                    <input type="hidden" name="yearly_plan_lookup_key" value="yearly_plan" />
                    <div className="mb-10 text-left">
                      <span className="mb-3.5 block text-xl font-bold text-black text-white">
                        {language === 'en'
                        ? 'Yearly Plan'
                        : '按次年度'
                        }
                      </span>
                      <h4 className="mb-4">
                        <span className="text-[28px] font-bold text-black text-white lg:text-[32px]">
                          $31.99
                        </span>
                        <span className="font-medium ml-2">
                        {language === 'en'
                        ? 'Per Month x 12'
                        : '每月x12'
                        }
                        </span>
                      </h4>
                      <p className="mb-6 font-medium">
                      {language === 'en'
                        ? 'Best suited for long-termism users'
                        : '适合秉承长期主义的用户'
                        }
                      </p>
                    </div>

        <h4 className="mt-7.5 mb-5 text-lg font-medium text-white">
          {language === 'en'
                        ? 'Features'
                        : '套餐特性'
          }
        </h4>

        <ul className="flex flex-col gap-3.5">
          <li className="font-medium">
          {language === 'en'
                        ? 'Unlimited Purchase'
                        : '无限制购买'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'All Features'
                        : '工具所有功能'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'One-time Payment'
                        : '一次性支付'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'Support Credit Card/WeChat/Paypal'
                        : '支持信用卡/微信/Paypal付款'
          }
          </li>
          <li className="font-medium">
          {language === 'en'
                        ? 'Proprietary Stock Info/News'
                        : '支持个股相关私有消息/新闻'
          }</li>
        </ul>

        <button
                      type="submit"
                      className="mt-9 flex block w-full rounded-md bg-primary py-3 px-9 justify-center font-medium text-white transition hover:bg-opacity-90"
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
                        language === 'en' ? 'Buy Now': '立即购买'
                      )}
                    </button>
                    {error['yearly'] && <p className="text-red-500 mt-2">{error['yearly']}</p>}
       </form>
      </div>
    </div>
  );
};

export default PricingTableOne;
