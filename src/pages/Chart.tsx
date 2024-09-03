// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
//
// import axios from 'axios';
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import ChartOne from '../components/Charts/ChartOne';
// import ChartThree from '../components/Charts/ChartThree';
// import ChartTwo from '../components/Charts/ChartTwo';
// import ChartFour from '../components/Charts/ChartFour';
// import DefaultLayout from '../layout/DefaultLayout';
//
//
// const Chart: React.FC = () => {
//   const [chartData, setChartData] = useState<(string | number)[][] | null>(null);
//   const location = useLocation();
//
//   const defaultCode = "HK.00700"; // Default ticker to show
//   const searchCode = location.search.substring(1) || defaultCode; // Use search term from state or default
//   console.log("Current Search Code:", searchCode); // Print the constant
//
//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//         const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/ticker_details_dash`,
//           {
//             params: {
//               code: searchCode,
//               months_back_to: "6"
//             }
//           }
//         );
//        const data = response.data;
//
//       setChartData(data); // Assign data to chartData
//     } catch (error) {
//       console.error(error);
//       // Handle errors gracefully
//     }
//   };
//
//   fetchData();
//   }, [searchCode]);
//
//   return (
//     <DefaultLayout>
//       {chartData ? ( // Check if chartData has data
// //       <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
//       <div className="grid grid-cols-14 gap-4 md:gap-6 2xl:gap-7.5">
//
//         <ChartFour chartData={chartData}/>
//         <ChartOne />
//         <ChartTwo />
//         <ChartThree />
//       </div>
//       ) : (
//       <div>Loading data...</div>
//     )}
//     </DefaultLayout>
//   );
// };
//
// export default Chart;

import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import ChartTwo from '../components/Charts/ChartTwo';
import ChartFour from '../components/Charts/ChartFour';
import DefaultLayout from '../layout/DefaultLayout';

const Chart: React.FC = () => {
  return (
    <DefaultLayout>
        <div className="grid grid-cols-14 gap-4 md:gap-6 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
          <ChartThree />
        </div>
    </DefaultLayout>
  );
};

export default Chart;
