import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import ChartTwo from '../components/Charts/ChartTwo';
import ChartFour from '../components/Charts/ChartFour';
import DefaultLayout from '../layout/DefaultLayout';
import TableWithPagination from '../components/Tables/TableWithPagination';
import CardDataStats from '../components/CardDataStats';
import PopupForm from '../components/PopupForm';
import withAuth from '../components/withAuth';

const fetchContinuousFlowData = async (flow_magnitude: string, flow_type: string, day: number, market: string) => {
  const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/continuous_flow`, {
    params: {
      flow_magnitude: flow_magnitude,
      flow_type: flow_type,
      day: day,
      market: market
    },
  });
  return response.data;
};

const fetchInWindowFlowData = async (flow_magnitude: string, flow_type: string, day: number, window_day: number, market: string) => {
  const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/inwindow_flow`, {
    params: {

      flow_magnitude: flow_magnitude,
      flow_type: flow_type,
      window_day: window_day,
      day: day,
      market: market
    },
  });
  return response.data;
};

const fetchContinuousTurnoverRatePercentileData = async (count_column_name: string, percentile: number, day: number, market: string) => {
  const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/continuous_turnover_rate_percentile`, {
    params: {
      count_column_name: count_column_name,
      percentile: percentile,
      day: day,
      market: market
    },
  });
  return response.data;
};

const fetchInWindowTurnoverRatePercentileData = async (count_column_name: string, percentile: number, day: number, window_day: number, market: string)=> {
  const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/inwindow_turnover_rate_percentile`, {
    params: {
      count_column_name: count_column_name,
      percentile: percentile,
      day: day,
      window_day: window_day,
      market: market
    },
  });
  return response.data;
};

const fetchContinuousPriceGapData = async (jump_type: string, day: number, market: string) => {
  const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/continuous_price_gap`, {
    params: {
      jump_type: jump_type,
      day: day,
      market: market

    },
  });
  return response.data;
};

const fetchInWindowPriceGapData = async (jump_type: string, day: number, window_day: number, market: string) => {
  const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/inwindow_price_gap`, {
    params: {
      jump_type: jump_type,
      day: day,
      window_day: window_day,
      market: market
    },
  });
  return response.data;
};

