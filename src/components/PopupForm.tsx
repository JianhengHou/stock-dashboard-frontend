import React, { useState, useEffect } from 'react';

interface PopupFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (dropdownStrategy: string, numberValue: number, strategy: string, tag: string) => void;
  strategy: string;
  tag: string;
  warningMessage?: string;
}

const PopupForm: React.FC<PopupFormProps> = ({ show, onClose, onSubmit, strategy, tag, warningMessage }) => {
  const [dropdownStrategy, setDropdownStrategy] = useState('');
  const [numberValue, setNumberValue] = useState(1);
  const defaultLang = 'en';
  const language = localStorage.getItem('language') || defaultLang;
  const [market, setMarket] = useState('US')

  useEffect(() => {
    // Set default option for
    if ((strategy === 'Capital Flow' | strategy === '资金流') && (tag === 'Consecutive Multi-day' | tag === '连续多日')) {
      setDropdownStrategy('in_flow|in_flow_count|');
    } else if ((strategy === 'Capital Flow' | strategy === '资金流') && (tag === 'In-window Multi-day' | tag === '窗口期内多日')) {
      setDropdownStrategy('in_flow|in_flow_count|10');
    } else if ((strategy === 'Turnover Rate' | strategy === '换手率') && (tag === 'Consecutive Multi-day' | tag === '连续多日')) {
      setDropdownStrategy('95|turnover_rate_95_percentile_count|');
    } else if ((strategy === 'Turnover Rate' | strategy === '换手率') && (tag === 'In-window Multi-day' | tag === '窗口期内多日')) {
      setDropdownStrategy('95|turnover_rate_95_percentile_count|7');
    } else if ((strategy === 'Price Gap' | strategy === '价格跳空') && (tag === 'Consecutive Multi-day' | tag === '连续多日')) {
      setDropdownStrategy('price_gap|jump_up_count|');
    } else if ((strategy === 'Price Gap' | strategy === '价格跳空') && (tag === 'In-window Multi-day' | tag === '窗口期内多日')) {
      setDropdownStrategy('price_gap|price_jump_up_count|7');
    }
  }, [strategy, tag]);

  if (!show) {
    return null;
  }

  const getOptions = (strategy: string, tag: string) => {
    switch (strategy + ':' + tag) {
      case 'Capital Flow:Consecutive Multi-day' :
        return (
          <>
            <option value="in_flow|in_flow_count|">In flow</option>
            <option value="main_in_flow|main_in_flow_count|">Main In Flow</option>
            <option value="mid_sml_in_flow|mid_sml_in_flow_count|">Middle Small In Flow</option>
            <option value="in_flow|out_flow_count|">Out flow</option>
            <option value="main_in_flow|main_out_flow_count|">Main Out Flow</option>
            <option value="mid_sml_in_flow|mid_sml_out_flow_count|">Middle Small Out Flow</option>
          </>
        );
      case 'Capital Flow:In-window Multi-day':
        return (
          <>
            <option value="in_flow|in_flow_count|14">In flow Past 10 Days</option>
            <option value="main_in_flow|main_in_flow_count|14">Main In Flow Past 10 Days</option>
            <option value="mid_sml_in_flow|mid_sml_in_flow_count|14">Middle Small In Flow Past 10 Days</option>
            <option value="in_flow|in_flow_count|28">In flow Past 20 Days</option>
            <option value="main_in_flow|main_in_flow_count|28">Main In Flow Past 20 Days</option>
            <option value="mid_sml_in_flow|mid_sml_in_flow_count|28">Middle Small In Flow Past 20 Days</option>
            <option value="in_flow|out_flow_count|14">Out flow Past 10 Days</option>
            <option value="main_in_flow|main_out_flow_count|14">Main Out Flow Past 10 Days</option>
            <option value="mid_sml_in_flow|mid_sml_out_flow_count|14">Middle Small Out Flow Past 10 Days</option>
            <option value="in_flow|out_flow_count|28">Out flow Past 20 Days</option>
            <option value="main_in_flow|main_out_flow_count|28">Main Out Flow Past 20 Days</option>
            <option value="mid_sml_in_flow|mid_sml_out_flow_count|28">Middle Small Out Flow Past 20 Days</option>
          </>
        );
      case 'Turnover Rate:Consecutive Multi-day':
        return (
          <>
            <option value="95|turnover_rate_95_percentile_count">Turnover Rate 95 Percentile </option>
            <option value="98|turnover_rate_98_percentile_count">Turnover Rate 98 Percentile </option>
          </>
        );
      case 'Turnover Rate:In-window Multi-day':
        return (
          <>
            <option value="95|turnover_rate_95_percentile_count|7">Turnover Rate 95 Percentile Past 5 Days</option>
            <option value="98|turnover_rate_98_percentile_count|7">Turnover Rate 98 Percentile Past 5 Days</option>
            <option value="95|turnover_rate_95_percentile_count|14">Turnover Rate 95 Percentile Past 10 Days</option>
            <option value="98|turnover_rate_98_percentile_count|14">Turnover Rate 98 Percentile Past 10 Days</option>
          </>
        );
      case 'Price Gap:Consecutive Multi-day':
        return (
          <>
            <option value="price_gap|jump_up_count|">Price Jump Up</option>
            <option value="price_gap|jump_down_count|">Price Jump Down</option>
          </>
        );
      case 'Price Gap:In-window Multi-day':
        return (
          <>
            <option value="price_gap|jump_up_count|7">Price Jump Up Past 5 Days</option>
            <option value="price_gap|jump_up_count|14">Price Jump Up Past 10 Days</option>
            <option value="price_gap|jump_down_count|7">Price Jump Down Past 5 Days</option>
            <option value="price_gap|jump_down_count|14">Price Jump Down Past 10 Days</option>
          </>
        );
      case '资金流:连续多日' :
        return (
          <>
            <option value="in_flow|in_flow_count|">净流入</option>
            <option value="main_in_flow|main_in_flow_count|">主力净流入</option>
            <option value="mid_sml_in_flow|mid_sml_in_flow_count|">中小单净流入</option>
            <option value="in_flow|out_flow_count|">净流出</option>
            <option value="main_in_flow|main_out_flow_count|">主力净流出</option>
            <option value="mid_sml_in_flow|mid_sml_out_flow_count|">中小单净流出</option>
          </>
        );
      case '资金流:窗口期内多日':
        return (
          <>
            <option value="in_flow|in_flow_count|14">10天内净流入</option>
            <option value="main_in_flow|main_in_flow_count|14">10天内主力净流入</option>
            <option value="mid_sml_in_flow|mid_sml_in_flow_count|14">10天内中小单净流入</option>
            <option value="in_flow|in_flow_count|28">20天内总净流入</option>
            <option value="main_in_flow|main_in_flow_count|28">20天内主力净流入</option>
            <option value="mid_sml_in_flow|mid_sml_in_flow_count|28">20天内中小单净流入</option>
            <option value="in_flow|out_flow_count|14">10天内净流出</option>
            <option value="main_in_flow|main_out_flow_count|14">10天内主力净流出</option>
            <option value="mid_sml_in_flow|mid_sml_out_flow_count|14">10天内中小单净流出</option>
            <option value="in_flow|out_flow_count|28">20天内净流出</option>
            <option value="main_in_flow|main_out_flow_count|28">20天内主力净流出</option>
            <option value="mid_sml_in_flow|mid_sml_out_flow_count|28">20天内中小单净流出</option>
          </>
        );
      case '换手率:连续多日':
        return (
          <>
            <option value="95|turnover_rate_95_percentile_count">95分位换手率 </option>
            <option value="98|turnover_rate_98_percentile_count">98分位换手率 </option>
          </>
        );
      case '换手率:窗口期内多日':
        return (
          <>
            <option value="95|turnover_rate_95_percentile_count|7">5天内95分位换手率</option>
            <option value="98|turnover_rate_98_percentile_count|7">5天内98分位换手率</option>
            <option value="95|turnover_rate_95_percentile_count|14">10天内95分位换手率</option>
            <option value="98|turnover_rate_98_percentile_count|14">10天内98分位换手率</option>
          </>
        );
      case '价格跳空:连续多日':
        return (
          <>
            <option value="price_gap|jump_up_count|">向上跳空</option>
            <option value="price_gap|jump_down_count|">向下跳空</option>
          </>
        );
      case '价格跳空:窗口期内多日':
        return (
          <>
            <option value="price_gap|price_jump_up_count|7">5天内向上跳空</option>
            <option value="price_gap|price_jump_up_count|14">10天内向上跳空</option>
            <option value="price_gap|price_jump_down_count|7">10天内向上跳空</option>
            <option value="price_gap|price_jump_down_count|14">10天内向下跳空</option>
          </>
        );
      default:
        return <option value="">
        {language === 'en'
        ?'Select a strategy'
        :'选择策略'
        }
        </option>;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-8 rounded-md w-1/3">
        <h2 className="mb-6 text-2xl dark:white">{strategy} : {tag}</h2>
        <div className="mb-6">
        <label className="block mb-2 text-lg">
        {language === 'en'
          ? 'Market:'
          : '市场:'
          }
        </label>
          <select
            className="p-3 border rounded-md w-full text-lg"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          >
            <option value="US">US</option>
            <option value="HK">HK</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg">
          {language === 'en'
          ? 'Strategy:'
          : '策略:'
          }
          </label>
          <select
            className="p-3 border rounded-md w-full text-lg"
            value={dropdownStrategy}
            onChange={(e) => setDropdownStrategy(e.target.value)}
          >
            {getOptions(strategy, tag)}
          </select>
        </div>
        <div className="mb-6 flex items-center">
          <label className="block mr-4 text-lg">
          {language === 'en'
          ? 'Day Counts:'
          : '天数'
          }
          </label>
          <button
            className="p-3 border rounded-md text-lg"
            onClick={() => setNumberValue(numberValue - 1)}
          >
            -
          </button>
          <input
            type="number"
            className="p-3 border rounded-md mx-4 w-20 text-center text-lg"
            value={numberValue}
            onChange={(e) => setNumberValue(Number(e.target.value))}
          />
          <button
            className="p-3 border rounded-md text-lg"
            onClick={() => setNumberValue(numberValue + 1)}
          >
            +
          </button>
        </div>

        {/* Warning message */}
        {warningMessage && (
          <div className="mt-4 text-red-600">
            {warningMessage}
          </div>
        )}

        <div className="flex justify-end mt-8">
          <button
            className="p-3 border rounded-md mr-4 text-lg"
            onClick={onClose}
          >
          {language === 'en'
          ? 'Cancel'
          : '取消'
          }
          </button>
          <button
            className="p-3 border rounded-md text-lg"
            onClick={() => onSubmit(dropdownStrategy, numberValue, strategy, tag, market)}
          >
          {language === 'en'
          ? 'Submit'
          : '提交'
          }
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
