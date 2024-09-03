import React from 'react';
import ChartFour from '../components/Charts/ChartFour';
import DefaultLayout from '../layout/DefaultLayout';
import withAuth from '../components/withAuth';

const Dashboard: React.FC = () => {
  const defaultCode = "US.AAPL"; // Default ticker to show
  const searchCode = sessionStorage.getItem('selectedSearchCode') || defaultCode
  return (
    <DefaultLayout>
        <div className="grid grid-cols-14 gap-4 md:gap-6 2xl:gap-7.5">
          <ChartFour tickerCode={searchCode}/>
        </div>
    </DefaultLayout>
  );
};
export default withAuth(Dashboard);
