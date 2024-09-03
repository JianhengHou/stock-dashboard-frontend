import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

interface SeriesData {
  name: string;
  type?: 'line' | 'candlestick';
  data: { x: Date; y: number[] | number }[];
}

interface CandleData {
  series: SeriesData[];
}

interface BarData {
  name: string;
  data: { x: Date; y: number }[];
}

interface CandleChartProps {
  tickerCode: string;
}

const CandleChart: React.FC<CandleChartProps> = ({ tickerCode }) => {
    const [state, setState] = useState<CandleData>({ series: [] });
    const [barSeries, setBarSeries] = useState<BarData[]>([]);
    const [title, setTitle] = useState<string>('');
    const [industry, setIndustry] = useState<string>('');
    const [changeRate, setChangeRate] = useState<number | null>(null);
    const [period, setPeriod] = useState<string>('6'); // Default period is 3 months

    const [latestTradingDate, setLatestTradingDate] = useState<string>('');
    const [latestOpen, setLatestOpen] = useState<number | null>(null);
    const [latestClose, setLatestClose] = useState<number | null>(null);
    const [latestHigh, setLatestHigh] = useState<number | null>(null);
    const [latestLow, setLatestLow] = useState<number | null>(null);
    const [latestPE, setLatestPE] = useState<number | null>(null);
    const [latestTurnOverRate, setLatestTurnOverRate] = useState<number | null>(null);
    const [latestVolume, setLatestVolume] = useState<number | null>(null);
    const [latestNetFlow, setLatestNetFlow] = useState<number | null>(null);
    const [latestMainFlow, setLatestMainFlow] = useState<number | null>(null);
    const [latestMidSmlFlow, setLatestMidSmlFlow] = useState<number | null>(null);
    const [latestMA5, setLatestMA5] = useState<number | null>(null);
    const [latestMA10, setLatestMA10] = useState<number | null>(null);
    const [latestMA20, setLatestMA20] = useState<number | null>(null);
    const [latestMA50, setLatestMA50] = useState<number | null>(null);
    const [latestMA120, setLatestMA120] = useState<number | null>(null);
    const defaultLang = 'en';
    const language = localStorage.getItem('language') || defaultLang;

  const fetchChartData = async (tickerCode: string, months_back_to: number) => {
    try {
      const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/ticker_details_dash`, {
        params: {
          code: tickerCode,
          months_back_to: months_back_to,
          market: tickerCode.split('.')[0]
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const candleOptions: ApexOptions = {
    chart: {
      type: 'candlestick',
//       height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => value.toFixed(2), // Round to 2 decimal places
      },
    },
    stroke: {
    width: [1, 1.5, 1.5,1.5,1.5,1.5, ], // Set stroke width for each series
    colors: [
    '#00000', // Color for candlestick series
    '#F0933F', // MA5
    '#4FACE1', // MA10
    '#D675D3', // MA20
    '#5EC284', // MA50
    '#EC6B65', // MA120
  ],
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#4CAF50',
          downward: '#F44336',
        },
        wick: {
          useFillColor: true,
        },
        columnWidth: '10%',
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    colors: [
    '#FFFFFF', // Color for candlestick series
    '#F0933F', // MA5
    '#4FACE1', // MA10
    '#D675D3', // MA20
    '#5EC284', // MA50
    '#EC6B65', // MA120
  ],
    legend: {
    show:true
  },
    responsive: [
    {
        breakpoint: 1800,
        options: {
          chart: {
            height: 440,
          },
        },
      },
      {
        breakpoint: 2000,
        options: {
          chart: {
            height: 440,
          },
        },
      },

    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChartData(tickerCode, parseInt(period)); // Ensure period is parsed to an integer if necessary
        if (Array.isArray(data) && data.length > 0) {
          const priceData = data.map((item: any) => ({
            x: new Date(item[4]),
            y: [item[5], item[7], item[8], item[6]]
          })).filter((item: any) => item.y.every((value: any) => value !== null && value !== undefined));
          const ma5 = data.map((item: any) => ({ x: new Date(item[4]), y: item[22].toFixed(2) }));
          const ma10 = data.map((item: any) => ({ x: new Date(item[4]), y: item[23].toFixed(2) }));
          const ma20 = data.map((item: any) => ({ x: new Date(item[4]), y: item[24].toFixed(2) }));
          const ma50 = data.map((item: any) => ({ x: new Date(item[4]), y: item[25].toFixed(2) }));
          const ma120 = data.map((item: any) => ({ x: new Date(item[4]), y: item[26].toFixed(2) }));

          const barVolume = data.map((item: any) => ({ x: new Date(item[4]), y: item[11].toFixed(0) }));
          const barInFlow = data.map((item: any) => ({ x: new Date(item[4]), y: item[15] }));
          const barMainInFlow = data.map((item: any) => ({ x: new Date(item[4]), y: item[16] }));
          const barMidSmlInFlow = data.map((item: any) => ({ x: new Date(item[4]), y: item[17] }));

          const industry = data[0][3];
          const tickerName = data[0][2];
          const lastClose = data[data.length - 1][6];
          const lastChangeRate = parseFloat(data[data.length - 1][13]).toFixed(2);

          setTitle(`${tickerName} (${tickerCode})`);
          setChangeRate(lastChangeRate);
          setIndustry(industry);
          setLatestTradingDate(data[data.length - 1][4].split(' ')[0])
          setLatestOpen(data[data.length - 1][5])
          setLatestClose(data[data.length - 1][6])
          setLatestHigh(data[data.length - 1][7])
          setLatestLow(data[data.length - 1][8])
          setLatestPE(data[data.length - 1][9])
          setLatestTurnOverRate(data[data.length - 1][10])
          setLatestVolume(data[data.length - 1][11])
          setLatestNetFlow(data[data.length - 1][15])
          setLatestMainFlow(data[data.length - 1][16])
          setLatestMidSmlFlow(data[data.length - 1][17])
          setLatestMA5(data[data.length - 1][22])
          setLatestMA10(data[data.length - 1][23])
          setLatestMA20(data[data.length - 1][24])
          setLatestMA50(data[data.length - 1][25])
          setLatestMA120(data[data.length - 1][26])

          setState({
            series: [{
                name: ' ',
                type: 'candlestick',
                data: priceData,
              },
            {
              name: 'MA5',
              type: 'line',
              data: ma5,
            },
            {
              name: 'MA10',
              type: 'line',
              data: ma10,
            },
            {
              name: 'MA20',
              type: 'line',
              data: ma20,
            },
            {
              name: 'MA50',
              type: 'line',
              data: ma50,
            },
            {
              name: 'MA120',
              type: 'line',
              data: ma120,
            },
            ]
          });
          setBarSeries([
            { name: language === 'en'?'Volume':'成交量', data: barVolume },
            { name: language === 'en'?'Net Flow':'净流入', data: barInFlow },
            { name:language === 'en'? 'Main Flow':'主力净流入', data: barMainInFlow },
            { name:language === 'en'? 'Mid&Sml':'中小单净流入', data: barMidSmlInFlow }
          ]);

        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [tickerCode, period]);

  const barOptions = (name: string): ApexOptions => ({
    chart: {
      type: 'bar',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      }
    },
    yaxis: {
      labels: {
        show: false,
        offsetX: 25, // Padding between the y-axis title and the left side of the chart
      },
      title: {
        text: name,

      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: { show: false },
    grid: {
      show: true,
      padding: {
      left: 40, // Adjust this value to add padding to the left side of the grid
    },
    },
    plotOptions: {
      bar: {
        columnWidth: '80%',
        barHeight: '100%',
        borderRadius: 0,
        padding: {
          top: 10,
          right: 0,
          bottom: 0,
          left: 0,
        },
        colors: {
          ranges: [
            {
              from: -1000000000000000000000000,
              to: -1,
              color: '#F44336'
            },
            {
              from: 0,
              to: 1000000000000000000000000000,
              color: name === 'Volume' | name === '成交量'? '#FEB019' : '#4CAF50'
            }
          ]
        }
      },
    },
    responsive: [
      {
        breakpoint: 1800,
        options: {
          chart: {
            height: 90,
          },
        },
      },
      {
        breakpoint: 2000,
        options: {
          chart: {
            height: 90,
          },
        },
      },
    ],
  });

  const getChangeRateColor = (rate: number) => {
    return rate >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getChangeRateArrow = (rate: number) => {
    return rate >= 0 ? '▲' : '▼';
  };

  const getFormattedChangeRate = (rate: number) => {
    return rate >= 0 ? `+${rate}%` : `${rate}%`;
  };

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod); // Update period state
  };

  return (
  <div className="col-span-12 rounded-sm -mb-5 border border-stroke bg-white px-5 pt-4 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4 xl:col-span-8">
    {industry && (
      <p className="text-gray-500 dark:text-gray-400">
        {industry}
      </p>
    )}
    <div className="flex justify-between items-center">
      <h5 className="text-xl font-semibold text-black dark:text-white">
        {title}
        {latestClose !== null && changeRate !== null && (
          <span className={`ml-4 ${getChangeRateColor(parseFloat(changeRate))}`}>
            ${latestClose} {getChangeRateArrow(parseFloat(changeRate))} {getFormattedChangeRate(parseFloat(changeRate))}
          </span>
        )}
      </h5>
      <div className="flex w-full max-w-45 justify-end mb-1">
  <div className="flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
    <button
      className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
        period === '3' ? 'bg-white dark:bg-boxdark' : ''
      }`}
      onClick={() => handlePeriodChange('3')}
    >
      {language === 'en'
                        ? '3M'
                        : '3月'
      }
    </button>
    <button
      className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
        period === '6' ? 'bg-white dark:bg-boxdark' : ''
      }`}
      onClick={() => handlePeriodChange('6')}
    >
      {language === 'en'
                        ? '6M'
                        : '6月'
      }
    </button>
    <button
      className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${
        period === '12' ? 'bg-white dark:bg-boxdark' : ''
      }`}
      onClick={() => handlePeriodChange('12')}
    >
      {language === 'en'
                        ? '12M'
                        : '12月'
      }
    </button>
  </div>
