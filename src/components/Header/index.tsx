import React, { useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
    const navigate = useNavigate();
    const [codeDisplay, setCodeDisplay] = useState(null);
    const [filteredItems, setFilteredItems] = useState([]);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [data, setData] = useState([]);
    const defaultLang = 'en';
    const [language, setLanguage] = useState(localStorage.getItem('language') || defaultLang) ;
    const [latestUpdate, setLatestUpdate] = useState('');

    useEffect(() => {
        // This code will run only once after the initial render
        const fetchData = async () => {
            const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/fetch_all_tickers`);
            setData(response.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
    // Function to fetch the latest update timestamp
      const fetchLatestUpdate = async () => {
        try {
          const response = await axios.get(`https://9jjj44tcdg.execute-api.us-west-1.amazonaws.com/dev/latest_update`);
          setLatestUpdate(response.data); // Assume API returns { timestamp: "2024-09-14T12:34:56" }
        } catch (error) {
          console.error('Error fetching the latest update:', error);
        }
      };
    fetchLatestUpdate();
    }, []);


    // Function to handle language switch
    const handleLanguageSwitch = (lang) => {
          setLanguage(lang)
          localStorage.setItem('language', lang); // Store the selected code
          window.location.reload(); // Reload the page

    };
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setCodeDisplay(query);

        if (query.length > 0) {
            const matches = data.filter(item =>
                item[1].toLowerCase().includes(query.toLowerCase()) ||
                item[0].toLowerCase().includes(query.toLowerCase())
                // name || code
            );
            setFilteredItems(matches);
            setDropdownVisible(true);
        } else {
            setFilteredItems([]);
            setDropdownVisible(false);
        }
    };

    const handleItemClick = (item) => {
        setCodeDisplay(null)
        setFilteredItems([]);
        setDropdownVisible(false);
        const code = item
        sessionStorage.setItem('selectedSearchCode', code); // Store the selected code
        navigate(`/dashboard?code=${code}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFilteredItems([]);
        setDropdownVisible(false);
        const code = codeDisplay.toUpperCase()
        setCodeDisplay(null)
        sessionStorage.setItem('selectedSearchCode', code); // Store the selected code
        navigate(`/dashboard?code=${code}`);
    };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}


        </div>

        <div className="sm:block ml-3">
          <form onSubmit={handleSubmit}>
            <div className="relative">
                <button type="submit" className="absolute left-0 top-1/2 -translate-y-1/2">
                    <svg
                        className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                            fill=""
                        />
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                            fill=""
                        />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder={language === 'en'?"Search Code/Name Here":'输入代码/名称搜索'}
                    value={codeDisplay}
                    onChange={handleSearchChange}
                    className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"

                />
                {isDropdownVisible && (
                    <ul className="absolute left-0 right-0 mt-1 bg-white dark:bg-boxdark-2 dark:text-white shadow-lg max-h-60 overflow-y-auto">
                        {filteredItems.map((item, index) => (
                            <li
                                key={index}
                            className="flex justify-between p-2 cursor-pointer hover:bg-gray-200 items-center"
                                onClick={() => handleItemClick(item[0])}
                            >
                                {/* Code on the left */}
                            <span className="font-bold">{item[0].split('.')[1]}</span>

                            {/* Name and Market Code on the right */}
                            <div className="flex items-center ">
                                <span className="ml-2 font-bold">{item[1]}</span>
                                <span className="ml-3 font-bold">{item[0].split('.')[0]}</span>
                            </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <div className="text-right">
              <select
                value={language}
                onChange={(e) => handleLanguageSwitch(e.target.value)}
                className="px-2 py-1 rounded-xl text-boxdark dark:text-white dark:bg-boxdark"
              >
                <option value="en" className={language === 'en' ? 'text-boxdark-2' : 'text-boxdark'}>
                  EN
                </option>
                <option value="cn" className={language === 'cn' ? 'text-boxdark-2' : 'text-boxdark'}>
                  中
                </option>
              </select>
            </div>
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
            <DropdownUser />

          </ul>

          {/* <!-- User Area --> */}

          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
