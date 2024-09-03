import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import PricingTableOne from '../components/PricingTables/PricingTableOne';
import PricingTableTwo from '../components/PricingTables/PricingTableTwo';
import DefaultLayout from '../layout/DefaultLayout';

const PricingTables: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-col gap-5 md:gap-7 2xl:gap-10">
        <PricingTableTwo />
        <PricingTableOne />
      </div>
    </DefaultLayout>
  );
};

export default PricingTables;