</div>
</div>
  <div className="flex flex-col text-sm text-gray-700 dark:text-gray-300">
  {/* First Row */}
  <div className="flex flex-wrap gap-4 mb-1">
    {[
      { label: language === 'en'? 'Last Trading Date:':'最新交易日', value: latestTradingDate },
      { label: language === 'en'? 'Open:':'开盘价', value: `$${latestOpen?.toFixed(2)}` },
      { label: language === 'en'? 'Close:':'收盘价', value: `$${latestClose?.toFixed(2)}` },
      { label: language === 'en'? 'High:':'最高价', value: `$${latestHigh?.toFixed(2)}` },
      { label: language === 'en'? 'Low:':'最低价', value: `$${latestLow?.toFixed(2)}` },
      { label: 'MA5:', value: `$${latestMA5?.toFixed(2)}`, color: '#F0933F' },
      { label: 'MA10:', value: `$${latestMA10?.toFixed(2)}`, color: '#4FACE1' },
      { label: 'MA20:', value: `$${latestMA20?.toFixed(2)}`, color: '#D675D3' },
      { label: 'MA50:', value: `$${latestMA50?.toFixed(2)}`, color: '#5EC284' },
      { label: 'MA120:', value: `$${latestMA120?.toFixed(2)}`, color: '#EC6B65' },
    ].map((item, index) => (
      <div key={index} className="flex items-center">
        <span className="font-bold mr-1" style={{ color: item.color || 'inherit' }}>
          {item.label}
        </span>
        <span className="font-bold" style={{ color: item.color || 'inherit' }}>
          {item.value}
        </span>
      </div>
    ))}
  </div>

  {/* Second Row */}
  <div className="flex flex-wrap gap-4">
    {[
      { label: language === 'en'? 'Volume:': '成交量:', value: latestVolume ? `${(latestVolume / 1e6).toFixed(2)} M` : '-' },
      { label: language === 'en'? 'Turnover Rate:': '换手率:' , value: latestTurnOverRate ? `${latestTurnOverRate.toFixed(2)}%` : '-' },
      { label: 'P/E:', value: latestPE?.toFixed(2) },
      { label: language === 'en'? 'Net Flow:': '净流入:', value: latestNetFlow ? `$${(latestNetFlow / 1e6).toFixed(2)} M` : '-' },
      { label: language === 'en'? 'Main Net Flow:': '主力净流入:', value: latestMainFlow ? `$${(latestMainFlow / 1e6).toFixed(2)} M` : '-' },
      { label: language === 'en'? 'Mid/Small Flow:': '中小单净流入:', value: latestMidSmlFlow ? `$${(latestMidSmlFlow / 1e6).toFixed(2)} M` : '-' },
    ].map((item, index) => (
      <div key={index} className="flex items-center">
        <span className="font-bold mr-1">{item.label}</span>
        <span
          className={`${
            item.label.includes('Flow') | item.label.includes('流') ? (parseFloat(item.value.replace(/[^0-9.-]/g, '')) > 0 ? 'text-green-500' : 'text-red-500') : ''
          }`}
        >
          {item.value}
        </span>
      </div>
    ))}
  </div>
</div>





    <div id="candleChart" className="-ml-5 mb-5">
      <ReactApexChart
        options={candleOptions}
        series={state.series}
        type="candlestick"
        height="100%"
        width="100%"
      />

      {barSeries.map((series, index) => (
        <div className="relative -mb-10" key={index}>
          <ReactApexChart
            options={barOptions(series.name)}
            series={[series]}
            type="bar"
            height="100%"
            width="100%"
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default CandleChart;
