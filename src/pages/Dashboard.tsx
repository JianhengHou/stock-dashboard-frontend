import React from 'react';
import ChartFour from '../components/Charts/ChartFour';
import DefaultLayout from '../layout/DefaultLayout';
import withAuth from '../components/withAuth';
import { useLocation } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const defaultCode = "US.AAPL"; // Default ticker to show
  const searchCode = sessionStorage.getItem('selectedSearchCode') || defaultCode

  // Extract URL parameters
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const codeFromUrl = query.get('code'); // Extracting 'code' from the URL parameters


  return (
    <DefaultLayout>
        <div className="grid grid-cols-14 gap-4 md:gap-6 2xl:gap-7.5">
          <ChartFour tickerCode={codeFromUrl || searchCode}/>
        </div>
    </DefaultLayout>
  );
};
export default withAuth(Dashboard);
