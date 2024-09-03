import React, { useState, useEffect, Fragment } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useQuery } from 'react-query';
import axios from 'axios';

import { createRoot } from "react-dom/client";
import { AgChartsReact } from "ag-charts-react";
import { AgChartOptions, AgCharts } from "ag-charts-enterprise";
import "ag-charts-enterprise";
import deepClone from "deepclone";

import { TreeMap, TreeMapSeries, TreeMapLabel, TreeMapLabelProps, TreeMapRect, TreemapRectProps,ChartTooltip, wrapText, calculateDimensions } from 'reaviz';
import { interpolateRdYlGn } from 'd3-scale-chromatic';
import { scaleLinear,scaleSequential, scaleLog } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';

interface HeatmapData {
  series: {
    name: string;
    data: { x: string; y: number; logY: number }[]; // Store both original and log-transformed values
  }[];
}

interface nodeData {
  key: string;
  data: number;
  flow: number;
}

interface TreeMapData {
  key: string;
  data: nodeData[];
}



const fetchIndustryHeatMapData = async (industry_granularity: string, market: string) => {
 const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/heatmap_industry`, {
    params: {
      granularity: industry_granularity,
      market: market
    }
  });
  return response.data;
};

const fetchIndividualTopInFlow = async (individual_granularity: string, market: string) => {
 const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/latest_top_individual`, {
    params: {
      granularity: individual_granularity,
      market: market
    }
  });
  return response.data;
};

