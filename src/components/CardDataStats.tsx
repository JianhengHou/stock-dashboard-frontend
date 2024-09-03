import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  tag: string;
  strategy: string;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  tag,
  strategy,
  selected,
  onClick,
  children,
}) => {
  return (
    <div className={`p-4 border rounded-md cursor-pointer ${selected ? 'bg-primary dark:bg-primary' : 'bg-white dark:bg-meta-4'}`}
         onClick={onClick}
    >
      <div className="flex w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-w">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
          <div>
          <h2 className="text-title-md font-bold text-black dark:text-white">
            {strategy}
          </h2>
          <span className= {`text-sm font-medium ${selected ? 'text-black dark:text-white' : ''}`}>{tag}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
