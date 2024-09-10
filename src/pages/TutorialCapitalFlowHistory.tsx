import favicon from "../images/favicon.ico";
import React, { useState, useEffect } from "react";
import HomeHeader from "../components/HomeComponents/HomeHeader.tsx";
// import tutorialMCDEN from "../images/tutorial/Tutorial_MCD_EN.jpg";
// import tutorialMCDCN from "../images/tutorial/Tutorial_MCD_CN.jpg";
import tutorialHIMSEN from "../images/tutorial/Tutorial_HIMS_EN.jpg";
import tutorialHIMSCN from "../images/tutorial/Tutorial_HIMS_CN.jpg";
import tutorialAAPLEN from "../images/tutorial/Tutorial_AAPL_EN.jpg";
import tutorialAAPLCN from "../images/tutorial/Tutorial_AAPL_CN.jpg";
import PricingTableOne from '../components/PricingTables/PricingTableOne';

const TutorialCapitalFlowHistory: React.FC = () => {
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

// <div className="flex flex-col items-center lg:items-start">
//           <img
//             src={language === 'en'?tutorialMCDEN:tutorialMCDCN}
//             alt="tutorial MCD"
//             className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
//           />
//         </div>

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
  id="tutorial-capital-flow"
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
                ? 'How to Make Buy/Sell Decisions through Capital Flow Signals?'
                : '如何通过资金流信号做出买入/卖出决策?'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
              ? "Our tool monitors the 'smart' capital flow of different scales for stocks in the US/HK Markets on a daily base. By observing past and current capital in-flow and out-flow patterns of main and middle/small scales for individual stocks, we can conclude the capital flow patterns led by the Smart Money (institutions/individuals who own more inside information as well as significant capital) on the stocks, identify how those institutions made buy/sell decisions under circumstances and timeline, and further get informed on whether shares of a stock are accumulated or sold off by these main-force entities. "
              : '我们的工具每天监控美港市场股票不同规模资金的流向。通过观察个股过去和现在的主力和中小规模的资金流入和流出模式，我们可以总结出聪明钱（拥有更多内幕信息和大量资金的机构/个人）主导的股票资金流向模式，以识别这些机构在特定时间线下做出买入/卖出决策，并进一步掌握股票标的是否正在被这些主力实体吸筹或是抛售。'
              }
              <br /><br />
              {language === 'en'
                ? 'The prerequisite for the rise or fall of stocks is a large-scale capital inflow and outflow, which means that the formation of prices is based on the imbalance of supply and demand caused by early capital flows. For "smart money" who have more inside information, have an analysis team and hold a large amount of capital, they often buy/sell stocks on a large scale without causing excessive fluctuations in stock prices or attracting market attention. To carry out capital accumulation/selling is a common strategy form for the upcoming stock price increase/smash.'
                : "股票的上涨或者下跌的前提是具有较大规模的资金流入和流出， 也就是说价格的形成是以前期资金流动所带来的供需关系的不平衡作为基础和前提的。对于掌握更多内部信息, 拥有分析团队并持有大量资本的“聪明资金”来说，在尽量不引起股价过大幅波动并引起市场关注的时候买入/卖出股票以对股票进行相对大规模资金吸筹/抛售是即将到来的股票拉升/砸盘的常见策略模式。"
              }
              <br /><br />
              {language === 'en'
                ? 'We found that when the stock price fluctuation range of individual stocks is not large and the valuation is relatively reasonable or low, continuous net capital inflows or single-day large-scale net capital inflows (especially main flows) often herald the approach of the stock price rising stage. On the contrary, when the stock price begins to trend bearish, similar patterns of capital outflows also serve as leading indicators.'
                : "我们发现在个股的股价波动范围不大、同时处于估值相对合理或者低位的时候， 连续的资金净流入或是单日大级别资金净流入（特别是主力资金），往往预示着股票拉升阶段的临近。反之，对于股价开始走熊的情况，类似形态的资金流出同样起到了领先指标的作用。"
              }
              <br /><br />
              {language === 'en'
                ? 'Having such critical information can help investors: '
                : "拥有这样的极为关键的信息，能够帮助投资者："
               }
               <ul className="list-disc pl-6">
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? 'Greatly enhance confidence in buying and selling decisions'
                    : "大大提升买卖决策的信心"
                    }
                    </li>
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? "Buy and sell investment targets in time to increase potential investment returns"
                    : "在黄金时间买入和卖出投资标的以提升潜在投资收益"
                    }
                    </li>
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? 'Shorten the investment cycle of the target and save valuable time for investors who have to hold stocks with no upward momentum for a long time.'
                    : "缩短标的投资周期，为不得不长期持有暂时没有上涨动能股票标的投资者节省宝贵的时间"
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
                ? 'Example: MCD (Blue-chip Stock)'
                : '案例: MCD (蓝筹股)'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
                ? "As the capital chart below shows, after two months of price rising, MCD experienced a main sell-off on Dec 15, 2023 (the red bar). Since then, the stock price has experienced three months of sideways fluctuations and a three-month retracement of 15%. Based on this obvious model, most of the MCD positions we held were carried out profit-taking operations in batches between Dec 18 and Dec 27. "
                : '如下资金图显示，经历了2个月的股价拉升后的MCD在23年12月15日出现了主力资金的抛售(主力资金流入表的红色柱)。 此后股价经历了长达三个月的横盘整荡和三个月15%的的回撤。基于这个明显的型号我们持有的大部分MCD的仓位在12月18日和12月27日之间进行了分批止盈的操作。'
              }
              <br /><br />
              {language === 'en'
                ? 'With enough cash left, we waited for opportunities. On Jun 21, 2024, we once again observed a main in-flow into MCD (the green bar). After further observation for many days to confirm the formation of its phased bottom, we began to enter the market in batches between Jun 28 and Jul 2. To our delight, the stock price rebounded from the low point on Jul 9 and then began to rise again for two months. As of the date, we have taken profit on 70% of our positions near the $290 price and remain on the sidelines.'
                : "留有充足现金的我们伺机等待机会。2024年6月21日，我们再次观察到主力资金重新大规模流入到MCD。在此后进一步观察多日确认其阶段性底部形成后，我们在6月28日至7月2日之间开始分批重仓入场。让我们欣喜的是，7月9日股价在低点反弹后又开始了2个月的拉升。截止本文，我们已在$290附近止盈70%的仓位，并保持观望。"
              }
              <br /><br />
              {language === 'en'
                ? "In just the past four months in total of the MCD investment cycle, we have made a profit of nearly 30%. For a blue-chip stock like MCD, our returns far exceed the market."
                : "短短一共4个月的MCD投资周期，我们已经获利接近30%， 对于MCD这样的蓝筹股来说我们的收益远超市场。"
              }
            </p>
          </div>
        </div>


        {/* Section 3 */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-5 flex-1 lg:max-w-[1000px]">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-dark dark:text-white sm:text-[32px] sm:leading-[1.2]">
              {language === 'en'
                ? 'Example: HIMS (Growth Stock)'
                : '案例: HIMS (成长股)'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
                ? "By using the strategy feature of this tool, we noticed that a large amount of funds continued to be flowed into HIMS on Feb 26, 2024. Taking into consideration the company's fundamentals and its successful advertising effect, we opened our first position on the day. The stock rose by 50% in the following month. During the retracement period, seeing that the capital flows were relatively small, we did not reduce our positions but chose to hold and wait. Until May 8, noticing large capital flowing in,  we immediately decided to increase our position for the second time. A week later, the stock price surged strongly. On that day, we chose to take profit of 50% of the position at the price of $19 and continued to observe."
                : '我们通过使用资金工具的策略功能，在2024年2月26号留意到了大量资金持续注入HIMS。在结合其公司基本面和其成功的广告效应的考虑下，我们在26号开启了第一仓。 随后一个月股票顺势拉升50%。在回撤期间， 看到资金净流入流出量相对较小，我们并没有选择减仓而是选择观望。直到5月8日我们发现较大量级的资金连续流入， 随即决定第二次加仓。 一周之后股价强势暴力拉升。 当日我们选择在$19的价位止盈50%的仓位并继续观察。'
              }
              <br /><br />

              {language === 'en'
                ? "Surprisingly, in the following week, we observed a another larger amount of net capital inflows for multiple consecutive days. Our judgment was that the rising trend was not over yet. So we bought back 25% of our position on May 29th and held 75% of the position until the stock price reflected a higher valuation, and after confirming the main selling on June 20, we immediately chose to take profits on all positions on that day."
                : "没想到的是随后的一周我们观察到更大量级的资金连续多日净流入，我们的判断是行情并没有结束。 所以我们在5月29日回补了25%的筹码。我们持有75%的仓位直到股价反应的估值较高时，并确认了6月20日的主力抛售后，立即选择当日获利了结所有的仓位。"
              }
              <br /><br />
              {language === 'en'
                ? 'Also in the short 4-month investment cycle, we achieved a profit of 104% with the help of this tool. Thanks to our optimism about the fundamentals of this stock and timely observation of the signals reflected by the dashboard.'
                : "同样是在短短4个月的投资周期中，我们借助资金工具实现了104%的利润。很庆幸我们对该股票基本面的乐观态度并且观察到资金工具所及时反应出的资金信号。"
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialHIMSEN:tutorialHIMSCN}
            alt="tutorial MCD"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>


        {/* Section 4 */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-5 flex-1 lg:max-w-[1000px]">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-dark dark:text-white sm:text-[32px] sm:leading-[1.2]">
              {language === 'en'
                ? 'Example: AAPL (Value Stock)'
                : '案例: AAPL (价值股)'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
                ? "AAPL, a well known company, its historical capital flow info and stock price performance should be the best verification of the effectiveness of our tools."
                : 'AAPL是大家都所熟知的公司。它的历史资金信息和股价表现无疑是对于我们工具有效性的最佳验证。'
              }
              <br /><br />
              {language === 'en'
                  ? <>Between April 10th and May 2nd, 2024, we noticed large-scale net inflows of funds for more than 10 consecutive days through the use of one strategy mentioned in {' '}
                      <a href="/tutorialCapitalStrategy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline">
                        How to Screen out Stocks with High Trading Potential via Strategies?
                      </a>. We aggressively made bought-in orders on April 26 and May 2 in batches. The stock price jumped immediately in the next few days. It can be said that we seized the best opportunity in the near future and opened a large number of positions to buy AAPL as a long-term investment target.</>
                  : <>在2024的4月10号-五月2号之间我们通过使用
                      <a href="/tutorialCapitalStrategy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline">
                        如何通过提供的策略筛选出存在高潜交易机会的标的?
                      </a> 中提到的策略注意到连续10+多日的大规模资金净流入。 我们分批在4月23日和5月2日疯狂抄底买入。短短几日股价立马跳空。可以说我们抓住了近期最佳机会大量开仓买入了AAPL将其作为长期投资标的。</>
                }

              <br /><br />
              {language === 'en'
                ? "The later results were as reflected in the stock price, which shot up to $237. Since AAPL is our long-term target investment, we only reduced our position by 10% and chose to hold the rest. Due to the market plunge on Aug 5 and the observed capital inflows, we once again increased another 20% position. We currently hold a large position at the price of $183 and continue to observe the capital flow situation and choose opportunities to add positions or choose to control positions in stages to stop profits in batches."
                : "后期结果正如股价所示，价格冲高至$237。 由于AAPL是我们长期持有的价值股股票标的，我们只是减仓10%后选择继续持有。8月5日的大盘跳水以及观察到的资金流入情况，我再一次追加20%仓位。至此，我们目前在$183的价位持有大量的头寸并持续观察资金流动情况择机加仓或选择阶段性控制仓位分批止盈。"
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialAAPLEN:tutorialAAPLCN}
            alt="tutorial MCD"
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

export default TutorialCapitalFlowHistory;