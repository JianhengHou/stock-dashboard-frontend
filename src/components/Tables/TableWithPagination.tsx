import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface StrategyDataProps {
  strategyData: (string | number)[][];
}

const processStrategyData = (data: (string | number)[][]) => {
  return data.map(item => ({
    code: item[0],
    name: item[1],
    pct_change: item[2],
    counts: item[3]
  }));
};

const formatPctChange = (value: number | string | undefined) => {
  if (value === undefined || value === null) {
    return "";
  }
  const formattedValue = `$${Math.abs(Number(value)).toFixed(2)}%`;
  if (Number(value) > 0) {
    return `+${formattedValue}`;
  } else if (Number(value) < 0) {
    return `-${formattedValue}`;
  } else {
    return formattedValue;
  }
};

const TableWithPagination: React.FC<StrategyDataProps> = ({ strategyData, displaySelectedStrategy }) => {
  const processedData = processStrategyData(strategyData);
  const defaultLang = 'en';
  const language = localStorage.getItem('language') || defaultLang;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const pageRangeDisplayed = 5;

  // Calculate the current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate page numbers to display
  const startPage = Math.max(1, currentPage - Math.floor(pageRangeDisplayed / 2));
  const endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const navigate = useNavigate();
  const handleNavigate = (searchCode: string) => {
    navigate(`/dashboard?code=${searchCode}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {language === 'en'? 'Top Tickers' : '股票列表'} {strategyData ? displaySelectedStrategy: ''}
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-primary dark:bg-primary dark: text-white sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {language === 'en'? 'Ticker' : '代码'}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {language === 'en'? 'Stock Name' : '股票名称'}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {language === 'en'? '% Change' : '% 股价变化'}
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {language === 'en'? '# Counts' : '天数统计'}
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {language === 'en'? 'Dashboard' : '查看仪表盘'}
            </h5>
          </div>
        </div>

        {(currentItems.length === 0 ? Array.from({ length: itemsPerPage }) : currentItems).map((ticker, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === (currentItems.length === 0 ? itemsPerPage : currentItems.length) - 1
                ? ''
                : 'border-b border-stroke dark:white'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {ticker ? ticker.code : ''}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{ticker ? ticker.name : ''}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className={`${ticker && Number(ticker.pct_change) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {ticker ? formatPctChange(ticker.pct_change) : ''}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{ticker ? ticker.counts : ''}</p>
            </div>

            {ticker && (
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <button className="hover:text-primary" onClick={() => handleNavigate(ticker.code)}>
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                      fill=""
                    />
                    <path
                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {strategyData.length > 0 && (
        <div className="flex justify-center mt-4 mb-2">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 mx-1 border border-black rounded bg-primary text-white dark:text-white"
            >
              {language === 'en' ? 'Prev': '上一页'}
            </button>
          )}
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === pageNumber
                  ? 'border-black bg-primary text-white'
                  : 'border-graydark bg-white text-grey'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 mx-1 border border-black rounded bg-primary text-white dark:text-white"
            >
              {language === 'en' ? 'Next': '下一页'}

            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TableWithPagination;