const fetchTreeMapData = async (individual_granularity: string, market:string) => {
 const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/treemap_latest_individual`, {
    params: {
      granularity: individual_granularity,
      market: market
    }
  });
  return response.data;
};

interface FlowItem {
  title: string;
  date: string;
}

const getTopInFlow = (data: DataItem[]) => {
  return data.filter(item => item[2] <= 10 & item[1] > 0);
};

const getTopOutFlow = (data: DataItem[]) => {
  return data.filter(item => item[3] <= 10 & item[1] < 0);
};

const logBase2 = (value: number) => {
    const logTransformedInFlow = value> 1
    ? Math.log2(value)
    : value < -1
    ? -Math.log2(Math.abs(value))
    : value;
  return logTransformedInFlow
};

const ChartHeatMap: React.FC = () => {
  const [industry_granularity, setIndustryGranularity] = useState<string>('day'); // State to manage granularity
  const [individual_granularity, setIndividualGranularity] = useState<string>('day'); // State to manage granularity
  const [individual_flow_granularity, setIndividualFlowGranularity] = useState<string>('day'); // State to manage granularity
  const [market, setMarkt] = useState<string>('HK'); // State to manage granularity
  const defaultLang = 'en';
  const language = localStorage.getItem('language') || defaultLang;
  const { data: heatMap, isLoadingHeatMap, isErrorHeatMap } = useQuery(
    ['heatMap', industry_granularity, market],
    () => fetchIndustryHeatMapData(industry_granularity, market)
  );

    const { data: treeMap, isLoadingTreeMap, isErrorTreeMap } = useQuery(
    ['treeMap', individual_granularity, market],
    () => fetchTreeMapData(individual_granularity, market)
  );
    const { data: topIndividual, isLoadingTopIndividual, isErrorTopIndividual } = useQuery(
    ['topIndividual', individual_granularity, market],
    () => fetchIndividualTopInFlow(individual_granularity, market)
  );
  const [state, setState] = useState<HeatmapData>({ series: [] });
  const [treemapState, setTreemapState] = useState<TreemapData>({ series: [] });

  const [inFlowItems, setInFlowItems] = useState<FlowItem[]>([]);
  const [outFlowItems, setOutFlowItems] = useState<FlowItem[]>([]);

  useEffect(() => {
    if (heatMap) {
    // Grouping the data by date and applying the log transformation
    const groupedData = heatMap.reduce((acc: any, [date, industry, in_flow, code]: [string, string, number, string]) => {
      if (!acc[date]) {
        acc[date] = [];
      }
      // Apply the log transformation based on the adjustedInFlow value

      acc[date].push({
        x: industry,
        y: logBase2(in_flow),
        originalY: in_flow
      });

      return acc;
    }, {});
    // Transforming the grouped data into the desired format
    const processedHeatMapData = Object.entries(groupedData).map(([date, data]: [string, number, number]) => ({
      name: date,
      data: data,
    }));

    // Update the state with the processed data
    setState({ series: processedHeatMapData });
    }

    if (treeMap) {
        const groupedData: { [key: string]: NodeData[] } = {};

        treeMap.forEach(([industry, name, volume, in_flow, code]) => {
          if (!groupedData[industry]) {
            groupedData[industry] = [];
          }
          groupedData[industry].push({
            key: market === 'US'? code.split('.')[1]:name,
            data: logBase2(volume),
            flow: in_flow,
            OriginalVolume: volume
          });
        });

        const transformedData: TreeMapData[] = Object.keys(groupedData).map(industry => ({
          key: industry,
          data: groupedData[industry],
        }));

        setTreemapState(transformedData);
    }

    if (topIndividual) {
    const topInFlow = getTopInFlow(topIndividual);
    const topOutFlow = getTopOutFlow(topIndividual);

    const inFlowItems: FlowItem[] = topInFlow.map(item => ({
      name: item[0],
      flow: `${item[1]}`,
      code: item[4]
    })).sort((a, b) => parseFloat(b.flow) - parseFloat(a.flow));

    const outFlowItems: FlowItem[] = topOutFlow.map(item => ({
      name: item[0],
      flow: `${item[1]}`,
      code: item[4]
    })).sort((a, b) => parseFloat(a.flow) - parseFloat(b.flow));

    setInFlowItems(inFlowItems);
    setOutFlowItems(outFlowItems);

    }

  }, [heatMap, treeMap, topIndividual]);

    // Calculate min and max log-transformed values for the color scale
    const allInFlows_heatMap = heatMap ? heatMap.map((row: [string, string, number]) => row[2]) : [];
    const allLogInFlows_heatMap = allInFlows_heatMap.map(logBase2);

    const maxAbsInFlow_heatMap = Math.max(Math.abs(Math.min(...allLogInFlows_heatMap)), Math.abs(Math.max(...allLogInFlows_heatMap))); // Maximum absolute value after log transformation
 // Calculate min and max in_flow values for the color scale
  const allInFlows_treeMap = treeMap ? treeMap.map((row: [string, string, number, number]) => row[3]) : [];
  const maxAbsInFlow_treeMap = Math.max(Math.abs(Math.min(...allInFlows_treeMap)), Math.abs(Math.max(...allInFlows_treeMap))); // Maximum absolute value
   const [chartOptions, setChartOptions] = useState(getChartOptions(maxAbsInFlow_heatMap, localStorage.getItem('dark-mode')));


    // Create a sequential color scale using chroma.js
    // Create separate log scales for positive and negative values
    const positiveColorScale = scaleLog<string>()
      .base(2) // Base 2 logarithm
      .domain([1, maxAbsInFlow_treeMap]) // Handle positive values
      .range(['#0C0C0C', '#45CB59']); // Green for positive values

    const negativeColorScale = scaleLog<string>()
      .base(2) // Base 2 logarithm
      .domain([1, maxAbsInFlow_treeMap]) // Handle absolute value of negative values
      .range(['#0C0C0C', '#F53538']); // Red for negative values

    const usageColorScheme = (data: any, index: number, active?: any[]) => {
      const flow = data.flow;

      if (flow > 0) {
        return positiveColorScale(flow) || '#45CB59'; // Fallback to green if color is undefined
      } else if (flow < 0) {
        return negativeColorScale(Math.abs(flow)) || '#F53538'; // Use absolute value for the log scale, fallback to red
      } else {
        return '#0C0C0C'; // Fallback color for zero flow, or adjust as needed
      }
    };

const CustomTreeMapRect: React.FC<TreeMapRectProps> = ({ id, data, fill}) => {
  const [tooltipContent, setTooltipContent] = useState<React.ReactNode>(null);
  const handleMouseEnter = (event: any, data: any) => {
    const flowValue =
      data.data.flow > 0
        ? `$+${data.data.flow}M`
        : `$${data.data.flow}M`;

    setTooltipContent(
      <div style={{ color: 'white', backgroundColor: 'black', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
        <strong>{data.data.key}</strong>
        <br />
        {flowValue}
      </div>
    );
  };

  return (
    <>
      <TreeMapRect
        id={id}
        data={data}
        fill={fill}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setTooltipContent(null)}  // Clear tooltip on mouse leave
        tooltip={
        tooltipContent && (
          <ChartTooltip
            content={() => tooltipContent}
          />
        )
      }
      />
    </>
  );
};
      // Customized TreeMapLabel component
    const CustomTreeMapLabel: React.FC<TreeMapLabelProps> = ({
      id,
      data,
      wrap=true,
      fill = '#FFFFFF',
      fontSize = 10,
      fontFamily = 'sans-serif',
      placement = 'middle'
    }) => {
      const key = data.data.key;
      const flow = typeof data.data.flow === 'undefined'? '' : data.data.flow
      const width = data.x1 - data.x0;
      const height = data.y1 - data.y0;
      const displayText = data.height === 0 ? data.data.flow >0? `${key}\n$+${flow}M`: `${key}\n$${flow}M`: key;
      const text = wrapText({
        key: displayText,
        fontFamily,
        fontSize,
        paddingX: fontSize,
        wrap,
        paddingY: fontSize,
        width,
        height: data.y1 - data.y0
      });

        fontSize = data.height === 0? fontSize : fontSize*0.8
        const size = calculateDimensions(
            typeof text === 'string' ? text : key,
            fontFamily,
            fontSize

          );
              // Calculate text dimensions for each line and check if they fit within the rectangle
        const textLines = displayText.split('\n');
        const textDimensions = textLines.map(line => calculateDimensions(line, fontFamily, fontSize));
        const totalHeight = textDimensions.reduce((sum, dim) => sum + dim.height, 0);
        const maxWidth = Math.max(...textDimensions.map(dim => dim.width));
      const offsetX =
        placement === 'start'
          ? 10
          : placement === 'middle'
            ? (width - size.width) / 2
            : width - size.width - 10;
      const offsetY =
        placement === 'start'
          ? 10
          : placement === 'middle'
            ? data.height === 0? (height - size.height) / 2 : (size.height)
            : height - size.height - 10;

      // Hide text to display if it's width or height exceeding the rectangle
      if (maxWidth+offsetX > width || totalHeight+offsetY > height) {
            return null; // Hide text if it doesn't fit
          }
      return (
        <g style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}>
          <text
            id={`${id}-text`}
            style={{ pointerEvents: 'none', fontFamily, fontSize }}
            fill={fill}
            dy="0.35em" // Vertical alignment for the first line
          >
            {displayText.split('\n').map((line, index) => (
              <tspan x="0" dy={index === 0 ? '0em' : '1.2em'} key={index}>
                {line}
              </tspan>
            ))}
          </text>
        </g>
      );
    };
    // Update chart options when dark mode changes
  useEffect(() => {
    setChartOptions(getChartOptions(maxAbsInFlow_heatMap, localStorage.getItem('dark-mode')));
  }, [maxAbsInFlow_heatMap, localStorage.getItem('dark-mode')]);



  function getChartOptions(maxAbsInFlow_heatMap, isDarkMode) {
    const gradientStops = [
  {
    from: -maxAbsInFlow_heatMap,
    to: 0.000001,
    color: '#E77975', // Light red for negative values
    name: language === 'en' ? 'Flow Out': '资金流出',
  },
  {
    from: 0.00001,
    to: maxAbsInFlow_heatMap,
    color: '#398235', // Green for positive values
    name: language === 'en'? 'Flow In':'资金流入',
  },
];
    return {
    chart: {
    height: 800,
    type: 'heatmap',
  },
  dataLabels: {
    enabled: false,
    formatter: function(value, opts) {
      // Display the original value
      const originalValue = opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex].y.toFixed(2);
      return originalValue;
    },
  },
  xaxis: {
    labels: {
      rotateAlways: true,
      rotate: -90, // Rotate the labels vertically
    },
  },
  stroke: {
    show: true,
    curve: 'round',
    lineCap: 'round',
    colors: localStorage.getItem('dark-mode') === 'dark'?['#000000']:['#FFFFFF'], // White for dark mode, black for light mode
    width: 2,
    dashArray: 0,
},
  plotOptions: {
    heatmap: {
      radius:3,
      reverseNegativeShade: true,
      shadeIntensity: 0.55,
      colorScale: {
        ranges: gradientStops,
        min: -maxAbsInFlow_heatMap,
        max: maxAbsInFlow_heatMap,
        legend: {
          show: false,
        },
      },
      distributed: false,
      useFillColorAsStroke: false,
    },
  },
  tooltip: {
   enabled:true,
    y: {
      formatter: function(value, { series, seriesIndex, dataPointIndex, w }) {
        // Display the original value in the tooltip
        return w.config.series[seriesIndex].data[dataPointIndex].originalY.toFixed(2);
      }
    }
  },
  responsive: [
    {
      breakpoint: 432,
      options: {
        chart: {
          height: 760,
          width: 400,
        },
      },
    },
    {
      breakpoint: 1800,
      options: {
        chart: {
          height: 760,
        },
      },
    },
    {
      breakpoint: 2000,
      options: {
        chart: {
          height: 770,
        },
      },
    },
  ],
}};


   if (isLoadingTreeMap || isLoadingHeatMap || isLoadingTopIndividual) return <div>Loading...</div>;
   if (isErrorTreeMap || isErrorHeatMap || isErrorTopIndividual) return <div>Error loading data</div>;
  return (
  <div>
  <div className="flex items-center  bg-whiter dark:bg-meta-4 w-full">
    <button
      className={`flex-1 py-3 text-base font-medium  shadow-card hover:bg-white hover:shadow-card dark:hover:bg-boxdark ${market === 'US' ? 'bg-white dark:bg-boxdark text-primary dark:text-primary' : 'text-black dark:text-white '}`}
      onClick={() => setMarkt('US')}
    >
      {language === 'en' ? 'US Market' : '美股'}
    </button>
    <button
      className={`flex-1 py-3 text-base font-medium shadow-card hover:bg-white hover:shadow-card  dark:hover:bg-boxdark ${market === 'HK' ? 'bg-white dark:bg-boxdark text-primary dark:text-primary' : 'text-black dark:text-white'}`}
      onClick={() => setMarkt('HK')}
    >
      {language === 'en' ? 'HK Market' : '港股'}
    </button>
  </div>
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between sm:flex-nowrap mt-5">
      <h4 className="text-xl font-semibold text-black dark:text-white">
            {language === 'en'
                        ? 'Industry Capital Flow Heat Map ($M)'
                        : '行业资金流热力图 ($M)'
      }
          </h4>

      <div className="flex w-full max-w-45 justify-end">
      <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
        <button
          className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${industry_granularity === 'day' ? 'bg-white dark:bg-boxdark' : ''}`}
          onClick={() => setIndustryGranularity('day')}
        >
          {language === 'en'
                        ? 'Day'
                        : '日'
      }
        </button>
        <button
          className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${industry_granularity === 'week' ? 'bg-white dark:bg-boxdark' : ''}`}
          onClick={() => setIndustryGranularity('week')}
        >
          {language === 'en'
                        ? 'Week'
                        : '周'
      }
        </button>
        <button
          className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${industry_granularity === 'month' ? 'bg-white dark:bg-boxdark' : ''}`}
          onClick={() => setIndustryGranularity('month')}
        >
          {language === 'en'
                        ? 'Month'
                        : '月'
      }
        </button>
      </div>
    </div>
      </div>

      <div className='mb-3'>
        <div id="chartHeatMap">

          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="heatmap"
            height={400}

          />
          {/* CSS to hide ApexCharts menu button */}
        <style>
        {`
          .apexcharts-menu-icon {
            display: none !important;
          }
        `},

        </style>
        </div>
      </div>
      <div>
     <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">

      <h4 className="text-xl font-semibold text-black dark:text-white">
      {language === 'en'
                        ? 'Individual Stock Capital Flow Heat Map ($M)'
                        : '个股资金流热力图 ($M)'
      }

      </h4>
      <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${individual_granularity === 'day' ? 'bg-white dark:bg-boxdark' : ''}`}
              onClick={() => setIndividualGranularity('day')}
            >
              {language === 'en'
                        ? 'Day'
                        : '日'
      }
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${individual_granularity === 'week' ? 'bg-white dark:bg-boxdark' : ''}`}
              onClick={() => setIndividualGranularity('week')}
            >
              {language === 'en'
                        ? 'Week'
                        : '周'
            }
            </button>
            <button
              className={`rounded py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark ${individual_granularity === 'month' ? 'bg-white dark:bg-boxdark' : ''}`}
              onClick={() => setIndividualGranularity('month')}
            >
              {language === 'en'
                        ? 'Month'
                        : '月'
      }
            </button>
          </div>
        </div>
      </div>
      {/* reviz */}
