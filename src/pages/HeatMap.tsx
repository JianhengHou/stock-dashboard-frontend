
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import DefaultLayout from '../layout/DefaultLayout';

import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartHeatMap from '../components/Charts/ChartHeatMap';

import ChartOne from '../components/Charts/ChartOne';
import ChartThree from '../components/Charts/ChartThree';
import ChartTwo from '../components/Charts/ChartTwo';
import ChartFour from '../components/Charts/ChartFour';
import withAuth from '../components/withAuth';



const HeatMap: React.FC = () => {
  return (
    <DefaultLayout>
        <div className="grid grid-cols-14 gap-4 md:gap-6 2xl:gap-7.5">
          <ChartHeatMap />
        </div>
    </DefaultLayout>
  );
};

export default withAuth(HeatMap);
