import favicon from "../../images/favicon.ico";
import React, { useState, useEffect } from 'react';
import HomeHeader from '../../components/HomeComponents/HomeHeader.tsx'
import tutorialAAPLEN from "../../images/tutorial/tutorial_strategy_AAPL_EN.jpg";
import tutorialAAPLCN from "../../images/tutorial/tutorial_strategy_AAPL_CN.jpg";
import tutorialTCOMEN from "../../images/tutorial/tutorial_strategy_TCOM_EN.jpg";
import tutorialTCOMCN from "../../images/tutorial/tutorial_strategy_TCOM_CN.jpg";
import tutorialTCOMDASHEN from "../../images/tutorial/tutorial_strategy_TCOM_dash_EN.jpg";
import tutorialTCOMDASHCN from "../../images/tutorial/tutorial_strategy_TCOM_dash_CN.jpg";
import tutorialM1EN from "../../images/tutorial/tutorial_strategy_M1_EN.jpg";
import tutorialM1CN from "../../images/tutorial/tutorial_strategy_M1_CN.jpg";
import tutorialM2EN from "../../images/tutorial/tutorial_strategy_M2_EN.jpg";
import tutorialM2CN from "../../images/tutorial/tutorial_strategy_M2_CN.jpg";
import tutorialMDASHEN from "../../images/tutorial/tutorial_strategy_M_dash_EN.jpg";
import tutorialMDASHCN from "../../images/tutorial/tutorial_strategy_M_dash_CN.jpg";
import PricingTableOne from '../../components/PricingTables/PricingTableOne';

const TutorialCapitalStrategy: React.FC = () => {
    const defaultLang = 'en'
    const [language, setLanguage] = useState(localStorage.getItem('language') || defaultLang) ;
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
    event.preventDefault();

    setLoading(true);

    // Simulate an asynchronous operation (e.g., API call)
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay

    setLoading(false);
    // Add any additional logic here, e.g., navigating to a new page
  };

    useEffect(() => {
      const wowScript = document.createElement('script');
      wowScript.src = '/wow.min.js'; // Absolute path from the public folder
      wowScript.onload = () => {
        // @ts-ignore
        new WOW().init();
      };
      document.body.appendChild(wowScript);

      return () => {
        document.body.removeChild(wowScript);
      };
    }, []);