<div className="flex items-start">
  <TreeMap
    height={800}
    width={1200}
    data={treemapState}
    series={<TreeMapSeries colorScheme={usageColorScheme} label={<CustomTreeMapLabel/>} rect={<CustomTreeMapRect/>} />}
  />

<div>

  {/* Green block of text */}
  <div className="ml-5 mt-6">
      <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #ddd' }} />

    <h2 className="text-lg font-semibold text-primary" style={{ color: '#45CB59' }}>
    {language === 'en'
                        ? 'Top Capital Flow In'
                        : '资金流入排行'
    }
    </h2>
    <table className="min-w-full table-auto">
      <tbody>
        {inFlowItems.map((item, index) => (
          <tr key={index} className="border-b">
            <td className="px-2 py-1">
              <span
                className="flex h-4 w-4 items-center justify-center rounded-full border"
                style={{ borderColor: '#45CB59' }}
              >
                <span
                  className="block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: '#45CB59' }}
                ></span>
              </span>
            </td>
            <td className="px-2 py-1 text-left">
              <p className="font-semibold" style={{ color: '#45CB59' }}>
                {market === 'HK'? item.name:item.code.split('.')[1]}
              </p>
            </td>
            <td className="px-2 py-1 text-right">
              <p className="text-sm font-medium" style={{ color: '#45CB59' }}>
                +${item.flow}M
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="ml-5 ">
    {/* Separator */}
    <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #ddd' }} />

    {/* Red block of text */}
    <div>
      <h2 className="text-lg font-semibold text-primary" style={{ color: '#F87171' }}>
      {language === 'en'
                        ? 'Top Capital Flow Out'
                        : '资金流出排行'
    }
      </h2>
      <table className="min-w-full table-auto">
        <tbody>
          {outFlowItems.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-2 py-1">
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full border"
                  style={{ borderColor: '#F87171' }}
                >
                  <span
                    className="block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: '#F87171' }}
                  ></span>
                </span>
              </td>
              <td className="px-2 py-1 text-left">
                <p className="font-semibold" style={{ color: '#F87171' }}>
                  {market === 'HK'? item.name:item.code.split('.')[1]}
                </p>
              </td>
              <td className="px-2 py-1 text-right">
                <p className="text-sm font-medium" style={{ color: '#F87171' }}>
                  ${item.flow}M
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
      </div>
    </div>
    </div>
  );
};

export default ChartHeatMap;