const Strategy: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [previousSelectedCard, setPreviousSelectedCard] = useState<number | null>(null);
  const [displaySelectedStrategy, setDisplaySelectedStrategy]=useState('');

  const [dropdownStrategy, setDropdownStrategy] = useState('');
  const [numberValue, setNumberValue] = useState(0);
  const [strategyData, setStrategyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const defaultLang = 'en';
  const language = localStorage.getItem('language') || defaultLang;

  const handleCardClick = (index: number, strategy: string, tag: string) => {
    setSelectedCard(index);
    setShowPopupForm(true);
    setSelectedStrategy(strategy);
    setSelectedTag(tag);
    setPreviousSelectedCard(selectedCard); // Save the previous selected card
  };

  const handlePopupFormClose = () => {
    setShowPopupForm(false);
    setSelectedCard(previousSelectedCard); // Reset to previous selected card
    setWarningMessage(null); // Reset warning message
  };

  const handlePopupFormSubmit = async (dropdownStrategy: string, numberValue: number, strategy: string, tag: string, market: string) => {
  setIsLoading(true);
  setIsError(false);
  setWarningMessage(null); // Reset warning message

  console.log(dropdownStrategy, numberValue, strategy,  tag, market)


  const [p1, p2, p3] = dropdownStrategy.split('|');
  console.log(p1, p2, p3)
  try {
    let data;
    if ((strategy === 'Capital Flow' | strategy === '资金流') && (tag === 'Consecutive Multi-day'|tag === '连续多日')) {
      if (language === 'en')
      {
      const type_str = p2.split('_').slice(0, -1).join(' ');
      setDisplaySelectedStrategy('with capital '+ type_str + ' for at least ' +String(numberValue) + ' CONSECUTIVE trading days until now [' + market + ' market]')
      } else
      {
      let type_str: string;
        if (p2 === 'in_flow_count') {
            type_str = '净流入';
        } else if (p2 === 'main_in_flow_count') {
            type_str = '主力净流入';
        } else if (p2 === 'mid_sml_in_flow_count') {
            type_str = '中小单净流入';
        } else if (p2 === 'out_flow_count') {
            type_str = '净流出';
        } else if (p2 === 'main_out_flow_count' ) {
            type_str = '主力净流出';
        } else if (p2 === 'mid_sml_out_flow_count') {
            type_str = '中小单净流出';
        }
      setDisplaySelectedStrategy('截至目前资金'+ type_str + '至少连续' +String(numberValue) + '天 [' + market + '市场]')
      }
      data = await fetchContinuousFlowData(p1, p2, numberValue, market);
    } else if ((strategy === 'Capital Flow' | strategy === '资金流')  && (tag === 'In-window Multi-day' | tag === '窗口期内多日')) {
      if (language === 'en')
      {
      const type_str = p2.split('_').slice(0, -1).join(' ');
      setDisplaySelectedStrategy('with capital '+ type_str + ' for at least ' +String(numberValue) + ' days in the past '  + String(p3) + ' trading days [' + market + ' market]' )
      }
      else
      {
      let type_str: string;
        if (p2 === 'in_flow_count') {
            type_str = '净流入';
        } else if (p2 === 'main_in_flow_count') {
            type_str = '主力净流入';
        } else if (p2 === 'mid_sml_in_flow_count') {
            type_str = '中小单净流入';
        } else if (p2 === 'out_flow_count') {
            type_str = '净流出';
        } else if (p2 === 'main_out_flow_count' ) {
            type_str = '主力净流出';
        } else if (p2 === 'mid_sml_out_flow_count') {
            type_str = '中小单净流出';
        }
      setDisplaySelectedStrategy('截至目前' + String(p3) + '日内资金'+ type_str + '至少' +String(numberValue) + '天 [' + market + '市场]')
      }
      data = await fetchInWindowFlowData(p1, p2, numberValue, p3, market);
    } else if ((strategy === 'Turnover Rate' | strategy === '换手率' ) && (tag === 'Consecutive Multi-day'|tag === '连续多日')) {
      if (language === 'en')
      {
      setDisplaySelectedStrategy('with above '+ String(p1) + ' percentile turnover rate for at least ' + String(numberValue) + ' CONSECUTIVE trading days [' + market + ' market]' )
      }
      else
      {
      setDisplaySelectedStrategy('截至目前超过'+ String(p1) + '百分位换手率至少连续' + String(numberValue) + '天 [' + market + '市场]' )
      }
      data = await fetchContinuousTurnoverRatePercentileData(p2, p1, numberValue, market);
    } else if ((strategy === 'Turnover Rate' | strategy === '换手率' ) && (tag === 'In-window Multi-day' | tag === '窗口期内多日')) {
      if (language === 'en')
      {
      setDisplaySelectedStrategy('with above '+ String(p1) + ' percentile turnover rate for at least ' + String(numberValue) + ' days in the past '  + String(p3) + ' trading days ['  + market + ' market]' )
      }
      else
      {
      setDisplaySelectedStrategy('过去'+ String(p3) + '天内超过'+ String(p1) + '百分位换手率至少' + String(numberValue) + '天 [' + market + '市场]' )
      }
      data = await fetchInWindowTurnoverRatePercentileData(p2, p1, numberValue, p3, market);
    } else if ((strategy === 'Price Gap' | strategy === '价格跳空') && (tag === 'Consecutive Multi-day'|tag === '连续多日')) {
      if (language === 'en')
      {
      const type_str = p2.split('_').slice(0, 2).join(' ');
      setDisplaySelectedStrategy('with price '+ type_str + ' for at least ' +String(numberValue) + ' CONSECUTIVE trading days until now [' + market + ' market]' )
      }
      else
      {
       let type_str: string;
        if (p2 === 'jump_up_count') {
            type_str = '向上跳空';
        } else if (p2 === 'jump_down_count') {
            type_str = '向下跳空';
        }
      setDisplaySelectedStrategy('截至目前价格'+ type_str + '至少连续' +String(numberValue) + '天 [' + market + ' 市场]' )
      }
      data = await fetchContinuousPriceGapData(p2, numberValue, market);
    } else if ((strategy === 'Price Gap' | strategy === '价格跳空') && (tag === 'In-window Multi-day' | tag === '窗口期内多日')) {
    if (language === 'en')
      {
      const type_str = p2.split('_').slice(0, 2).join(' ');
      setDisplaySelectedStrategy('with price '+ type_str + ' for at least ' +String(numberValue) + ' days in the past '  + String(p3) + ' trading days [' + market + ' market]' )
      }
      else
      {
      let type_str: string;
        if (p2 === 'jump_up_count') {
            type_str = '向上跳空';
        } else if (p2 === 'jump_down_count') {
            type_str = '向下跳空';
        }
      setDisplaySelectedStrategy('过去'+ String(p3) +'天内价格'+ type_str + '至少' +String(numberValue) + '天 [' + market + ' 市场]' )

      }
      data = await fetchInWindowPriceGapData(p2, numberValue, p3, market);
    }


    if (!data || data.length === 0) {
      setWarningMessage('There are no stocks that meet the requirements');
      setDisplaySelectedStrategy('')
    } else {
      setStrategyData(data);
      setShowPopupForm(false); // Close the popup form
    }
  } catch (error) {
    setIsError(true);
    console.error('Error fetching data:', error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-6">
        <span></span>
        <div className="px-4 md:px-6 xl:px-7.5">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 xl:grid-cols-6 2xl:gap-7.5 bg-">
            {[
              { strategy: language === 'en'?' Capital Flow':'资金流' , tag: language === 'en'?'Continuous Multi-day':'连续多日'},
              { strategy: language === 'en'?'Capital Flow':'资金流', tag: language === 'en'?'In-window Multi-day':'窗口期内多日'},
              { strategy: language === 'en'?'Turnover Rate':'换手率', tag: language === 'en'?'Continuous Multi-day':'连续多日'},
              { strategy: language === 'en'?'Turnover Rate':'换手率', tag: language === 'en'?'In-window Multi-day':'窗口期内多日'},
              { strategy: language === 'en'?'Price Gap':'价格跳空', tag: language === 'en'?'Continuous Multi-day':'连续多日'},
              { strategy: language === 'en'?'Price Gap':'价格跳空', tag: language === 'en'?'In-window Multi-day':'窗口期内多日'},
              // Add more cards here as needed
            ].map((card, index) => (
              <CardDataStats
                key={index}
                tag={card.tag}
                strategy={card.strategy}
                selected={selectedCard === index}
                onClick={() => handleCardClick(index, card.strategy, card.tag)}

              />
            ))}
          </div>
        </div>

        <PopupForm
          show={showPopupForm}
          onClose={handlePopupFormClose}
          onSubmit={handlePopupFormSubmit}
          strategy={selectedStrategy}
          tag={selectedTag}
          warningMessage={warningMessage} // Pass warning message to PopupForm
        />
        <TableWithPagination strategyData={strategyData} displaySelectedStrategy={displaySelectedStrategy}/>
      </div>
    </DefaultLayout>
  );
};

export default withAuth(Strategy);