return (
<>
  <div>
   <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          AlphaHood
        </title>
        <link
          rel="shortcut icon"
          href={favicon}
          type="image/x-icon"
        />
        <link rel="stylesheet" href="/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/animate.css" />
        <link rel="stylesheet" href="/tailwind.css" />
   <div className="ud-header fixed top-0 z-40 flex w-full items-center bg-primary h-17">
   <HomeHeader
   isHomePage={false}
   />
   </div>

<section
  id="tutorial-01"
  className="overflow-hidden z-10 bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
>
  <div className="container">
    <div className="wow fadeInUp" data-wow-delay=".2s">
      <div className="space-y-16"> {/* This creates vertical spacing between sections */}
        {/* Section 1 */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8">
          <div className="flex-1 lg:max-w-[1000px]">
            <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
              {language === 'en'
                ? 'How to Screen out Stocks with High Trading Potential via Strategies?'
                : '如何通过提供的策略筛选出存在高潜交易机会的标的?'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
              ? "This tool provides users with 30+ different types of stock selection strategies in 6 categories that can be screened. Each strategy is a specific indicator pattern."
              : '该工具为用户提供了多达6大类30+种不同类型可供筛选的选股策略。每一种策略都是一种具体的指标模式。'
              }
              <br /><br />

              {language === 'en'
                ? (
                  <>
                    In addition to the top-down approach to locating targets mentioned in {" "}
                    <a
                      href="/tutorialCapitalHeatmap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      How to Discover Industries and Stocks that Capitals Favor?
                    </a>, we use this very convenient and practical strategy feature more commonly. This feature has helped us play a key reference role in buying and selling decisions many times.
                  </>
                ) : (
                  <>
                    除了在
                    <a
                      href="/tutorialCapitalHeatmap"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      如何发现资金青睐的行业及其突出个股?
                    </a> 文中提到的自上而下的方式锁定标的外，我们更加常用的是这个非常方便实用的策略工具。该功能已经帮助我们多次在买入和卖出决策中起到了关键的参考作用。
                  </>
                )
              }

              <br /><br />
              {language === 'en'
                ? 'The six major categories of strategies are::'
                : "六大类策略分别为:"
               }
               <ul className="list-disc pl-6">
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? 'Capital Flow Pattern (Consecutive Multi-day): Stocks that have a specific pattern of capital in/out flows for many consecutive days'
                    : "资金流模式 (连续多日): 特定的某种资金流入流出的模式连续多日出现的个股"
                    }
                    </li>
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? "Capital Flow Pattern (In-window Multi-day): Stocks that have a specific pattern of capital in/out flows for at least X days in N days"
                    : "资金流模式 (窗口期内多日): N天内至少X天具有特定资金流入/流出流动模式的股票"
                    }
                    </li>
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? 'Turnover Rate Percentile Pattern (Consecutive Multi-day): Stocks whose turnover rate reaches a certain threshold for multiple consecutive days'
                    : "换手率模式 (连续多日): 换手率连续多日达到一定阈值的股票"
                    }
                    </li>
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? "Turnover Rate Percentile Pattern (In-window Multi-day): Stocks whose turnover rate reaches a certain threshold for at least X days within N days"
                    : "换手率模式 (窗口期内多日): 换手率在N日内至少X日达到一定阈值的股票"
                    }
                    </li>
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? 'Price Jump Pattern (Consecutive Multi-day): Stocks whose stock prices jump up/down for multiple consecutive days'
                    : "价格跳空 (连续多日): 股价连续多日向上/向下跳空的股票"
                    }
                    </li>
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? "Price Jump Pattern (In-window Multi-day): Stocks whose stock prices jump up/down for at least X days within N days"
                    : "价格跳空模式 (窗口期内多日): 股价在N日内至少向上/向下跳空X日的股票"
                    }
                    </li>
                </ul>
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-5 flex-1 lg:max-w-[1000px]">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-dark dark:text-white sm:text-[32px] sm:leading-[1.2]">
              {language === 'en'
                ? 'Use Case: Capital Flow Pattern (In-window Multi-day)'
                : '用例: 资金流模式 (窗口期内多日)'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
                ? (
                  <>
                    In the previous article {" "}
                    <a
                      href="/tutorialCapitalFlowHistory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      How to Make Buy/Sell Decisions through Capital Flow Signals?
                    </a>, we have mentioned how we made the decision to buy AAPL at the bottom on April 23 and May 2 based on the capital flow signal. So how did we identify such a signal in the first place?
                  </>
                ) : (
                  <>
                    在前文
                    <a
                      href="/tutorialCapitalFlowHistory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      如何通过资金流信号做出买入/卖出决策?
                    </a> 我们已经提到了我们如何根据资金流信号在4月23日和5月2日对AAPL进行了疯狂买入抄底的决定，那么我们是如何在第一时间发现这样的信号呢？
                  </>
                )
              }
              <br /><br />
              {language === 'en'
              ? "Although we have repeatedly discovered multiple days of capital inflows into AAPL through this tool for many days, we chose to follow up and observe because we noticed that the downward trend in AAPL's stock price has not yet eased. On April 23, 2024, the day after the stock price bottomed out and rebounded, the stock list of the in-window multi-day capital inflow strategy showed that AAPL had had capital inflows for 7 consecutive days in the past 10 days. This was a very strong signal: When the stock price is relatively low, the continued inflow of funds often represents the entry of smart funds. So we decided to buy a bulk of stock position that day."
              : '尽管我们已经多次通过该工具发现了AAPL有多日的资金流入，但由于观察到AAPL股价没有探底，我们选择了追踪观察。在2024年4月23日当天，也就是股价探底回升第二天，窗口期多日资金流入策略的股票列表中显示AAPL已经在近10天里连续7日有资金流入。这个是一个非常明显的信号，在股价相对低位，资金持续流入往往代表着聪明资金的入场。所以我们当日决定重仓买入。'
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialAAPLEN:tutorialAAPLCN}
            alt="tutorial strategy AAPL"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>

        {/* Section 3 */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-5 flex-1 lg:max-w-[1000px]">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-dark dark:text-white sm:text-[32px] sm:leading-[1.2]">
              {language === 'en'
                ? 'Use Case: Turnover Rate Percentile Pattern (Consecutive Multi-day)'
                : '用例: 换手率模式 (连续多日)'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
              ? "On November 21, 2023, we looked at the consecutive multi-day turnover rate filter in the strategy tool and noticed that TCOM’s trading volume on that day alone exceeded 98% of its historical level. We rarely see such a large trading volume in this stock. Although it fell 8.7% on the day after its third quarter earning report, based on the analysis of its fundamentals, we believe that the risks have been released and there was a large amount of buying in the stock price."
              : '2023年11月21日，我们查看策略工具中的连续多日换手率策略留意到TCOM仅当日的换手率超过了其历史98%的水平，我们很少看到该股有如此大的成交量。尽管其在第三季报后的当日下跌了8.7%，但是结合其基本面的分析我们认为风险已被释放，股价出现低洼。'
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialTCOMEN:tutorialTCOMCN}
            alt="tutorial strategy TCOM"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-15 flex-1 lg:max-w-[1000px]">
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
              ? "After entering the dashboard, we also noticed that there was a large inflow of funds that day. At this time we choose to buy on a large scale. On the next day, we observed that the turnover rate still maintained above the 98% percentile level and continued to be accompanied by net capital inflows, so we made the decision to increase our position. Investors who understand our methodology must also be able to guess which day in June we chose to take profit."
              : '进入个股仪表盘后我们同时注意到当日伴随大量资金金流入。此时我们选择大规模买入。在次日，我们观察到换手率依旧维持98%以上百分位水平且继续伴有资金净流入，所以进行了加仓的决策。了解我们方法论的投资者想必也能猜出我们在6月的哪一天选择了止盈。'
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialTCOMDASHEN:tutorialTCOMDASHCN}
            alt="tutorial strategy TCOM dash"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>

        {/* Section 4 */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-5 flex-1 lg:max-w-[1000px]">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-dark dark:text-white sm:text-[32px] sm:leading-[1.2]">
              {language === 'en'
                ? 'Use Case: Price Jump Pattern (Consecutive Multi-day)'
                : '用例: 价格跳空 (连续多日)'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
              ? "On November 15, 2023, the price gap filter in the strategy tool showed that M had a strong upward price gap. When the valuation of individual stocks is relatively low, the upward jump in price means that the market is optimistic about the individual stock, so the stock immediately attracted our great attention. We bought part of the position during the session and continued to track the market."
              : '2在2023年11月15日，策略工具里的价格向上跳空筛选器显示M有一次价格的强势向上跳空。在个股估值相对低的时候，价格的向上跳空以为着市场对个股的强势看好，所以该股随即引起了我们的高度关注。在盘中我们买入了部分头寸并持续追踪行情。'
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialM1EN:tutorialM1CN}
            alt="tutorial strategy M"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-15 flex-1 lg:max-w-[1000px]">
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
              ? "The next day, we observed that M had a price gap for two consecutive days, and M was the only stock that showed such a pattern that day. This price trend can be said to have released a strong signal for its new upside potential. So we choose to add 50% of the position."
              : '次日，我们观察到，M连续两日出现价格的跳空，并且M是当日唯一一个出现这样模式的股票。这样的价格走势可以说对于其新的上涨空间释放了有力的信号。所以我们选择追加50%的仓位。'
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
        <img
            src={language === 'en'?tutorialM2EN:tutorialM2CN}
            alt="tutorial strategy M"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-15 flex-1 lg:max-w-[1000px]">
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
              ? "As shown in the dashboard below, in addition to the pattern of two consecutive jump-up, we also observed a total of three positive signals including a high turnover rate and net capital inflows for 5 consecutive days. This also strongly explains why we chose to add to the position the next day. I believe investors can also notice the obvious signal of capital outflow in the later period, so we have made a lot of profits on M in just two months."
              : '正如下面仪表盘所显示的，除了在两次连续跳空的模式下，我们还观察到了高换手率，连续5日资金净流入等一共三重积极信号。这也有力地说明了我们为什么在次日选择了追加仓位。相信投资者还可以注意到后期明显的资金流出信号，所以我们在短短两个月内在M上收益颇多。'
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialMDASHEN:tutorialMDASHCN}
            alt="tutorial strategy M dash"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>

      </div>
    </div>
  </div>
</section>

<section
      id="pricing"
      className="relative z-20 overflow-hidden pb-12 pt-20 bg-wholeblack lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <h2
                className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-[40px] md:leading-[1.2]"
              >
                {language === 'en'
                        ? 'Pricing Plan'
                        : '工具套餐定价'
                }
              </h2>
              <p className="text-base text-dark-6">
                {language === 'en'
                        ? "We're excited to offer all first-time users a free 7-day trial of the tool, as well as one-time or monthly subscription plans for users with different potential needs."
                        : '我们很开心为所有首次用户提供免费7天试用工具的机会， 同时为不同潜在需求的用户提供一次性或按月订阅式的套餐计划。'
                }
              </p>
            </div>
          </div>
        </div>

        <PricingTableOne language={language}/>

      </div>
    </section>

 </div>
</>
)}

export default TutorialCapitalStrategy;