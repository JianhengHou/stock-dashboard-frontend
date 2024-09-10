import favicon from "../images/favicon.ico";
import React, { useState, useEffect } from 'react';
import HomeHeader from '../components/HomeComponents/HomeHeader.tsx';
import tutorialHeatmapEN from "../images/tutorial/tutorial_heatmap_EN.jpg";
import tutorialHeatmapCN from "../images/tutorial/tutorial_heatmap_CN.jpg";
import tutorialTreeMapEN from "../images/tutorial/tutorial_treemap_EN.jpg";
import tutorialTreeMapCN from "../images/tutorial/tutorial_treemap_CN.jpg";
import tutorialRoutersNewsCN from "../images/tutorial/tutorial_routersnews_CN.jpg";
import tutorialRoutersNewsEN from "../images/tutorial/tutorial_routersnews_EN.jpg";

import PricingTableOne from '../components/PricingTables/PricingTableOne';

const TutorialCapitalHeatMap: React.FC = () => {
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
  id="tutorial-heatmap"
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
                ? 'How to Discover Industries and Stocks that Capitals Favor?'
                : '如何发现资金青睐的行业及其突出个股?'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
              ? "The stocks collected in our tool are tagged with their industry info, so that we can gain a higher-level insight into the cross-industry and cross-time capital flows in the market."
              : '我们的工具对在库股票进行了行业层级的分类，从而我们可以从更高维度洞察市场里跨行业跨时序的资金流动情况'
              }
              <br /><br />
              {language === 'en'
                ? 'In addition to continuously tracking the capital flows of certain individual stocks in your watch list, grasping the capital flows of industries in the market not only serves as an effective reference for your investment decisions, but also helps you explore new investment targets from the macro level to mico level (Top-to-bottom method).'
                : "除了持续追踪您观察列表里个股的资金流情况外，把握市场当中行业的资金流动情况不仅对您的投资决策起到有效的参考作用，同时还能帮助您从宏观层面自上而下探索新的投资标的和机会。"
              }
              <br /><br />
              {language === 'en'
                ? 'Based on the theory above, here we provide two views for you:'
                : "基于上述方法论，我们为您提供了两个不同的视角:"
               }
               <ul className="list-disc pl-6">
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? 'Industry Capital Flow Heat Map: In different time granularity, this view informs that, over the past period, which industries have experienced capital inflows/outflows and which industries stand out to your interest.'
                    : "行业资金流热力图: 在不同的时间维度上，这个视图显示在过去的一段时间内资本流入/流出哪些行业，基于此您感兴趣的行业会相应脱颖而出。"
                    }
                    </li>
                    <li className="mb-2 font-bold">
                    {language === 'en'
                    ? "Individual Stock Capital Flow Heat Map: We provide the capital flow detail of specific stocks in different industries based on the same day, week, or month. In this way, you can comprehensively observe which stocks are outstanding in the industry you choose. We also directly listed the 10 stocks with the largest net outflows and inflows in the market."
                    : "个股资金流热力图: 我们提供基于当日，当周，或者当月，不同的行业下具体个股的资金流情况。这样您可以全面的观察在你所选的行业下，哪些个股是行业中表现突出的标的。我们也直接列举了市场当中净流出和流入最多的10只标的。"
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
                ? 'Target Industry: Industry Capital Flow Heat Map'
                : '锁定行业: 行业资金流热力图'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
                ? "The view below is exactly the heatmap of industry capital flow we saw on November 1, 2023. We can have a sense of the changing trends of capital flows among industries on the day: Technology industries such as semiconductors, software architecture, and Internet Retail have the largest in-flow capitals, while capitals flow out heavily from industries such as banks, restaurants, tourism, and health."
                : '下图显示的正是2023年11月1日当天我们所看到的行业资金热力图。 我们可以聚焦当日行业间资金流的变化趋势注意到半导体，软件架构， 互联网零售等科技行业拥有最大的资金流入，而资金从银行，餐厅，旅游，健康等行业中大量流出。'
              }
              <br /><br />
              {language === 'en'
                ? "Our team observed from the historical capital flows on the vertical timeline that the semiconductor industry began to have capital inflows after two weeks of decline. On that day, there was a net inflow of US$816 million. Combining the ongoing context of hot GenAI application and  AI chip shortage at that time, we locked the industry in semiconductors."
                : "我们团队从纵向时间轴的历史资金流观察到半导体行业在持续了两周的下跌行情后，开始有资金流入，在当日更是有8.16亿美元的净资金注入。结合当时持续火热的GenAI应用和AI芯片短缺的背景，我们将行业锁定在了半导体。"
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialHeatmapEN:tutorialHeatmapCN}
            alt="tutorial MCD"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>

        {/* Section 3 */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-5 flex-1 lg:max-w-[1000px]">
            <h2 className="mb-4 text-2xl font-bold leading-tight text-dark dark:text-white sm:text-[32px] sm:leading-[1.2]">
              {language === 'en'
                ? 'Target Stocks:  Individual Stock Capital Flow Heat Map'
                : '锁定个股: 个股资金流热力图'}
            </h2>
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
                ? "The view below is exactly the heatmap of individual Stock capital flow we saw on November 1, 2023. After locking in the semiconductor industry, we noticed that AMD and NVDA accounted for more than 95% of the funds flowing into the semiconductor industry. AMD, in particular, has seen unprecedented inflows after nearly half a year of downward trend. NVDA also reached the moment of bottoming out during the half-year stock price fluctuation."
                : "下图正是我们在 2023 年 11 月 1 日看到的个人资金流向热图。在锁定了半导体行业后，我们注意到AMD和NVDA占据95%以上在半导体行业流入的资金。尤其是AMD，在经历了将近半年的下跌趋势后，我们看到了前所未有的资金流入。NVDA也在半年的股价震荡中来到了触底反弹的时刻。"
              }
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialTreeMapEN:tutorialTreeMapCN}
            alt="tutorial MCD"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-5 flex-1 lg:max-w-[1000px]">
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
                  {language === 'en'
                    ? "We immediately locked the target AMD. Combining its fundamentals and the following Reuters news, we conclude that the relatively undervalued valuation of AMD and its MI300 chip's affordable replacement of NVDA chip H100 in the chip industry and very optimistic sales expectations will continue to provide strong catalysts for its stock price to rise."
                    : "我们随即锁定了标的AMD。结合其基本面和如下路透社新闻，我们得出结论：AMD相对低估的估值及其MI300芯片在行业对于NVDA芯片H100的平价替代和非常乐观的销售预期将持续为其股价的拉升带来强劲的催化剂。"
                  }
             </p>
        </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={language === 'en'?tutorialRoutersNewsEN:tutorialRoutersNewsCN}
            alt="tutorial MCD"
            className="-mt-8 w-full rounded-xl object-cover object-center mb-8 lg:max-w-[1000px]" // Adjust margins as needed
          />
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:space-x-8 ">
          <div className="-mt-5 flex-1 lg:max-w-[1000px]">
            <p className="text-xl leading-relaxed text-body-color dark:text-dark-6">
              {language === 'en'
                ? (
                  <>
                    After this short but in-depth analysis, we placed a heavy position in AMD and NVDA on November 1st. Once you understand the methodology we detailed in{" "}
                    <a
                      href="/tutorialCapitalFlowHistory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      How to Make Buy/Sell Decisions from Money Flow Signals?
                    </a>, you can clearly see in AMD's individual stock dashboard why we can liquidate all AMD positions between May 8th and May 11th and achieve a huge profit of 73%.
                  </>
                ) : (
                  <>
                    在短暂但有深度的思考下我们在11月1日当日重仓了AMD，同时加仓了NVDA。一旦您理解了我们在
                    <a
                      href="/tutorialCapitalFlowHistory"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      如何通过资金流信号做出买入/卖出决策?
                    </a> 中所详述的方法后，您可以清楚地在AMD的个股仪表盘中体会到，我们为什么可以在2024年5月8日到5月11之间出清所有AMD的头寸获得73%的巨大收益。
                  </>
                )
              }
            </p>
        </div>
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

export default TutorialCapitalHeatMap;