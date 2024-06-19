import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import axios from 'axios';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import ChartTwo from '../components/Charts/ChartTwo';
import ChartFour from '../components/Charts/ChartFour';
import DefaultLayout from '../layout/DefaultLayout';

const Chart: React.FC = () => {
  const [chartData, setChartData] = useState({});
  const location = useLocation();

  const defaultCode = "HK.00700"; // Default ticker to show
  const searchCode = location.state?.searchCode || defaultCode; // Use search term from state or default
  console.log("Current Search Code:", searchCode); // Print the constant

  useEffect(() => {
  const fetchData = async () => {
    try {
        const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/ticker_details_dash`,
          {
            params: {
              code: searchCode,
              months_back_to: "1"
            }
          }
        );
      console.log("response data:", response.data); // Print the constant

      setChartData(response.data);
    } catch (error) {
      console.error(error);
      // Handle errors gracefully
    }
  };

  fetchData();
  }, [searchCode]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <ChartFour />
      </div>
    </DefaultLayout>
  );
};

export default Chart;
