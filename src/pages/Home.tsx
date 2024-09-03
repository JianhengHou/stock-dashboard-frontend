import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PricingTableOne from '../components/PricingTables/PricingTableOne';
import Swiper from 'swiper/bundle';
import 'swiper/css';


const Home: React.FC = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const defaultLang = 'en'
    const [language, setLanguage] = useState(localStorage.getItem('language') || defaultLang) ;

    // Function to handle language switch
    const handleLanguageSwitch = (lang) => {
          setLanguage(lang)
          localStorage.setItem('language', lang); // Store the selected code

    };
    useEffect(() => {
    const wowScript = document.createElement('script');
    wowScript.src = '../../assets/js/wow.min.js';
    wowScript.onload = () => {
      // @ts-ignore
      new WOW().init();
    };
    document.body.appendChild(wowScript);

    return () => {
      document.body.removeChild(wowScript);
    };
    }, []);
    // Function to toggle the menu
    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    };
    const handleSignIn = () => {
    navigate('/auth/signin'); // Redirect to login after successful verification
    };

    const pageLink = document.querySelectorAll<HTMLAnchorElement>(".ud-menu-scroll");

    pageLink.forEach((elem) => {
      elem.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        const href = elem.getAttribute("href");

        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      });
    });

    const pageLink_button = document.querySelectorAll<HTMLAnchorElement>(".ud-button-scroll");

    pageLink_button.forEach((elem) => {
      elem.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        const href = elem.getAttribute("href");

        if (href) {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });
          }
        }
      });
    });

    function onScroll(event: Event): void {
      const sections = document.querySelectorAll<HTMLAnchorElement>(".ud-menu-scroll");
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

      sections.forEach((currLink) => {
        const val = currLink.getAttribute("href");
        if (val) {
          const refElement = document.querySelector(val);
          if (refElement) {
            const scrollTopMinus = scrollPos + 17;
            if (
              refElement.offsetTop <= scrollTopMinus &&
              refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
            ) {
              document.querySelectorAll(".ud-menu-scroll").forEach(el => el.classList.remove("active"));
              currLink.classList.add("active");
            } else {
              currLink.classList.remove("active");
            }
          }
        }
      });
    }

    window.document.addEventListener("scroll", onScroll);

   const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

   useEffect(() => {
    const testimonialSwiper = new Swiper('.testimonial-carousel', {
      slidesPerView: 1,
      spaceBetween: 30,

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });

    // Clean up Swiper instance when the component unmounts
    return () => {
      if (testimonialSwiper) testimonialSwiper.destroy();
    };
  }, []);



  return (
     <>
  <div>
   <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          AlphaHood
        </title>
        <link
          rel="shortcut icon"
          href="../../assets/images/favicon.png"
          type="image/x-icon"
        />
        <link rel="stylesheet" href="../../assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="../../assets/css/animate.css" />
        <link rel="stylesheet" href="../../assets/css/tailwind.css" />
   <div className="ud-header fixed top-0 z-40 flex w-full items-center bg-primary h-17">
   <div className="container">
      <div className="relative flex items-center justify-between">
         {/* Logo */}
         <div className="w-80 max-w-full px-4">
            <a href="/" className="block py-4">
            <img
               src="../../assets/images/logo/alphahood-logo.svg"
               alt="logo"
               className="w-full"
               />
            </a>
         </div>
         {
         language  === 'cn'?
          <div className="relative flex items-center justify-between w-25"></div>
         : <></>
         }
         {/* Navigation and Sign-In button for Desktop */}
         <div className="flex w-full items-center justify-between ">
            <div>
               <button
                  id="navbarToggler"
                  className="absolute -right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                  onClick={toggleMenu}
                  >
               <span
                  className="relative my-[6px] block h-[2px] w-[30px] bg-white"
                  ></span>
               <span
                  className="relative my-[6px] block h-[2px] w-[30px] bg-white"
                  ></span>
               <span
                  className="relative my-[6px] block h-[2px] w-[30px] bg-white"
                  ></span>
               </button>
               <nav
                  id="navbarCollapse"
                  className={`absolute -right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6 ${
            isMenuOpen ? '' : 'hidden'}`}
               >
                  <ul className="blcok lg:flex 2xl:ml-25">
                     <li className="group relative">
                        <a
                           href="#home"
                           className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                           >
                        {language === 'en'
                        ? 'Home'
                        : '主页'
                        }
                        </a>
                     </li>
                     <li className="group relative">
                        <a
                           href="#about"
                           className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                           >
                        {language === 'en'
                        ? 'About'
                        : '关于'
                        }
                        </a>
                     </li>
                     <li className="group relative">
                        <a
                           href="#overview"
                           className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                           >
                        {language === 'en'
                        ? 'Features'
                        : '功能'
                        }
                        </a>
                     </li>
                     <li className="group relative">
                        <a
                           href="#pricing"
                           className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                           >
                        {language === 'en'
                        ? 'Pricing'
                        : '定价'
                        }
                        </a>
                     </li>
                     <li className="group relative">
                        <a
                           href="#team"
                           className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                           >
                        {language === 'en'
                        ? 'Team'
                        : '团队'
                        }
                        </a>
                     </li>
                     <li className="group relative">
                        <a
                           href="#contact"
                           className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:ml-7 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10"
                           >
                        {language === 'en'
                        ? 'Contact'
                        : '联系'
                        }
                        </a>
                     </li>
                  </ul>
               </nav>
            </div>
            <div className="flex ">
              <button
                onClick={() => handleLanguageSwitch('en')}
                className={`px-1 py-1 lg:px-2 rounded-xl text-sm lg:text-base ${
                  language === 'en' ? 'text-[#C5CDFB]' : 'text-white'
                }`}
              >
                EN
              </button>
              <a
              className="text-white"
              >/</a>
              <button
                onClick={() => handleLanguageSwitch('cn')}
                className={`px-1 py-1 lg:px-2 rounded-xl text-sm lg:text-base ${
                  language === 'cn' ? 'text-[#C5CDFB]' : 'text-white'
                }`}
              >
                中
              </button>
            </div>
            <div className="flex items-center justify-end pr-10 lg:pr-0">

               <div className="flex items-center justify-end">
                  <a
                     href="/auth/signin"
                     className="loginBtn px-2 py-1 text-sm lg:text-base font-medium text-white hover:opacity-70 border border-white rounded-xl lg:px-5 lg:w-auto flex-shrink-0"

                     >
                  {language === 'en'
                        ? 'Sign In'
                        : '登录'
                  }
                  </a>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

   <div id="home" className="relative z-30 overflow-hidden bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">

              <div
                className="hero-content wow fadeInUp mx-auto max-w-[980px] text-center"
                data-wow-delay=".2s"
              >
                <h1
                  className="mb-6 text-3xl font-bold leading-snug text-white sm:text-3xl sm:leading-snug lg:text-5xl lg:leading-[1.2]"
                >
                  {language === 'en'
                    ? 'US/HK Stock Market Capital-flow Analysis & Strategy Tools'
                    : '美港股资金分析策略工具'}
                </h1>
                <p
                  className="mx-auto mb-9 max-w-[600px] text-lg font-medium text-white sm:text-sm sm:leading-[1.44]"
                >
                {language === 'en'
                    ? '"The dynamics of capital flow in the market often imply the timing and direction of decisions made by the smart money."'
                    : '"股票市场特定交易资金流动的动态往往反应聪明资金复杂分析决策后行动的时机和方向"'
                    }
                </p>
                <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <a
                      href="#about"
                      className="ud-button-scroll inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2 hover:text-body-color"
                    >
                      {language === 'en'
                        ? 'Know More'
                        : '了解更多'
                        }
                    </a>
                  </li>
                  <li>
                    <a
                      href="#pricing"
                      className="ud-button-scroll inline-flex items-center justify-center rounded-md bg-white px-7 py-[14px] text-center text-base font-medium text-dark shadow-1 transition duration-300 ease-in-out hover:bg-gray-2 hover:text-body-color"
                    >
                      {language === 'en'
                        ? 'Try It Now'
                        : '立即试用'
                      }
                    </a>
                  </li>
                </ul>
                <div>
                  <p className="mb-4 text-center text-base font-medium text-white">
                    {language === 'en'
                        ? 'Our team members from the background of'
                        : '我们的团队来自以下背景'
                    }
                  </p>
                  <div
                    className="wow fadeInUp flex items-center justify-center gap-4 text-center"
                    data-wow-delay=".3s"
                  >
                    <a
                      href="https://github.com/uideck/play-bootstrap/"
                      className="text-white/60 duration-300 ease-in-out hover:text-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg
                        className="fill-current"
                        width="41"
                        height="32"
                        viewBox="0 0 41 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask
                          id="mask0_2005_10788"
                          style={{ maskType: 'luminance' }}
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="41"
                          height="32"
                        >
                          <path
                            d="M0.521393 0.0454102H40.5214V31.9174H0.521393V0.0454102Z"
                          />
                        </mask>
                        <g mask="url(#mask0_2005_10788)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.82951 0.048584C6.54719 0.048584 4.85835 2.04626 4.93395 4.21266C5.00655 6.29398 4.91223 8.98962 4.23366 11.1879C3.55264 13.3923 2.4017 14.7893 0.521393 14.9686V16.993C2.4017 17.1727 3.55264 18.5689 4.23358 20.7737C4.91223 22.9719 5.00647 25.6676 4.93387 27.7489C4.85827 29.915 6.54711 31.913 8.82983 31.913H32.2163C34.4987 31.913 36.1872 29.9153 36.1116 27.7489C36.039 25.6676 36.1333 22.9719 36.8119 20.7737C37.4929 18.5689 38.641 17.1721 40.5214 16.993V14.9686C38.6411 14.7889 37.493 13.3927 36.8119 11.1879C36.1332 8.9899 36.039 6.29398 36.1116 4.21266C36.1872 2.04654 34.4987 0.048584 32.2163 0.048584H8.82951ZM27.6401 19.6632C27.6401 22.6463 25.415 24.4554 21.7224 24.4554H15.4366C15.2568 24.4554 15.0844 24.3839 14.9572 24.2568C14.8301 24.1297 14.7587 23.9572 14.7587 23.7774V8.18422C14.7587 8.00442 14.8301 7.83194 14.9572 7.70482C15.0844 7.57766 15.2568 7.50626 15.4366 7.50626H21.6866C24.7656 7.50626 26.7863 9.17406 26.7863 11.7347C26.7863 13.5319 25.427 15.1409 23.6952 15.4228V15.5165C26.0526 15.7751 27.6401 17.408 27.6401 19.6632ZM21.037 9.65538H17.453V14.7179H20.4716C22.8052 14.7179 24.092 13.7782 24.092 12.0986C24.0917 10.5245 22.9855 9.65538 21.037 9.65538ZM17.453 16.7265V22.3055H21.1689C23.5986 22.3055 24.8856 21.3306 24.8856 19.4984C24.8856 17.6663 23.5625 16.7263 21.0126 16.7263L17.453 16.7265Z"
                          />
                        </g>
                      </svg>
                     </a>

                    <a
                        href="https://github.com/TailGrids/play-tailwind/"
                        className="text-white/60 duration-300 ease-in-out hover:text-white"
                        target="_blank"
                      >
                        <svg
                          className="fill-current"
                          width="41"
                          height="26"
                          viewBox="0 0 41 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_2005_10783"
                            style={{ maskType: 'luminance' }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="41"
                            height="26"
                          >
                            <path
                              d="M0.521393 0.949463H40.5214V25.0135H0.521393V0.949463Z"
                            />
                          </mask>
                          <g mask="url(#mask0_2005_10783)">
                            <path
                              d="M20.5214 0.980713C15.1882 0.980713 11.8546 3.64743 10.5214 8.98071C12.5214 6.31399 14.8546 5.31399 17.5214 5.98071C19.043 6.36103 20.1302 7.46495 21.3342 8.68667C23.295 10.6771 25.5642 12.9807 30.5214 12.9807C35.8546 12.9807 39.1882 10.314 40.5214 4.98071C38.5214 7.64743 36.1882 8.64743 33.5214 7.98071C31.9998 7.60039 30.9126 6.49651 29.7086 5.27479C27.7478 3.28431 25.4786 0.980713 20.5214 0.980713ZM10.5214 12.9807C5.18819 12.9807 1.85459 15.6474 0.521393 20.9807C2.52139 18.314 4.85459 17.314 7.52139 17.9807C9.04299 18.361 10.1302 19.465 11.3342 20.6867C13.295 22.6771 15.5642 24.9807 20.5214 24.9807C25.8546 24.9807 29.1882 22.314 30.5214 16.9807C28.5214 19.6474 26.1882 20.6474 23.5214 19.9807C21.9998 19.6004 20.9126 18.4965 19.7086 17.2748C17.7478 15.2843 15.4786 12.9807 10.5214 12.9807Z"
                            />
                          </g>
                        </svg>
                    </a>

                    <a
                        href="https://github.com/NextJSTemplates/play-nextjs"
                        className="text-white/60 duration-300 ease-in-out hover:text-white"
                        target="_blank"
                    >
                        <svg
                          className="fill-current"
                          width="41"
                          height="36"
                          viewBox="0 0 41 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M40.5214 17.9856C40.5214 15.3358 37.203 12.8245 32.1154 11.2673C33.2894 6.08177 32.7678 1.95622 30.4686 0.63539C29.9386 0.325566 29.3186 0.178806 28.6422 0.178806V1.99699C29.017 1.99699 29.3186 2.07037 29.5714 2.20897C30.6802 2.84493 31.1614 5.26645 30.7862 8.38101C30.6966 9.14741 30.5498 9.95457 30.3706 10.7781C28.7726 10.3867 27.0278 10.0851 25.1934 9.88937C24.0926 8.38101 22.951 7.01125 21.8014 5.81273C24.4594 3.34229 26.9542 1.98883 28.6502 1.98883V0.170654C26.4082 0.170654 23.473 1.7687 20.505 4.54081C17.5374 1.78501 14.6022 0.203266 12.3598 0.203266V2.02145C14.0478 2.02145 16.5506 3.36673 19.2086 5.82089C18.0674 7.01941 16.9258 8.38101 15.8414 9.88937C13.9986 10.0851 12.2538 10.3867 10.6558 10.7862C10.4686 9.97089 10.3298 9.18001 10.2318 8.42177C9.84859 5.30721 10.3218 2.88569 11.4222 2.24157C11.667 2.09483 11.985 2.0296 12.3598 2.0296V0.211422C11.675 0.211422 11.0554 0.358178 10.5174 0.668006C8.22619 1.98883 7.71259 6.10626 8.89499 11.2754C3.82339 12.8409 0.521393 15.3439 0.521393 17.9856C0.521393 20.6354 3.8398 23.1466 8.9274 24.7039C7.7534 29.8894 8.27499 34.0149 10.5742 35.3358C11.1042 35.6456 11.7242 35.7923 12.409 35.7923C14.651 35.7923 17.5862 34.1943 20.5542 31.4222C23.5218 34.178 26.457 35.7597 28.699 35.7597C29.3842 35.7597 30.0038 35.613 30.5418 35.3031C32.833 33.9823 33.3466 29.8649 32.1642 24.6957C37.2194 23.1385 40.5214 20.6273 40.5214 17.9856ZM29.9058 12.5473C29.6042 13.5991 29.229 14.6835 28.805 15.7679C28.471 15.1156 28.1202 14.4634 27.737 13.8111C27.3622 13.1588 26.9626 12.5229 26.563 11.9032C27.7206 12.0745 28.8378 12.2864 29.9058 12.5473ZM26.1718 21.2306C25.5358 22.3313 24.8834 23.3749 24.2066 24.3451C22.9918 24.4511 21.7606 24.5082 20.5214 24.5082C19.2902 24.5082 18.059 24.4511 16.8526 24.3533C16.1758 23.3831 15.5154 22.3476 14.8794 21.2551C14.2598 20.187 13.697 19.1026 13.1834 18.01C13.689 16.9175 14.2598 15.8249 14.871 14.7569C15.507 13.6562 16.1594 12.6126 16.8362 11.6423C18.051 11.5363 19.2822 11.4793 20.5214 11.4793C21.7526 11.4793 22.9838 11.5363 24.1902 11.6342C24.867 12.6044 25.5274 13.6399 26.1634 14.7324C26.783 15.8005 27.3458 16.8849 27.8594 17.9774C27.3458 19.07 26.783 20.1625 26.1718 21.2306ZM28.805 20.1707C29.2454 21.2632 29.6206 22.3557 29.9302 23.4157C28.8622 23.6766 27.737 23.8967 26.571 24.0679C26.9706 23.4401 27.3702 22.796 27.7454 22.1356C28.1202 21.4833 28.471 20.8229 28.805 20.1707ZM20.5378 28.8702C19.7794 28.0875 19.021 27.2151 18.271 26.2611C19.005 26.2938 19.755 26.3182 20.5134 26.3182C21.2798 26.3182 22.0378 26.3019 22.7798 26.2611C22.0462 27.2151 21.2878 28.0875 20.5378 28.8702ZM14.4718 24.0679C13.3138 23.8967 12.197 23.6847 11.129 23.4238C11.4306 22.3721 11.8054 21.2877 12.2294 20.2033C12.5638 20.8555 12.9142 21.5078 13.2974 22.1601C13.6806 22.8123 14.0722 23.4483 14.4718 24.0679ZM20.497 7.10093C21.255 7.88365 22.0134 8.75605 22.7634 9.70998C22.0298 9.67737 21.2798 9.65293 20.5214 9.65293C19.755 9.65293 18.9966 9.66922 18.2546 9.70998C18.9886 8.75605 19.747 7.88365 20.497 7.10093ZM14.4634 11.9032C14.0642 12.531 13.6646 13.1751 13.2894 13.8356C12.9142 14.4878 12.5638 15.1401 12.2294 15.7923C11.7894 14.6998 11.4142 13.6073 11.1042 12.5473C12.1726 12.2946 13.2974 12.0745 14.4634 11.9032ZM7.08459 22.1111C4.19859 20.88 2.33139 19.2657 2.33139 17.9856C2.33139 16.7055 4.19859 15.083 7.08459 13.86C7.78579 13.5583 8.55219 13.2893 9.34339 13.0365C9.80779 14.6346 10.4194 16.2979 11.1778 18.0019C10.4278 19.6978 9.82419 21.3529 9.36779 22.9428C8.56059 22.69 7.79419 22.4128 7.08459 22.1111ZM11.4714 33.7622C10.3626 33.1262 9.8814 30.7047 10.2566 27.5901C10.3462 26.8237 10.493 26.0166 10.6722 25.1931C12.2702 25.5844 14.015 25.8861 15.8494 26.0818C16.9502 27.5901 18.0918 28.9599 19.2414 30.1584C16.5834 32.6289 14.0886 33.9823 12.3926 33.9823C12.0258 33.9742 11.7158 33.9008 11.4714 33.7622ZM30.811 27.5494C31.1942 30.6639 30.721 33.0855 29.6206 33.7296C29.3758 33.8763 29.0578 33.9415 28.683 33.9415C26.995 33.9415 24.4922 32.5963 21.8342 30.1421C22.9754 28.9436 24.117 27.582 25.2014 26.0736C27.0442 25.8779 28.789 25.5763 30.387 25.1768C30.5742 26.0003 30.721 26.7911 30.811 27.5494ZM33.9498 22.1111C33.2486 22.4128 32.4822 22.6819 31.6914 22.9346C31.2266 21.3366 30.615 19.6733 29.857 17.9693C30.607 16.2734 31.2102 14.6183 31.667 13.0284C32.4742 13.2811 33.2406 13.5583 33.9582 13.86C36.8442 15.0912 38.7114 16.7055 38.7114 17.9856C38.7034 19.2657 36.8362 20.8881 33.9498 22.1111Z"
                          />
                          <path
                            d="M20.5134 21.7133C22.5714 21.7133 24.2394 20.0451 24.2394 17.9873C24.2394 15.9294 22.5714 14.2612 20.5134 14.2612C18.4558 14.2612 16.7874 15.9294 16.7874 17.9873C16.7874 20.0451 18.4558 21.7133 20.5134 21.7133Z"
                          />
                        </svg>
                    </a>

                    <a
                            href="https://github.com/TailGrids/play-astro/"
                            className="text-white/60 duration-300 ease-in-out hover:text-white"
                            target="_blank"
                          >
                            <svg
                              className="mt-0.5 fill-current"
                              width="30"
                              height="38"
                              viewBox="0 0 30 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_2412_2096)">
                                <path
                                  d="M9.54022 32.0145C7.86872 30.4866 7.38074 27.2761 8.07717 24.9502C9.28468 26.4166 10.9578 26.8812 12.6908 27.1434C15.3662 27.548 17.9937 27.3967 20.479 26.1739C20.7633 26.0338 21.0261 25.8477 21.3368 25.6591C21.57 26.3357 21.6306 27.0187 21.5492 27.7139C21.3511 29.407 20.5086 30.7148 19.1685 31.7062C18.6326 32.1027 18.0656 32.4572 17.5121 32.8311C15.8119 33.9803 15.3519 35.3278 15.9907 37.2877C16.0059 37.3358 16.0195 37.3835 16.0538 37.5C15.1857 37.1114 14.5516 36.5456 14.0684 35.8018C13.5581 35.017 13.3153 34.1486 13.3026 33.209C13.2962 32.7518 13.2962 32.2905 13.2347 31.8397C13.0845 30.7407 12.5686 30.2486 11.5967 30.2203C10.5992 30.1912 9.81018 30.8078 9.60094 31.779C9.58497 31.8535 9.5618 31.9271 9.53863 32.0137L9.54022 32.0145Z"
                                />
                                <path
                                  d="M0 24.5627C0 24.5627 4.94967 22.1515 9.91317 22.1515L13.6555 10.5697C13.7956 10.0096 14.2046 9.62894 14.6665 9.62894C15.1283 9.62894 15.5374 10.0096 15.6775 10.5697L19.4198 22.1515C25.2984 22.1515 29.333 24.5627 29.333 24.5627C29.333 24.5627 20.9256 1.65922 20.9092 1.61326C20.6679 0.936116 20.2605 0.5 19.7113 0.5H9.62256C9.07337 0.5 8.68245 0.936116 8.42473 1.61326C8.40654 1.65835 0 24.5627 0 24.5627Z"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_2412_2096">
                                  <rect
                                    width="29.3925"
                                    height="37"
                                    transform="translate(0 0.5)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                    </a>

                    <a
                            href="https://github.com/NextJSTemplates/play-nextjs"
                            className="text-white/60 duration-300 ease-in-out hover:text-white"
                            target="_blank"
                          >
                            <svg
                              className="fill-current"
                              width="41"
                              height="40"
                              viewBox="0 0 41 40"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.1914 0.0107542C19.1054 0.0185659 18.8322 0.0459068 18.5862 0.0654364C12.911 0.577104 7.59499 3.63931 4.22819 8.34588C2.35339 10.9628 1.15419 13.9313 0.700995 17.0755C0.540995 18.173 0.521393 18.4972 0.521393 19.9854C0.521393 21.4735 0.540995 21.7977 0.700995 22.8952C1.78699 30.3984 7.12619 36.7025 14.3678 39.0382C15.6646 39.4561 17.0314 39.7412 18.5862 39.9131C19.1914 39.9795 21.8082 39.9795 22.4138 39.9131C25.097 39.6163 27.3702 38.9523 29.6122 37.8078C29.9562 37.6321 30.0226 37.5852 29.9754 37.5462C29.9442 37.5227 28.4798 35.5581 26.7218 33.1833L23.527 28.8673L19.5234 22.9421C17.3206 19.6846 15.5082 17.0208 15.4926 17.0208C15.477 17.0169 15.4614 19.6495 15.4534 22.864C15.4418 28.4924 15.4378 28.7189 15.3678 28.8517C15.2662 29.0431 15.1878 29.1212 15.0238 29.2071C14.899 29.2696 14.7894 29.2813 14.1998 29.2813H13.5242L13.3442 29.1681C13.227 29.0938 13.1414 28.9962 13.0826 28.8829L13.0006 28.7072L13.0086 20.8759L13.0202 13.0407L13.1414 12.8884C13.2038 12.8064 13.3366 12.7009 13.4302 12.6502C13.5906 12.572 13.653 12.5642 14.3286 12.5642C15.1254 12.5642 15.2582 12.5955 15.4654 12.822C15.5238 12.8845 17.6914 16.1498 20.285 20.083C22.8786 24.0162 26.425 29.3868 28.167 32.0232L31.331 36.8158L31.491 36.7103C32.909 35.7885 34.4086 34.4761 35.5962 33.1091C38.123 30.207 39.7518 26.6683 40.2986 22.8952C40.459 21.7977 40.4786 21.4735 40.4786 19.9854C40.4786 18.4972 40.459 18.173 40.2986 17.0755C39.213 9.57232 33.8738 3.26825 26.6322 0.93254C25.355 0.518516 23.9958 0.233389 22.4722 0.0615304C22.0974 0.0224718 19.5158 -0.0204928 19.1914 0.0107542ZM27.3702 12.0955C27.5578 12.1892 27.7102 12.3689 27.765 12.5564C27.7962 12.658 27.8038 14.8296 27.7962 19.7237L27.7842 26.7464L26.5462 24.8482L25.3042 22.9499V17.845C25.3042 14.5445 25.3198 12.6892 25.343 12.5994C25.4058 12.3806 25.5422 12.2088 25.7298 12.1072C25.8902 12.0252 25.9486 12.0174 26.5618 12.0174C27.1398 12.0174 27.2414 12.0252 27.3702 12.0955Z"
                              />
                            </svg>
                    </a>
                  </div>
                </div>
              </div>
          </div>

          <div className="w-full px-4">
            <div
              className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
              data-wow-delay=".25s"
            >
              <div className="mt-16">
                <img
                  src={language === 'en'?"../../assets/images/tutorial/cover-EN-test.jpg":"../../assets/images/tutorial/cover-CN-test.jpg"}

                  alt="hero"
                  className="mx-auto max-w-full rounded-t-xl rounded-tr-xl"
                />
              </div>
              <div className="absolute -left-9 bottom-0 z-[-1]">
                <svg
                  width="134"
                  height="106"
                  viewBox="0 0 134 106"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="1.66667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 1.66667 104)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 16.3333 104)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 31 104)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 45.6667 104)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 60.3333 104)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 88.6667 104)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 117.667 104)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 74.6667 104)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 103 104)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 132 104)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="89.3333"
                    r="1.66667"
                    transform="rotate(-90 1.66667 89.3333)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="89.3333"
                    r="1.66667"
                    transform="rotate(-90 16.3333 89.3333)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="89.3333"
                    r="1.66667"
                    transform="rotate(-90 31 89.3333)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="89.3333"
                    r="1.66667"
                    transform="rotate(-90 45.6667 89.3333)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 60.3333 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 88.6667 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 117.667 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 74.6667 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 103 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 132 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="74.6673"
                    r="1.66667"
                    transform="rotate(-90 1.66667 74.6673)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="31.0003"
                    r="1.66667"
                    transform="rotate(-90 1.66667 31.0003)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 16.3333 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="31.0003"
                    r="1.66667"
                    transform="rotate(-90 16.3333 31.0003)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 31 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="31.0003"
                    r="1.66667"
                    transform="rotate(-90 31 31.0003)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 45.6667 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="31.0003"
                    r="1.66667"
                    transform="rotate(-90 45.6667 31.0003)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 60.3333 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 60.3333 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 88.6667 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 88.6667 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 117.667 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 117.667 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 74.6667 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 74.6667 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 103 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 103 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 132 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 132 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 1.66667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 1.66667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 16.3333 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 16.3333 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 31 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 31 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 45.6667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 45.6667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 60.3333 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 60.3333 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 88.6667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 88.6667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 117.667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 117.667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 74.6667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 74.6667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 103 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 103 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 132 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 132 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="45.3336"
                    r="1.66667"
                    transform="rotate(-90 1.66667 45.3336)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="1.66683"
                    r="1.66667"
                    transform="rotate(-90 1.66667 1.66683)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="45.3336"
                    r="1.66667"
                    transform="rotate(-90 16.3333 45.3336)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="1.66683"
                    r="1.66667"
                    transform="rotate(-90 16.3333 1.66683)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="45.3336"
                    r="1.66667"
                    transform="rotate(-90 31 45.3336)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="1.66683"
                    r="1.66667"
                    transform="rotate(-90 31 1.66683)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="45.3336"
                    r="1.66667"
                    transform="rotate(-90 45.6667 45.3336)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="1.66683"
                    r="1.66667"
                    transform="rotate(-90 45.6667 1.66683)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 60.3333 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 60.3333 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 88.6667 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 88.6667 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 117.667 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 117.667 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 74.6667 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 74.6667 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 103 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 103 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 132 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 132 1.66707)"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="absolute -right-6 -top-6 z-[-1]">
                <svg
                  width="134"
                  height="106"
                  viewBox="0 0 134 106"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="1.66667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 1.66667 104)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 16.3333 104)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 31 104)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 45.6667 104)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 60.3333 104)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 88.6667 104)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 117.667 104)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 74.6667 104)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 103 104)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="104"
                    r="1.66667"
                    transform="rotate(-90 132 104)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="89.3333"
                    r="1.66667"
                    transform="rotate(-90 1.66667 89.3333)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="89.3333"
                    r="1.66667"
                    transform="rotate(-90 16.3333 89.3333)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="89.3333"
                    r="1.66667"
                    transform="rotate(-90 31 89.3333)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="89.3333"
                    r="1.66667"
                    transform="rotate(-90 45.6667 89.3333)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 60.3333 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 88.6667 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 117.667 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 74.6667 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 103 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="89.3338"
                    r="1.66667"
                    transform="rotate(-90 132 89.3338)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="74.6673"
                    r="1.66667"
                    transform="rotate(-90 1.66667 74.6673)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="31.0003"
                    r="1.66667"
                    transform="rotate(-90 1.66667 31.0003)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 16.3333 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="31.0003"
                    r="1.66667"
                    transform="rotate(-90 16.3333 31.0003)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 31 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="31.0003"
                    r="1.66667"
                    transform="rotate(-90 31 31.0003)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 45.6667 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="31.0003"
                    r="1.66667"
                    transform="rotate(-90 45.6667 31.0003)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 60.3333 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 60.3333 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 88.6667 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 88.6667 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 117.667 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 117.667 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 74.6667 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 74.6667 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 103 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 103 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="74.6668"
                    r="1.66667"
                    transform="rotate(-90 132 74.6668)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="31.0001"
                    r="1.66667"
                    transform="rotate(-90 132 31.0001)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 1.66667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 1.66667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 16.3333 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 16.3333 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 31 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 31 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 45.6667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 45.6667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 60.3333 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 60.3333 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 88.6667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 88.6667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 117.667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 117.667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 74.6667 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 74.6667 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 103 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 103 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="60.0003"
                    r="1.66667"
                    transform="rotate(-90 132 60.0003)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="16.3336"
                    r="1.66667"
                    transform="rotate(-90 132 16.3336)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="45.3336"
                    r="1.66667"
                    transform="rotate(-90 1.66667 45.3336)"
                    fill="white"
                  />
                  <circle
                    cx="1.66667"
                    cy="1.66683"
                    r="1.66667"
                    transform="rotate(-90 1.66667 1.66683)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="45.3336"
                    r="1.66667"
                    transform="rotate(-90 16.3333 45.3336)"
                    fill="white"
                  />
                  <circle
                    cx="16.3333"
                    cy="1.66683"
                    r="1.66667"
                    transform="rotate(-90 16.3333 1.66683)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="45.3336"
                    r="1.66667"
                    transform="rotate(-90 31 45.3336)"
                    fill="white"
                  />
                  <circle
                    cx="31"
                    cy="1.66683"
                    r="1.66667"
                    transform="rotate(-90 31 1.66683)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="45.3336"
                    r="1.66667"
                    transform="rotate(-90 45.6667 45.3336)"
                    fill="white"
                  />
                  <circle
                    cx="45.6667"
                    cy="1.66683"
                    r="1.66667"
                    transform="rotate(-90 45.6667 1.66683)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 60.3333 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="60.3333"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 60.3333 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 88.6667 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="88.6667"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 88.6667 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 117.667 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="117.667"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 117.667 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 74.6667 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="74.6667"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 74.6667 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 103 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="103"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 103 1.66707)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="45.3338"
                    r="1.66667"
                    transform="rotate(-90 132 45.3338)"
                    fill="white"
                  />
                  <circle
                    cx="132"
                    cy="1.66707"
                    r="1.66667"
                    transform="rotate(-90 132 1.66707)"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
   </div>


    <section className="pb-8 pt-20 dark:bg-dark lg:pb-[70px] lg:pt-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[550px] text-center lg:mb-[70px]">
              <div className="flex justify-center">
              <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark dark:text-white">
                {language === 'en'
                   ? 'Main Features Of ALPHAHOOD'
                   : 'ALPHAHOOD工具主要特点'
                }
              </h2>
              </div>
              <p className="text-base text-body-color dark:text-dark-6">
              {language === 'en'
                   ? 'The main functions of the tool include, but are not limited to, those described below, and we are committed to continuously developing more functions and services that are more intelligent and more useful.'
                   : '该工具的主要功能包括但不限于以下所述，我们致力于不断开发更多更智能、更实用的功能和服务。'
                   }
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <div className="wow fadeInUp group mb-12 text-center" data-wow-delay=".1s">
              <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary mx-auto">
                <span
                  className="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"
                ></span>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.5998 1.01245H5.39981C2.98105 1.01245 0.956055 2.9812 0.956055 5.4562V30.6562C0.956055 33.075 2.9248 35.0437 5.39981 35.0437H30.5998C33.0186 35.0437 34.9873 33.075 34.9873 30.6562V5.39995C34.9873 2.9812 33.0186 1.01245 30.5998 1.01245ZM5.39981 3.48745H30.5998C31.6123 3.48745 32.4561 4.3312 32.4561 5.39995V11.1937H3.4873V5.39995C3.4873 4.38745 4.38731 3.48745 5.39981 3.48745ZM3.4873 30.6V13.725H23.0623V32.5125H5.39981C4.38731 32.5125 3.4873 31.6125 3.4873 30.6ZM30.5998 32.5125H25.5373V13.725H32.4561V30.6C32.5123 31.6125 31.6123 32.5125 30.5998 32.5125Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4 className="mb-3 text-xl font-bold text-dark dark:text-white">
                {language === 'en'
                   ? 'Stock Daily Capital Flow'
                   : '个股每日资金流'
                   }
              </h4>
              <p className="mb-8 text-body-color dark:text-dark-6 lg:mb-9">
                {language === 'en'
                   ? 'We monitor the daily "smart" capital flow of different scales for stocks in the US/HK Market.'
                   : '我们每日监控美港市场股票历史截止当日不同规模的“聪明”资金流向和流量。'
                   }
              </p>
                <a
                  className="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="number text-5xl font-extrabold text-primary dark:text-primary">
                    1000+
                  </span>
                </a>
                  <h4 className="mt-4 mb-3 text-l font-bold text-dark dark:text-white ">
                     {language === 'en'
                        ? 'Stocks with historical records'
                        : '个股资金流历史记录'
                     }
                  </h4>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <div className="wow fadeInUp group mb-12 text-center" data-wow-delay=".1s">
              <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary mx-auto">
                <span
                  className="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"
                ></span>
                <svg
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.355 2.0614H5.21129C3.29879 2.0614 1.72379 3.6364 1.72379 5.5489V12.6927C1.72379 14.6052 3.29879 16.1802 5.21129 16.1802H12.355C14.2675 16.1802 15.8425 14.6052 15.8425 12.6927V5.60515C15.8988 3.6364 14.3238 2.0614 12.355 2.0614ZM13.3675 12.7489C13.3675 13.3114 12.9175 13.7614 12.355 13.7614H5.21129C4.64879 13.7614 4.19879 13.3114 4.19879 12.7489V5.60515C4.19879 5.04265 4.64879 4.59265 5.21129 4.59265H12.355C12.9175 4.59265 13.3675 5.04265 13.3675 5.60515V12.7489Z"
                    fill="white"
                  />
                  <path
                    d="M31.0863 2.0614H23.9425C22.03 2.0614 20.455 3.6364 20.455 5.5489V12.6927C20.455 14.6052 22.03 16.1802 23.9425 16.1802H31.0863C32.9988 16.1802 34.5738 14.6052 34.5738 12.6927V5.60515C34.5738 3.6364 32.9988 2.0614 31.0863 2.0614ZM32.0988 12.7489C32.0988 13.3114 31.6488 13.7614 31.0863 13.7614H23.9425C23.38 13.7614 22.93 13.3114 22.93 12.7489V5.60515C22.93 5.04265 23.38 4.59265 23.9425 4.59265H31.0863C31.6488 4.59265 32.0988 5.04265 32.0988 5.60515V12.7489Z"
                    fill="white"
                  />
                  <path
                    d="M12.355 20.0051H5.21129C3.29879 20.0051 1.72379 21.5801 1.72379 23.4926V30.6364C1.72379 32.5489 3.29879 34.1239 5.21129 34.1239H12.355C14.2675 34.1239 15.8425 32.5489 15.8425 30.6364V23.5489C15.8988 21.5801 14.3238 20.0051 12.355 20.0051ZM13.3675 30.6926C13.3675 31.2551 12.9175 31.7051 12.355 31.7051H5.21129C4.64879 31.7051 4.19879 31.2551 4.19879 30.6926V23.5489C4.19879 22.9864 4.64879 22.5364 5.21129 22.5364H12.355C12.9175 22.5364 13.3675 22.9864 13.3675 23.5489V30.6926Z"
                    fill="white"
                  />
                  <path
                    d="M31.0863 20.0051H23.9425C22.03 20.0051 20.455 21.5801 20.455 23.4926V30.6364C20.455 32.5489 22.03 34.1239 23.9425 34.1239H31.0863C32.9988 34.1239 34.5738 32.5489 34.5738 30.6364V23.5489C34.5738 21.5801 32.9988 20.0051 31.0863 20.0051ZM32.0988 30.6926C32.0988 31.2551 31.6488 31.7051 31.0863 31.7051H23.9425C23.38 31.7051 22.93 31.2551 22.93 30.6926V23.5489C22.93 22.9864 23.38 22.5364 23.9425 22.5364H31.0863C31.6488 22.5364 32.0988 22.9864 32.0988 23.5489V30.6926Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4 className="mb-3 text-xl font-bold text-dark dark:text-white">
                {language === 'en'
                        ? 'Industry-level Capital Flow'
                        : '行业级别资金流'
                }
              </h4>
              <p className="mb-8 text-body-color dark:text-dark-6 lg:mb-9">
                {language === 'en'
                        ? 'We provide a global heatmap of where the hot money flows between industries and sectors.'
                        : '我们复盘当日及历史资金在行业间及跨行业流动的全局热力图。'
                }
              </p>
              <a
                  className="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="number text-5xl font-extrabold text-primary dark:text-primary">
                    101+
                  </span>
                </a>
                <h4 className="mt-4 mb-3 text-l font-bold text-dark dark:text-white ">
                   {language === 'en'
                        ?  'Industries and sectors'
                        : '产业和行业覆盖'
                   }
                  </h4>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <div className="wow fadeInUp group mb-12 text-center" data-wow-delay=".1s">
              <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary mx-auto">
                <span
                  className="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"
                ></span>
                <svg
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.5613 21.4677L31.3675 20.1177C30.805 19.7239 30.0175 19.9489 29.6238 20.5114C29.23 21.1302 29.455 21.8614 30.0175 22.2552L31.48 23.2114L18.1488 31.5927L4.76127 23.2114L6.22377 22.2552C6.84252 21.8614 7.01127 21.0739 6.61752 20.5114C6.22377 19.8927 5.43627 19.7239 4.87377 20.1177L2.68002 21.4677C2.11752 21.8614 1.72377 22.4802 1.72377 23.1552C1.72377 23.8302 2.06127 24.5052 2.68002 24.8427L17.08 33.8989C17.4175 34.1239 17.755 34.1802 18.1488 34.1802C18.5425 34.1802 18.88 34.0677 19.2175 33.8989L33.5613 24.8989C34.1238 24.5052 34.5175 23.8864 34.5175 23.2114C34.5175 22.5364 34.18 21.8614 33.5613 21.4677Z"
                    fill="white"
                  />
                  <path
                    d="M20.1175 20.4552L18.1488 21.6364L16.18 20.3989C15.5613 20.0052 14.83 20.2302 14.4363 20.7927C14.0425 21.4114 14.2675 22.1427 14.83 22.5364L17.4738 24.1677C17.6988 24.2802 17.9238 24.3364 18.1488 24.3364C18.3738 24.3364 18.5988 24.2802 18.8238 24.1677L21.4675 22.5364C22.0863 22.1427 22.255 21.3552 21.8613 20.7927C21.4675 20.2302 20.68 20.0614 20.1175 20.4552Z"
                    fill="white"
                  />
                  <path
                    d="M7.74252 18.0927L11.455 20.4552C11.68 20.5677 11.905 20.6239 12.13 20.6239C12.5238 20.6239 12.9738 20.3989 13.1988 20.0052C13.5925 19.3864 13.3675 18.6552 12.805 18.2614L9.09252 15.8989C8.47377 15.5052 7.74252 15.7302 7.34877 16.2927C6.95502 16.9677 7.12377 17.7552 7.74252 18.0927Z"
                    fill="white"
                  />
                  <path
                    d="M5.04252 16.1802C5.43627 16.1802 5.88627 15.9552 6.11127 15.5614C6.50502 14.9427 6.28002 14.2114 5.71752 13.8177L4.81752 13.2552L5.71752 12.6927C6.33627 12.2989 6.50502 11.5114 6.11127 10.9489C5.71752 10.3302 4.93002 10.1614 4.36752 10.5552L1.72377 12.1864C1.33002 12.4114 1.10502 12.8052 1.10502 13.2552C1.10502 13.7052 1.33002 14.0989 1.72377 14.3239L4.36752 15.9552C4.53627 16.1239 4.76127 16.1802 5.04252 16.1802Z"
                    fill="white"
                  />
                  <path
                    d="M8.41752 10.7239C8.64252 10.7239 8.86752 10.6677 9.09252 10.5552L12.805 8.1927C13.4238 7.79895 13.5925 7.01145 13.1988 6.44895C12.805 5.8302 12.0175 5.66145 11.455 6.0552L7.74252 8.4177C7.12377 8.81145 6.95502 9.59895 7.34877 10.1614C7.57377 10.4989 7.96752 10.7239 8.41752 10.7239Z"
                    fill="white"
                  />
                  <path
                    d="M16.18 6.05522L18.1488 4.81772L20.1175 6.05522C20.3425 6.16772 20.5675 6.22397 20.7925 6.22397C21.1863 6.22397 21.6363 5.99897 21.8613 5.60522C22.255 4.98647 22.03 4.25522 21.4675 3.86147L18.8238 2.23022C18.43 1.94897 17.8675 1.94897 17.4738 2.23022L14.83 3.86147C14.2113 4.25522 14.0425 5.04272 14.4363 5.60522C14.83 6.16772 15.6175 6.44897 16.18 6.05522Z"
                    fill="white"
                  />
                  <path
                    d="M23.4925 8.19267L27.205 10.5552C27.43 10.6677 27.655 10.7239 27.88 10.7239C28.2738 10.7239 28.7238 10.4989 28.9488 10.1052C29.3425 9.48642 29.1175 8.75517 28.555 8.36142L24.8425 5.99892C24.28 5.60517 23.4925 5.83017 23.0988 6.39267C22.705 7.01142 22.8738 7.79892 23.4925 8.19267Z"
                    fill="white"
                  />
                  <path
                    d="M34.5738 12.1864L31.93 10.5552C31.3675 10.1614 30.58 10.3864 30.1863 10.9489C29.7925 11.5677 30.0175 12.2989 30.58 12.6927L31.48 13.2552L30.58 13.8177C29.9613 14.2114 29.7925 14.9989 30.1863 15.5614C30.4113 15.9552 30.8613 16.1802 31.255 16.1802C31.48 16.1802 31.705 16.1239 31.93 16.0114L34.5738 14.3802C34.9675 14.1552 35.1925 13.7614 35.1925 13.3114C35.1925 12.8614 34.9675 12.4114 34.5738 12.1864Z"
                    fill="white"
                  />
                  <path
                    d="M24.1675 20.624C24.3925 20.624 24.6175 20.5677 24.8425 20.4552L28.555 18.0927C29.1738 17.699 29.3425 16.9115 28.9488 16.349C28.555 15.7302 27.7675 15.5615 27.205 15.9552L23.4925 18.3177C22.8738 18.7115 22.705 19.499 23.0988 20.0615C23.3238 20.4552 23.7175 20.624 24.1675 20.624Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4 className="mb-3 text-xl font-bold text-dark dark:text-white">
                {language === 'en'
                        ?  'Diversified Stock Strategies'
                        :  '多元化选股策略'
                }
              </h4>
              <p className="mb-8 text-body-color dark:text-dark-6 lg:mb-9">
                {language === 'en'
                        ? 'We provide mixed of strategies based on capital flows and momentum patterns of tickers.'
                        : '我们提供基于个股历史交易资金流动和近期股价动量的混合选股策略。'
                }
              </p>
              <a
                  className="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="number text-5xl font-extrabold text-primary dark:text-primary">
                    30+
                  </span>
                </a>
                <h4 className="mt-4 mb-3 text-l font-bold text-dark dark:text-white ">
                   {language === 'en'
                        ? 'Stock-targeting strategies'
                        : '可选选股策略'
                   }
                </h4>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/4">
            <div className="wow fadeInUp group mb-12 text-center" data-wow-delay=".1s">
              <div className="relative z-10 mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-[14px] bg-primary mx-auto">
                <span
                  className="absolute left-0 top-0 -z-[1] mb-8 flex h-[70px] w-[70px] rotate-[25deg] items-center justify-center rounded-[14px] bg-primary bg-opacity-20 duration-300 group-hover:rotate-45"
                ></span>
                <svg
                  width="37"
                  height="37"
                  viewBox="0 0 37 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.5801 8.30514H27.9926C28.6113 7.85514 29.1176 7.34889 29.3426 6.73014C29.6801 5.88639 29.6801 4.48014 27.9363 2.84889C26.0801 1.04889 24.3926 1.04889 23.3238 1.33014C20.9051 1.94889 19.2738 4.76139 18.3738 6.78639C17.4738 4.76139 15.8426 2.00514 13.4238 1.33014C12.3551 1.04889 10.6676 1.10514 8.81133 2.84889C7.06758 4.53639 7.12383 5.88639 7.40508 6.73014C7.63008 7.34889 8.13633 7.85514 8.75508 8.30514H5.71758C4.08633 8.30514 2.73633 9.65514 2.73633 11.2864V14.9989C2.73633 16.5739 4.03008 17.8676 5.60508 17.9239V31.6489C5.60508 33.5614 7.18008 35.1926 9.14883 35.1926H27.5426C29.4551 35.1926 31.0863 33.6176 31.0863 31.6489V17.8676C32.4926 17.6426 33.5613 16.4051 33.5613 14.9426V11.2301C33.5613 9.59889 32.2113 8.30514 30.5801 8.30514ZM23.9426 3.69264C23.9988 3.69264 24.1676 3.63639 24.3363 3.63639C24.7301 3.63639 25.3488 3.80514 26.1926 4.59264C26.8676 5.21139 27.0363 5.66139 26.9801 5.77389C26.6988 6.56139 23.8863 7.40514 20.6801 7.74264C21.4676 5.99889 22.6488 4.03014 23.9426 3.69264ZM10.4988 4.64889C11.3426 3.86139 11.9613 3.69264 12.3551 3.69264C12.5238 3.69264 12.6363 3.74889 12.7488 3.74889C14.0426 4.08639 15.2801 5.99889 16.0676 7.79889C12.8613 7.46139 10.0488 6.61764 9.76758 5.83014C9.71133 5.66139 9.88008 5.26764 10.4988 4.64889ZM5.26758 14.9426V11.2301C5.26758 11.0051 5.43633 10.7801 5.71758 10.7801H30.5801C30.8051 10.7801 31.0301 10.9489 31.0301 11.2301V14.9426C31.0301 15.1676 30.8613 15.3926 30.5801 15.3926H5.71758C5.49258 15.3926 5.26758 15.2239 5.26758 14.9426ZM27.5426 32.6614H9.14883C8.58633 32.6614 8.13633 32.2114 8.13633 31.6489V17.9239H28.4988V31.6489C28.5551 32.2114 28.1051 32.6614 27.5426 32.6614Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h4 className="mb-3 text-xl font-bold text-dark dark:text-white">
                {language === 'en'
                        ? 'Upcoming AI Strategies'
                        : '即将推出的AI智能策略'
                }
              </h4>
              <p className="mb-8 text-body-color dark:text-dark-6 lg:mb-9">
                {language === 'en'
                        ? 'We will continuously add new features including AI strategy, community, and custom features for investor elites.'
                        : '我们将持续推出更多功能，包括AI策略、高信噪比社区以及为精英投资者定制的功能。'
                }
              </p>
              <a
                  className="text-base font-medium text-dark hover:text-primary dark:text-white dark:hover:text-primary"
                >
                  <span className="number text-5xl font-extrabold text-primary dark:text-primary">
                    x+
                  </span>
                </a>
                <h4 className="mt-4 mb-3 text-l font-bold text-dark dark:text-white ">
                   {language === 'en'
                        ? 'Excess returns and confidence'
                        : '超额收益和决策信心'
                   }
                </h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="about"
      className="overflow-hidden z-10 bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[580px] lg:mb-0">
                <h2
                  className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]"
                >
                   {language === 'en'
                        ? 'Simple & Practical Tools to Lock in Opportunities'
                        : '简洁且实用的交易买卖策略工具'
                   }
                </h2>
                <p
                  className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6"
                >
                  {language === 'en'
                        ? "We track capital historical records of individual stocks on a daily base, outline the dynamic pattern of smart capital flow for investors, and inform  "
                        : '该工具旨在帮助投资者追踪个股和行业的历史和最新资金流向动态。我们认为，聪明资金的流动动能往往是其在复杂决策下最终行动的体现。'
                  }
                  <br />
                  <br />
                 {language === 'en'
                        ? 'As senior practitioners from hedge fund & IBD from HK and Wall Street, and senior data/AI practitioners from Silicon Valley,  providing trustworthy and effective products is how we build our trust with customers.'
                        : '作为来自香港和华尔街的对冲基金和IBD的资深从业者，以及来自硅谷的资深数据/人工智能从业者，提供值得信赖和有效的产品是我们与客户建立信任的方式。'
                 }
                </p>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap sm:-mx-4 lg:-mx-2 xl:-mx-4">
                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div
                    className="mb-4 sm:mb-8 sm:h-[400px] md:h-[540px] lg:h-[400px] xl:h-[500px]"
                  >
                    <img
                      src="../../assets/images/about/about-image-01.jpg"
                      alt="about image"
                      className="h-full w-full rounded-xl object-cover object-center"
                    />
                  </div>
                </div>

                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4">
                  <div
                    className="mb-4 sm:mb-8 sm:h-[220px] md:h-[346px] lg:mb-4 lg:h-[225px] xl:mb-8 xl:h-[310px]"
                  >
                    <img
                      src="../../assets/images/about/nueral_network_stock.jpg"
                      alt="about image"
                      className="h-full w-full rounded-xl object-cover object-left"
                    />
                  </div>

                  <div
                    className="relative z-10 mb-4 flex rounded-xl items-center justify-center overflow-hidden bg-primary px-6 py-12 sm:mb-8 sm:h-[160px] sm:p-5 lg:mb-4 xl:mb-8"
                  >
                    <div>

                      <span className="block text-base font-semibold text-white">
                        {language === 'en'
                        ? 'We on average have'
                        : '我们平均拥有'
                        }
                      </span>
                      <span className="block text-5xl font-extrabold text-white">
                        9
                      </span>
                      <span
                        className="block text-base font-medium text-white text-opacity-70"
                      >
                        {language === 'en'
                        ? 'Years of experience'
                        : '年的从业经验'
                        }
                      </span>
                    </div>
                    <div>
                      <span className="absolute left-0 top-0 -z-10">
                        <svg
                          width="106"
                          height="144"
                          viewBox="0 0 106 144"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.1"
                            x="-67"
                            y="47.127"
                            width="113.378"
                            height="131.304"
                            transform="rotate(-42.8643 -67 47.127)"
                            fill="url(#paint0_linear_1416_214)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1416_214"
                              x1="-10.3111"
                              y1="47.127"
                              x2="-10.3111"
                              y2="178.431"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="white" />
                              <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <span className="absolute right-0 top-0 -z-10">
                        <svg
                          width="130"
                          height="97"
                          viewBox="0 0 130 97"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.1"
                            x="0.86792"
                            y="-6.67725"
                            width="155.563"
                            height="140.614"
                            transform="rotate(-42.8643 0.86792 -6.67725)"
                            fill="url(#paint0_linear_1416_215)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1416_215"
                              x1="78.6495"
                              y1="-6.67725"
                              x2="78.6495"
                              y2="133.937"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="white" />
                              <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                      <span className="absolute bottom-0 right-0 -z-10">
                        <svg
                          width="175"
                          height="104"
                          viewBox="0 0 175 104"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.1"
                            x="175.011"
                            y="108.611"
                            width="101.246"
                            height="148.179"
                            transform="rotate(137.136 175.011 108.611)"
                            fill="url(#paint0_linear_1416_216)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1416_216"
                              x1="225.634"
                              y1="108.611"
                              x2="225.634"
                              y2="256.79"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="white" />
                              <stop
                                offset="1"
                                stopColor="white"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
        id="overview"
        className="relative z-10 overflow-hidden bg-primary py-20 lg:py-[60px]"
    >
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap items-stretch">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[620px] text-center">
                <h2
                  className="mb-2.5 text-3xl font-bold text-white md:text-[38px] md:leading-[1.44]"
                >
                  <span>{language === 'en'
                        ? 'How Does the Tool Provide Value for You?'
                        : '工具如何提供价值和服务?'
                        }
                        </span>
                </h2>
                <p
                  className="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-white"
                >
                  {language === 'en'
                        ? 'Below will walk you through how you can realistically leverage on this powerful tool.'
                        : '如下将引导您了解如何实际利用这个强大的工具。'
                  }
                </p>
                <a
                  href="#pricing"
                  className="ud-button-scroll inline-flex items-center justify-center rounded-md bg-secondary px-7 py-[14px] text-center text-base font-medium text-white shadow-1 transition duration-300 ease-in-out hover:bg-[#0BB489] hover:text-body-color"
                >
                  {language === 'en'
                        ? 'Try It Out First'
                        : '先上手试试'
                  }
                </a>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div>
        <span className="absolute left-0 top-0">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="12"
            />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="13"
            />
          </svg>
        </span>
      </div>
    </section>

    <section
      id="overview_details"
      className="bg-gray-1 pb-8 pt-10 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container mb-20">
  <div className="wow fadeInUp" data-wow-delay=".2s">
    <div className="-mx-4 flex flex-wrap items-center">
      {/* Image Container */}
      <div className="w-full px-4 lg:w-1/2 flex justify-center items-center">
        <div className="overflow-hidden rounded-xl">
          <img
            src={
              language === "en"
                ? "../../assets/images/tutorial/capital-history-cover-EN-test2.jpg"
                : "../../assets/images/tutorial/capital-history-cover-CN-test2.jpg"
            }
            alt="about image"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      {/* Text Container */}
      <div className="w-full px-4 lg:w-1/2 flex justify-center items-center">
        <div className="text-center">
          <h2
            className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]"
          >
            {language === "en"
              ? "Historical Capital Flow Records for Stocks"
              : "个股历史资金记录"}
          </h2>
          <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
            {language === "en"
              ? "We track the capital history of individual stocks every day, outline smart capital flow dynamics for investors, and provide reference signals for buying/selling decisions on the target stocks."
              : "我们每天追踪个股的资金历史记录，为投资者勾勒出聪明资金流向动态，为个股的买入/卖出决策提供参考信号。"}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

      <div className="container mb-20">
  <div className="wow fadeInUp" data-wow-delay=".2s">
    <div className="-mx-4 flex flex-wrap items-center">
      {/* Text Container */}
      <div className="w-full px-4 lg:w-1/2 flex justify-center items-center">
        <div className="text-center">
          <h2
            className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]"
          >
                  {language === 'en'
                        ? 'Industry Capital-flow Heatmap'
                        : '行业资金热力图'
                  }
          </h2>
          <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
            {language === "en"
              ? "The industry capital heat map insightfully displays the dynamics of capital flow direction and flow scale in different historical time dimensions of industry sectors and individual stocks up to now. Provide investors with a top-down approach to focus on industries and individual stocks of interest."
              : "行业资金热力图洞察地展示了行业板块以及个股截止目前不同的历史时间维度下资金流动方向和流动规模的动态。为投资者提供从上至下的方式的全局视角来关注感兴趣的行业和个股。"}
          </p>
        </div>
      </div>
      {/* Image Container */}
      <div className="w-full px-4 lg:w-1/2 flex justify-center items-center">
        <div className="overflow-hidden rounded-xl">
          <img
            src={language === 'en'?"../../assets/images/tutorial/heatmap-cover-EN.jpg":"../../assets/images/tutorial/heatmap-cover-CN.jpg"}

            alt="about image"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  </div>
</div>

            <div className="container mb-20">
  <div className="wow fadeInUp" data-wow-delay=".2s">
    <div className="-mx-4 flex flex-wrap items-center">
      {/* Image Container */}
      <div className="w-full px-4 lg:w-1/2 flex justify-center items-center">
        <div className="overflow-hidden rounded-xl">
          <img
            src={
              language === "en"
                ? "../../assets/images/tutorial/strategy-cover-EN.jpg"
                : "../../assets/images/tutorial/strategy-cover-CN.jpg"
            }
            alt="about image"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      {/* Text Container */}
      <div className="w-full px-4 lg:w-1/2 flex justify-center items-center">
        <div className="text-center">
          <h2
            className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]"
          >
            {language === "en"
              ? "Diversified Stock Strategies"
              : "多元选股策略"}
          </h2>
          <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
            {language === "en"
              ? "Through various financial and technical optional strategies such as capital flow patterns, individual stock turnover rate percentiles, and individual stock price gap signals, investors can timely screen out individual stocks that are favored by funds and have strong technical trends."
              : "可通过资金流动模式，个股换手率百分位，个股价格跳空信号等多种资金面和技术面的可选策略， 帮助投资者及时筛选出收到资金青睐和技术走势强势的个股。"}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
    </section>

    <section
      id="pricing"
      className="relative z-20 overflow-hidden pb-12 pt-20 bg-wholeblack lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <h2
                className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-[40px] md:leading-[1.2]"
              >
                {language === 'en'
                        ? 'Pricing Plan'
                        : '工具套餐定价'
                }
              </h2>
              <p className="text-base text-dark-6">
                {language === 'en'
                        ? "We're excited to offer all first-time users a free 7-day trial of the tool, as well as one-time or monthly subscription plans for users with different potential needs."
                        : '我们很开心为所有首次用户提供免费7天试用工具的机会， 同时为不同潜在需求的用户提供一次性或按月订阅式的套餐计划。'
                }
              </p>
            </div>
          </div>
        </div>

        <PricingTableOne language={language}/>

      </div>
    </section>

    <section
      id="testimonials"
      className="overflow-hidden bg-gray-1 py-20 dark:bg-dark-2 md:py-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[600px] text-center">
              <h2
                className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]"
              >
               {language === 'en'
                        ? 'What our Customers Say'
                        : '用户反馈'
               }
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                {language === 'en'
                        ? 'We collected the true voices from our customers about their product experience. We also humbly welcome any suggestions for improvement!'
                        : '我们收集了客户关于产品体验的真实声音。我们也虚心欢迎任何改进建议！'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="-m-5">
          <div className="swiper testimonial-carousel common-carousel p-5">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div
                  className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
                >
                  <div className="mb-[18px] flex items-center gap-[2px]">
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                  </div>

                  <p className="mb-6 text-base text-body-color dark:text-dark-6">
                    {language === 'en'
                        ? '"Even I have my own fundamental analysis on target stocks, this tool gives a better P/L ratio for my trading decisions by indicating better times to buy/sell a stock, making me more confident in my decisions."'
                        : '“即使我对目标股票有自己的基本面分析，这个工具也可以通过指示更好的买入/卖出股票时机，这让我的交易决策有更好的盈亏比，也让我对自己的决策更有信心。”'
                        }
                  </p>

                  <a href="#" className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                      <img
                        src="../../assets/images/testimonials/author-01.jpg"
                        alt="author"
                        className="h-[50px] w-[50px] overflow-hidden rounded-full"
                      />
                    </div>

                    <div>
                      <h3
                        className="text-sm font-semibold text-dark dark:text-white"
                      >
                        Jimmy Z.
                      </h3>
                      <p className="text-xs text-body-secondary">
                      {language === 'en'
                        ? 'from Hillhouse Capital'
                        : '来自高瓴资本'
                        }
                        </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="swiper-slide">
                <div
                  className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
                >
                  <div className="mb-[18px] flex items-center gap-[2px]">
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                  </div>

                  <p className="mb-6 text-base text-body-color dark:text-dark-6">
                    {language === 'en'
                        ? '"A simple but useful tool. I now check this tool in on daily basis to see buying opportunity of stocks in my watch list. It also helps me to discover new buying opportunities of other stocks that I have no time to explore."'
                        : '“算是一个简洁但有用的工具。我现在基本每天都会查看这个工具，看看我的观察列表中股票的买入机会。它还有帮助我发现其他我没有时间去发现的股票的买入机会。”'
                        }
                  </p>

                  <a href="#" className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                      <img
                        src="../../assets/images/testimonials/author-02.jpg"
                        alt="author"
                        className="h-[50px] w-[50px] overflow-hidden rounded-full"
                      />
                    </div>

                    <div>
                      <h3
                        className="text-sm font-semibold text-dark dark:text-white"
                      >
                        Haotian L.
                      </h3>
                      <p className="text-xs text-body-secondary">
                        {language === 'en'
                        ? 'from one of the Mega 7 companies'
                        : '来自7大美股高科技公司之一'
                        }
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="swiper-slide">
                <div
                  className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
                >
                  <div className="mb-[18px] flex items-center gap-[2px]">
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                  </div>

                  <p className="mb-6 text-base text-body-color dark:text-dark-6">
                  {language === 'en'
                        ? '"Only have 2 years of stock investing experience, but thanks to this tool, I recently made 37% profit from two stocks by referring to the strategies in the tool. Love it!! "'
                        : '“我也只有2年的股票投资经验，来来回回其实不亏不赚（心累）。不过我最近通过工具策略最后决定交易的两只股票里获利了37％，目前还留有少量仓位分批止盈。爱了这个工具！！”'
                        }
                  </p>
                  {language === 'en' ? <br /> : null}

                  <a href="#" className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                      <img
                        src="../../assets/images/testimonials/author-03.jpg"
                        alt="author"
                        className="h-[50px] w-[50px] overflow-hidden rounded-full"
                      />
                    </div>

                    <div>
                      <h3
                        className="text-sm font-semibold text-dark dark:text-white"
                      >
                        Sharon Q.
                      </h3>
                      <p className="text-xs text-body-secondary">
                        {language === 'en'
                        ? 'Finance student @NYU'
                        : '纽约大学金融专业学生'
                        }
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="swiper-slide">
                <div
                  className="rounded-xl bg-white px-4 py-[30px] shadow-testimonial dark:bg-dark sm:px-[30px]"
                >
                  <div className="mb-[18px] flex items-center gap-[2px]">
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                    <img
                      src="../../assets/images/testimonials/icon-star.svg"
                      alt="star icon"
                    />
                  </div>

                  <p className="mb-6 text-base text-body-color dark:text-dark-6">
                    {language === 'en'
                        ? '"Interesting. I have not seen some similar products like this and it does provide some key signals I looked for. I am getting love to use it more often than the beginning. Also look forward to seeing the AI strategy. "'
                        : '“挺有意思的，是个我之前没见过的产品，它确实直接提供了我之前不得不去花大量时间做分析才得到的一些重要分析结果。用了一段时间觉得挺方便的，也很期待开始用上AI版本的策略。”'
                        }
                  </p>

                  <a href="#" className="flex items-center gap-4">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                      <img
                        src="../../assets/images/testimonials/author-01.jpg"
                        alt="author"
                        className="h-[50px] w-[50px] overflow-hidden rounded-full"
                      />
                    </div>

                    <div>
                      <h3
                        className="text-sm font-semibold text-dark dark:text-white"
                      >
                        Thomas A.
                      </h3>
                      <p className="text-xs text-body-secondary">
                      {language === 'en'
                        ? 'Individual investor with 6 years of experience'
                        : '6年经验的个人全职投资者'
                      }
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-[60px] flex items-center justify-center gap-1">
              <div className="swiper-button-prev">
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.25 10.2437H4.57187L10.4156 4.29687C10.725 3.9875 10.725 3.50625 10.4156 3.19687C10.1062 2.8875 9.625 2.8875 9.31562 3.19687L2.2 10.4156C1.89062 10.725 1.89062 11.2063 2.2 11.5156L9.31562 18.7344C9.45312 18.8719 9.65937 18.975 9.86562 18.975C10.0719 18.975 10.2437 18.9062 10.4156 18.7687C10.725 18.4594 10.725 17.9781 10.4156 17.6688L4.60625 11.7906H19.25C19.6625 11.7906 20.0063 11.4469 20.0063 11.0344C20.0063 10.5875 19.6625 10.2437 19.25 10.2437Z"
                  />
                </svg>
              </div>

              <div className="swiper-button-next">
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.8 10.45L12.6844 3.2313C12.375 2.92192 11.8938 2.92192 11.5844 3.2313C11.275 3.54067 11.275 4.02192 11.5844 4.3313L17.3594 10.2094H2.75C2.3375 10.2094 1.99375 10.5532 1.99375 10.9657C1.99375 11.3782 2.3375 11.7563 2.75 11.7563H17.4281L11.5844 17.7032C11.275 18.0126 11.275 18.4938 11.5844 18.8032C11.7219 18.9407 11.9281 19.0094 12.1344 19.0094C12.3406 19.0094 12.5469 18.9407 12.6844 18.7688L19.8 11.55C20.1094 11.2407 20.1094 10.7594 19.8 10.45Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      className="relative z-20 overflow-hidden bg-white pb-8 pt-20 dark:bg-dark lg:pb-[50px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center">
              <h2
                className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]"
              >
                {language === 'en'
                        ? 'Any Questions? Look Here'
                        : '常见问题'
                }
              </h2>
              <p
                className="mx-auto max-w-[485px] text-base text-body-color dark:text-dark-6"
              >
                {language === 'en'
                        ? 'Below lists some frequently asked questions form our customers. We would love to answer other questions through contact.'
                        : '以下列出了我们客户的一些常见问题。我们也很乐意通过您的联系来回答其他问题'
                }
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <div className="mb-12 flex lg:mb-[70px]">
              <div
                className="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 34 34"
                  className="fill-current"
                >
                  <path
                    d="M17.0008 0.690674C7.96953 0.690674 0.691406 7.9688 0.691406 17C0.691406 26.0313 7.96953 33.3625 17.0008 33.3625C26.032 33.3625 33.3633 26.0313 33.3633 17C33.3633 7.9688 26.032 0.690674 17.0008 0.690674ZM17.0008 31.5032C9.03203 31.5032 2.55078 24.9688 2.55078 17C2.55078 9.0313 9.03203 2.55005 17.0008 2.55005C24.9695 2.55005 31.5039 9.0313 31.5039 17C31.5039 24.9688 24.9695 31.5032 17.0008 31.5032Z"
                  />
                  <path
                    d="M17.9039 6.32194C16.3633 6.05631 14.8227 6.48131 13.707 7.43756C12.5383 8.39381 11.8477 9.82819 11.8477 11.3688C11.8477 11.9532 11.9539 12.5376 12.1664 13.0688C12.3258 13.5469 12.857 13.8126 13.3352 13.6532C13.8133 13.4938 14.0789 12.9626 13.9195 12.4844C13.8133 12.1126 13.707 11.7938 13.707 11.3688C13.707 10.4126 14.132 9.50944 14.8758 8.87194C15.6195 8.23444 16.5758 7.96881 17.5852 8.18131C18.9133 8.39381 19.9758 9.50944 20.1883 10.7844C20.4539 12.3251 19.657 13.8126 18.2227 14.3969C16.8945 14.9282 16.0445 16.2563 16.0445 17.7969V21.1969C16.0445 21.7282 16.4695 22.1532 17.0008 22.1532C17.532 22.1532 17.957 21.7282 17.957 21.1969V17.7969C17.957 17.0532 18.382 16.3626 18.9664 16.1501C21.1977 15.2469 22.4727 12.9094 22.0477 10.4657C21.6758 8.39381 19.9758 6.69381 17.9039 6.32194Z"
                  />
                  <path
                    d="M17.0531 24.8625H16.8937C16.3625 24.8625 15.9375 25.2875 15.9375 25.8188C15.9375 26.35 16.3625 26.7751 16.8937 26.7751H17.0531C17.5844 26.7751 18.0094 26.35 18.0094 25.8188C18.0094 25.2875 17.5844 24.8625 17.0531 24.8625Z"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h3
                  className="mb-6 text-xl font-semibold text-dark dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                >
                  Is TailGrids Well-documented?
                </h3>
                <p className="text-base text-body-color dark:text-dark-6">
                  It takes 2-3 weeks to get your first blog post ready. That
                  includes the in-depth research & creation of your monthly
                  content ui/ux strategy that we do writing your first blog
                  post.
                </p>
              </div>
            </div>
            <div className="mb-12 flex lg:mb-[70px]">
              <div
                className="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 34 34"
                  className="fill-current"
                >
                  <path
                    d="M17.0008 0.690674C7.96953 0.690674 0.691406 7.9688 0.691406 17C0.691406 26.0313 7.96953 33.3625 17.0008 33.3625C26.032 33.3625 33.3633 26.0313 33.3633 17C33.3633 7.9688 26.032 0.690674 17.0008 0.690674ZM17.0008 31.5032C9.03203 31.5032 2.55078 24.9688 2.55078 17C2.55078 9.0313 9.03203 2.55005 17.0008 2.55005C24.9695 2.55005 31.5039 9.0313 31.5039 17C31.5039 24.9688 24.9695 31.5032 17.0008 31.5032Z"
                  />
                  <path
                    d="M17.9039 6.32194C16.3633 6.05631 14.8227 6.48131 13.707 7.43756C12.5383 8.39381 11.8477 9.82819 11.8477 11.3688C11.8477 11.9532 11.9539 12.5376 12.1664 13.0688C12.3258 13.5469 12.857 13.8126 13.3352 13.6532C13.8133 13.4938 14.0789 12.9626 13.9195 12.4844C13.8133 12.1126 13.707 11.7938 13.707 11.3688C13.707 10.4126 14.132 9.50944 14.8758 8.87194C15.6195 8.23444 16.5758 7.96881 17.5852 8.18131C18.9133 8.39381 19.9758 9.50944 20.1883 10.7844C20.4539 12.3251 19.657 13.8126 18.2227 14.3969C16.8945 14.9282 16.0445 16.2563 16.0445 17.7969V21.1969C16.0445 21.7282 16.4695 22.1532 17.0008 22.1532C17.532 22.1532 17.957 21.7282 17.957 21.1969V17.7969C17.957 17.0532 18.382 16.3626 18.9664 16.1501C21.1977 15.2469 22.4727 12.9094 22.0477 10.4657C21.6758 8.39381 19.9758 6.69381 17.9039 6.32194Z"
                  />
                  <path
                    d="M17.0531 24.8625H16.8937C16.3625 24.8625 15.9375 25.2875 15.9375 25.8188C15.9375 26.35 16.3625 26.7751 16.8937 26.7751H17.0531C17.5844 26.7751 18.0094 26.35 18.0094 25.8188C18.0094 25.2875 17.5844 24.8625 17.0531 24.8625Z"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h3
                  className="mb-6 text-xl font-semibold text-dark dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                >
                  Is TailGrids Well-documented?
                </h3>
                <p className="text-base text-body-color dark:text-dark-6">
                  It takes 2-3 weeks to get your first blog post ready. That
                  includes the in-depth research & creation of your monthly
                  content ui/ux strategy that we do writing your first blog
                  post.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="mb-12 flex lg:mb-[70px]">
              <div
                className="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 34 34"
                  className="fill-current"
                >
                  <path
                    d="M17.0008 0.690674C7.96953 0.690674 0.691406 7.9688 0.691406 17C0.691406 26.0313 7.96953 33.3625 17.0008 33.3625C26.032 33.3625 33.3633 26.0313 33.3633 17C33.3633 7.9688 26.032 0.690674 17.0008 0.690674ZM17.0008 31.5032C9.03203 31.5032 2.55078 24.9688 2.55078 17C2.55078 9.0313 9.03203 2.55005 17.0008 2.55005C24.9695 2.55005 31.5039 9.0313 31.5039 17C31.5039 24.9688 24.9695 31.5032 17.0008 31.5032Z"
                  />
                  <path
                    d="M17.9039 6.32194C16.3633 6.05631 14.8227 6.48131 13.707 7.43756C12.5383 8.39381 11.8477 9.82819 11.8477 11.3688C11.8477 11.9532 11.9539 12.5376 12.1664 13.0688C12.3258 13.5469 12.857 13.8126 13.3352 13.6532C13.8133 13.4938 14.0789 12.9626 13.9195 12.4844C13.8133 12.1126 13.707 11.7938 13.707 11.3688C13.707 10.4126 14.132 9.50944 14.8758 8.87194C15.6195 8.23444 16.5758 7.96881 17.5852 8.18131C18.9133 8.39381 19.9758 9.50944 20.1883 10.7844C20.4539 12.3251 19.657 13.8126 18.2227 14.3969C16.8945 14.9282 16.0445 16.2563 16.0445 17.7969V21.1969C16.0445 21.7282 16.4695 22.1532 17.0008 22.1532C17.532 22.1532 17.957 21.7282 17.957 21.1969V17.7969C17.957 17.0532 18.382 16.3626 18.9664 16.1501C21.1977 15.2469 22.4727 12.9094 22.0477 10.4657C21.6758 8.39381 19.9758 6.69381 17.9039 6.32194Z"
                  />
                  <path
                    d="M17.0531 24.8625H16.8937C16.3625 24.8625 15.9375 25.2875 15.9375 25.8188C15.9375 26.35 16.3625 26.7751 16.8937 26.7751H17.0531C17.5844 26.7751 18.0094 26.35 18.0094 25.8188C18.0094 25.2875 17.5844 24.8625 17.0531 24.8625Z"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h3
                  className="mb-6 text-xl font-semibold text-dark dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                >
                  Is TailGrids Well-documented?
                </h3>
                <p className="text-base text-body-color dark:text-dark-6">
                  It takes 2-3 weeks to get your first blog post ready. That
                  includes the in-depth research & creation of your monthly
                  content ui/ux strategy that we do writing your first blog
                  post.
                </p>
              </div>
            </div>
            <div className="mb-12 flex lg:mb-[70px]">
              <div
                className="mr-4 flex h-[50px] w-full max-w-[50px] items-center justify-center rounded-xl bg-primary text-white sm:mr-6 sm:h-[60px] sm:max-w-[60px]"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 34 34"
                  className="fill-current"
                >
                  <path
                    d="M17.0008 0.690674C7.96953 0.690674 0.691406 7.9688 0.691406 17C0.691406 26.0313 7.96953 33.3625 17.0008 33.3625C26.032 33.3625 33.3633 26.0313 33.3633 17C33.3633 7.9688 26.032 0.690674 17.0008 0.690674ZM17.0008 31.5032C9.03203 31.5032 2.55078 24.9688 2.55078 17C2.55078 9.0313 9.03203 2.55005 17.0008 2.55005C24.9695 2.55005 31.5039 9.0313 31.5039 17C31.5039 24.9688 24.9695 31.5032 17.0008 31.5032Z"
                  />
                  <path
                    d="M17.9039 6.32194C16.3633 6.05631 14.8227 6.48131 13.707 7.43756C12.5383 8.39381 11.8477 9.82819 11.8477 11.3688C11.8477 11.9532 11.9539 12.5376 12.1664 13.0688C12.3258 13.5469 12.857 13.8126 13.3352 13.6532C13.8133 13.4938 14.0789 12.9626 13.9195 12.4844C13.8133 12.1126 13.707 11.7938 13.707 11.3688C13.707 10.4126 14.132 9.50944 14.8758 8.87194C15.6195 8.23444 16.5758 7.96881 17.5852 8.18131C18.9133 8.39381 19.9758 9.50944 20.1883 10.7844C20.4539 12.3251 19.657 13.8126 18.2227 14.3969C16.8945 14.9282 16.0445 16.2563 16.0445 17.7969V21.1969C16.0445 21.7282 16.4695 22.1532 17.0008 22.1532C17.532 22.1532 17.957 21.7282 17.957 21.1969V17.7969C17.957 17.0532 18.382 16.3626 18.9664 16.1501C21.1977 15.2469 22.4727 12.9094 22.0477 10.4657C21.6758 8.39381 19.9758 6.69381 17.9039 6.32194Z"
                  />
                  <path
                    d="M17.0531 24.8625H16.8937C16.3625 24.8625 15.9375 25.2875 15.9375 25.8188C15.9375 26.35 16.3625 26.7751 16.8937 26.7751H17.0531C17.5844 26.7751 18.0094 26.35 18.0094 25.8188C18.0094 25.2875 17.5844 24.8625 17.0531 24.8625Z"
                  />
                </svg>
              </div>
              <div className="w-full">
                <h3
                  className="mb-6 text-xl font-semibold text-dark dark:text-white sm:text-2xl lg:text-xl xl:text-2xl"
                >
                  Is TailGrids Well-documented?
                </h3>
                <p className="text-base text-body-color dark:text-dark-6">
                  It takes 2-3 weeks to get your first blog post ready. That
                  includes the in-depth research & creation of your monthly
                  content ui/ux strategy that we do writing your first blog
                  post.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="absolute left-4 top-4 -z-[1]">
          <svg
            width="48"
            height="134"
            viewBox="0 0 48 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="45.6673"
              cy="132"
              r="1.66667"
              transform="rotate(180 45.6673 132)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="117.333"
              r="1.66667"
              transform="rotate(180 45.6673 117.333)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="102.667"
              r="1.66667"
              transform="rotate(180 45.6673 102.667)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="88.0001"
              r="1.66667"
              transform="rotate(180 45.6673 88.0001)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="73.3335"
              r="1.66667"
              transform="rotate(180 45.6673 73.3335)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="45.0001"
              r="1.66667"
              transform="rotate(180 45.6673 45.0001)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="16.0001"
              r="1.66667"
              transform="rotate(180 45.6673 16.0001)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="59.0001"
              r="1.66667"
              transform="rotate(180 45.6673 59.0001)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="30.6668"
              r="1.66667"
              transform="rotate(180 45.6673 30.6668)"
              fill="#13C296"
            />
            <circle
              cx="45.6673"
              cy="1.66683"
              r="1.66667"
              transform="rotate(180 45.6673 1.66683)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="132"
              r="1.66667"
              transform="rotate(180 31.0013 132)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="117.333"
              r="1.66667"
              transform="rotate(180 31.0013 117.333)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="102.667"
              r="1.66667"
              transform="rotate(180 31.0013 102.667)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="88.0001"
              r="1.66667"
              transform="rotate(180 31.0013 88.0001)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="73.3335"
              r="1.66667"
              transform="rotate(180 31.0013 73.3335)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="45.0001"
              r="1.66667"
              transform="rotate(180 31.0013 45.0001)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="16.0001"
              r="1.66667"
              transform="rotate(180 31.0013 16.0001)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="59.0001"
              r="1.66667"
              transform="rotate(180 31.0013 59.0001)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="30.6668"
              r="1.66667"
              transform="rotate(180 31.0013 30.6668)"
              fill="#13C296"
            />
            <circle
              cx="31.0013"
              cy="1.66683"
              r="1.66667"
              transform="rotate(180 31.0013 1.66683)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="132"
              r="1.66667"
              transform="rotate(180 16.3333 132)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="117.333"
              r="1.66667"
              transform="rotate(180 16.3333 117.333)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="102.667"
              r="1.66667"
              transform="rotate(180 16.3333 102.667)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="88.0001"
              r="1.66667"
              transform="rotate(180 16.3333 88.0001)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="73.3335"
              r="1.66667"
              transform="rotate(180 16.3333 73.3335)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="45.0001"
              r="1.66667"
              transform="rotate(180 16.3333 45.0001)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="16.0001"
              r="1.66667"
              transform="rotate(180 16.3333 16.0001)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="59.0001"
              r="1.66667"
              transform="rotate(180 16.3333 59.0001)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="30.6668"
              r="1.66667"
              transform="rotate(180 16.3333 30.6668)"
              fill="#13C296"
            />
            <circle
              cx="16.3333"
              cy="1.66683"
              r="1.66667"
              transform="rotate(180 16.3333 1.66683)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="132"
              r="1.66667"
              transform="rotate(180 1.66732 132)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="117.333"
              r="1.66667"
              transform="rotate(180 1.66732 117.333)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="102.667"
              r="1.66667"
              transform="rotate(180 1.66732 102.667)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="88.0001"
              r="1.66667"
              transform="rotate(180 1.66732 88.0001)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="73.3335"
              r="1.66667"
              transform="rotate(180 1.66732 73.3335)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="45.0001"
              r="1.66667"
              transform="rotate(180 1.66732 45.0001)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="16.0001"
              r="1.66667"
              transform="rotate(180 1.66732 16.0001)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="59.0001"
              r="1.66667"
              transform="rotate(180 1.66732 59.0001)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="30.6668"
              r="1.66667"
              transform="rotate(180 1.66732 30.6668)"
              fill="#13C296"
            />
            <circle
              cx="1.66732"
              cy="1.66683"
              r="1.66667"
              transform="rotate(180 1.66732 1.66683)"
              fill="#13C296"
            />
          </svg>
        </span>
        <span className="absolute bottom-4 right-4 -z-[1]">
          <svg
            width="48"
            height="134"
            viewBox="0 0 48 134"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="45.6673"
              cy="132"
              r="1.66667"
              transform="rotate(180 45.6673 132)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="117.333"
              r="1.66667"
              transform="rotate(180 45.6673 117.333)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="102.667"
              r="1.66667"
              transform="rotate(180 45.6673 102.667)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="88.0001"
              r="1.66667"
              transform="rotate(180 45.6673 88.0001)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="73.3333"
              r="1.66667"
              transform="rotate(180 45.6673 73.3333)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="45.0001"
              r="1.66667"
              transform="rotate(180 45.6673 45.0001)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="16.0001"
              r="1.66667"
              transform="rotate(180 45.6673 16.0001)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="59.0001"
              r="1.66667"
              transform="rotate(180 45.6673 59.0001)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="30.6668"
              r="1.66667"
              transform="rotate(180 45.6673 30.6668)"
              fill="#3758F9"
            />
            <circle
              cx="45.6673"
              cy="1.66683"
              r="1.66667"
              transform="rotate(180 45.6673 1.66683)"
              fill="#3758F9"
            />
            <circle
              cx="31.0006"
              cy="132"
              r="1.66667"
              transform="rotate(180 31.0006 132)"
              fill="#3758F9"
            />
            <circle
              cx="31.0006"
              cy="117.333"
              r="1.66667"
              transform="rotate(180 31.0006 117.333)"
              fill="#3758F9"
            />
            <circle
              cx="31.0006"
              cy="102.667"
              r="1.66667"
              transform="rotate(180 31.0006 102.667)"
              fill="#3758F9"
            />
            <circle
              cx="31.0006"
              cy="88.0001"
              r="1.66667"
              transform="rotate(180 31.0006 88.0001)"
              fill="#3758F9"
            />
            <circle
              cx="31.0008"
              cy="73.3333"
              r="1.66667"
              transform="rotate(180 31.0008 73.3333)"
              fill="#3758F9"
            />
            <circle
              cx="31.0008"
              cy="45.0001"
              r="1.66667"
              transform="rotate(180 31.0008 45.0001)"
              fill="#3758F9"
            />
            <circle
              cx="31.0008"
              cy="16.0001"
              r="1.66667"
              transform="rotate(180 31.0008 16.0001)"
              fill="#3758F9"
            />
            <circle
              cx="31.0008"
              cy="59.0001"
              r="1.66667"
              transform="rotate(180 31.0008 59.0001)"
              fill="#3758F9"
            />
            <circle
              cx="31.0008"
              cy="30.6668"
              r="1.66667"
              transform="rotate(180 31.0008 30.6668)"
              fill="#3758F9"
            />
            <circle
              cx="31.0008"
              cy="1.66683"
              r="1.66667"
              transform="rotate(180 31.0008 1.66683)"
              fill="#3758F9"
            />
            <circle
              cx="16.3341"
              cy="132"
              r="1.66667"
              transform="rotate(180 16.3341 132)"
              fill="#3758F9"
            />
            <circle
              cx="16.3341"
              cy="117.333"
              r="1.66667"
              transform="rotate(180 16.3341 117.333)"
              fill="#3758F9"
            />
            <circle
              cx="16.3341"
              cy="102.667"
              r="1.66667"
              transform="rotate(180 16.3341 102.667)"
              fill="#3758F9"
            />
            <circle
              cx="16.3341"
              cy="88.0001"
              r="1.66667"
              transform="rotate(180 16.3341 88.0001)"
              fill="#3758F9"
            />
            <circle
              cx="16.3338"
              cy="73.3333"
              r="1.66667"
              transform="rotate(180 16.3338 73.3333)"
              fill="#3758F9"
            />
            <circle
              cx="16.3338"
              cy="45.0001"
              r="1.66667"
              transform="rotate(180 16.3338 45.0001)"
              fill="#3758F9"
            />
            <circle
              cx="16.3338"
              cy="16.0001"
              r="1.66667"
              transform="rotate(180 16.3338 16.0001)"
              fill="#3758F9"
            />
            <circle
              cx="16.3338"
              cy="59.0001"
              r="1.66667"
              transform="rotate(180 16.3338 59.0001)"
              fill="#3758F9"
            />
            <circle
              cx="16.3338"
              cy="30.6668"
              r="1.66667"
              transform="rotate(180 16.3338 30.6668)"
              fill="#3758F9"
            />
            <circle
              cx="16.3338"
              cy="1.66683"
              r="1.66667"
              transform="rotate(180 16.3338 1.66683)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="132"
              r="1.66667"
              transform="rotate(180 1.66732 132)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="117.333"
              r="1.66667"
              transform="rotate(180 1.66732 117.333)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="102.667"
              r="1.66667"
              transform="rotate(180 1.66732 102.667)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="88.0001"
              r="1.66667"
              transform="rotate(180 1.66732 88.0001)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="73.3333"
              r="1.66667"
              transform="rotate(180 1.66732 73.3333)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="45.0001"
              r="1.66667"
              transform="rotate(180 1.66732 45.0001)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="16.0001"
              r="1.66667"
              transform="rotate(180 1.66732 16.0001)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="59.0001"
              r="1.66667"
              transform="rotate(180 1.66732 59.0001)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="30.6668"
              r="1.66667"
              transform="rotate(180 1.66732 30.6668)"
              fill="#3758F9"
            />
            <circle
              cx="1.66732"
              cy="1.66683"
              r="1.66667"
              transform="rotate(180 1.66732 1.66683)"
              fill="#3758F9"
            />
          </svg>
        </span>
      </div>
    </section>

    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[700px] text-center">
              <h2
                className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]"
              >
                {language === 'en'
                        ? 'Our Professional Team'
                        : '我们的团队'
                }
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
              {language === 'en'
                        ?  'The tool was curated by a group of experts from hedge funds, IBD, high-tech, and product backgrounds. Providing reliable and powerful trading strategy tool is our all-time mission.'
                        : '该工具是由一群来自对冲基金、IBD、高科技和产品背景的资深人士所设计。提供可靠且强大的交易策略工具是我们始终如一的使命。'
              }
              </p>
            </div>
          </div>
        </div>
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
            <div
              className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none"
            >
              <div className="relative z-10 mx-auto mb-5 h-[120px] w-[120px]">
                <img
                  src="../../assets/images/team/team-01.png"
                  alt="team image"
                  className="h-[120px] w-[120px] rounded-full"
                />
                <span
                  className="absolute bottom-0 left-0 -z-10 h-10 w-10 rounded-full bg-secondary opacity-0 transition-all group-hover:opacity-100"
                ></span>
                <span
                  className="absolute right-0 top-0 -z-10 opacity-0 transition-all group-hover:opacity-100"
                >
                  <svg
                    width="55"
                    height="53"
                    viewBox="0 0 55 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5118 3.1009C13.3681 3.1009 14.0622 2.40674 14.0622 1.55045C14.0622 0.69416 13.3681 0 12.5118 0C11.6555 0 10.9613 0.69416 10.9613 1.55045C10.9613 2.40674 11.6555 3.1009 12.5118 3.1009Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.5038 3.1009C23.3601 3.1009 24.0543 2.40674 24.0543 1.55045C24.0543 0.69416 23.3601 0 22.5038 0C21.6475 0 20.9534 0.69416 20.9534 1.55045C20.9534 2.40674 21.6475 3.1009 22.5038 3.1009Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.4958 3.1009C33.3521 3.1009 34.0463 2.40674 34.0463 1.55045C34.0463 0.69416 33.3521 0 32.4958 0C31.6395 0 30.9454 0.69416 30.9454 1.55045C30.9454 2.40674 31.6395 3.1009 32.4958 3.1009Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.4875 3.1009C43.3438 3.1009 44.038 2.40674 44.038 1.55045C44.038 0.69416 43.3438 0 42.4875 0C41.6312 0 40.9371 0.69416 40.9371 1.55045C40.9371 2.40674 41.6312 3.1009 42.4875 3.1009Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M52.4795 3.1009C53.3358 3.1009 54.03 2.40674 54.03 1.55045C54.03 0.69416 53.3358 0 52.4795 0C51.6233 0 50.9291 0.69416 50.9291 1.55045C50.9291 2.40674 51.6233 3.1009 52.4795 3.1009Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.52045 13.0804C3.37674 13.0804 4.0709 12.3862 4.0709 11.5299C4.0709 10.6737 3.37674 9.97949 2.52045 9.97949C1.66416 9.97949 0.970001 10.6737 0.970001 11.5299C0.970001 12.3862 1.66416 13.0804 2.52045 13.0804Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5118 13.0804C13.3681 13.0804 14.0622 12.3862 14.0622 11.5299C14.0622 10.6737 13.3681 9.97949 12.5118 9.97949C11.6555 9.97949 10.9613 10.6737 10.9613 11.5299C10.9613 12.3862 11.6555 13.0804 12.5118 13.0804Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.5038 13.0804C23.3601 13.0804 24.0543 12.3862 24.0543 11.5299C24.0543 10.6737 23.3601 9.97949 22.5038 9.97949C21.6475 9.97949 20.9534 10.6737 20.9534 11.5299C20.9534 12.3862 21.6475 13.0804 22.5038 13.0804Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.4958 13.0804C33.3521 13.0804 34.0463 12.3862 34.0463 11.5299C34.0463 10.6737 33.3521 9.97949 32.4958 9.97949C31.6395 9.97949 30.9454 10.6737 30.9454 11.5299C30.9454 12.3862 31.6395 13.0804 32.4958 13.0804Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.4875 13.0804C43.3438 13.0804 44.038 12.3862 44.038 11.5299C44.038 10.6737 43.3438 9.97949 42.4875 9.97949C41.6312 9.97949 40.9371 10.6737 40.9371 11.5299C40.9371 12.3862 41.6312 13.0804 42.4875 13.0804Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M52.4795 13.0804C53.3358 13.0804 54.03 12.3862 54.03 11.5299C54.03 10.6737 53.3358 9.97949 52.4795 9.97949C51.6233 9.97949 50.9291 10.6737 50.9291 11.5299C50.9291 12.3862 51.6233 13.0804 52.4795 13.0804Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.52045 23.0604C3.37674 23.0604 4.0709 22.3662 4.0709 21.5099C4.0709 20.6536 3.37674 19.9595 2.52045 19.9595C1.66416 19.9595 0.970001 20.6536 0.970001 21.5099C0.970001 22.3662 1.66416 23.0604 2.52045 23.0604Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5118 23.0604C13.3681 23.0604 14.0622 22.3662 14.0622 21.5099C14.0622 20.6536 13.3681 19.9595 12.5118 19.9595C11.6555 19.9595 10.9613 20.6536 10.9613 21.5099C10.9613 22.3662 11.6555 23.0604 12.5118 23.0604Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.5038 23.0604C23.3601 23.0604 24.0543 22.3662 24.0543 21.5099C24.0543 20.6536 23.3601 19.9595 22.5038 19.9595C21.6475 19.9595 20.9534 20.6536 20.9534 21.5099C20.9534 22.3662 21.6475 23.0604 22.5038 23.0604Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.4958 23.0604C33.3521 23.0604 34.0463 22.3662 34.0463 21.5099C34.0463 20.6536 33.3521 19.9595 32.4958 19.9595C31.6395 19.9595 30.9454 20.6536 30.9454 21.5099C30.9454 22.3662 31.6395 23.0604 32.4958 23.0604Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.4875 23.0604C43.3438 23.0604 44.038 22.3662 44.038 21.5099C44.038 20.6536 43.3438 19.9595 42.4875 19.9595C41.6312 19.9595 40.9371 20.6536 40.9371 21.5099C40.9371 22.3662 41.6312 23.0604 42.4875 23.0604Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M52.4795 23.0604C53.3358 23.0604 54.03 22.3662 54.03 21.5099C54.03 20.6536 53.3358 19.9595 52.4795 19.9595C51.6233 19.9595 50.9291 20.6536 50.9291 21.5099C50.9291 22.3662 51.6233 23.0604 52.4795 23.0604Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.52045 33.0404C3.37674 33.0404 4.0709 32.3462 4.0709 31.4899C4.0709 30.6336 3.37674 29.9395 2.52045 29.9395C1.66416 29.9395 0.970001 30.6336 0.970001 31.4899C0.970001 32.3462 1.66416 33.0404 2.52045 33.0404Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5118 33.0404C13.3681 33.0404 14.0622 32.3462 14.0622 31.4899C14.0622 30.6336 13.3681 29.9395 12.5118 29.9395C11.6555 29.9395 10.9613 30.6336 10.9613 31.4899C10.9613 32.3462 11.6555 33.0404 12.5118 33.0404Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.5038 33.0404C23.3601 33.0404 24.0543 32.3462 24.0543 31.4899C24.0543 30.6336 23.3601 29.9395 22.5038 29.9395C21.6475 29.9395 20.9534 30.6336 20.9534 31.4899C20.9534 32.3462 21.6475 33.0404 22.5038 33.0404Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.4958 33.0404C33.3521 33.0404 34.0463 32.3462 34.0463 31.4899C34.0463 30.6336 33.3521 29.9395 32.4958 29.9395C31.6395 29.9395 30.9454 30.6336 30.9454 31.4899C30.9454 32.3462 31.6395 33.0404 32.4958 33.0404Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.4875 33.0404C43.3438 33.0404 44.038 32.3462 44.038 31.4899C44.038 30.6336 43.3438 29.9395 42.4875 29.9395C41.6312 29.9395 40.9371 30.6336 40.9371 31.4899C40.9371 32.3462 41.6312 33.0404 42.4875 33.0404Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M52.4795 33.0404C53.3358 33.0404 54.03 32.3462 54.03 31.4899C54.03 30.6336 53.3358 29.9395 52.4795 29.9395C51.6233 29.9395 50.9291 30.6336 50.9291 31.4899C50.9291 32.3462 51.6233 33.0404 52.4795 33.0404Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.52045 43.0203C3.37674 43.0203 4.0709 42.3262 4.0709 41.4699C4.0709 40.6136 3.37674 39.9194 2.52045 39.9194C1.66416 39.9194 0.970001 40.6136 0.970001 41.4699C0.970001 42.3262 1.66416 43.0203 2.52045 43.0203Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5118 43.0203C13.3681 43.0203 14.0622 42.3262 14.0622 41.4699C14.0622 40.6136 13.3681 39.9194 12.5118 39.9194C11.6555 39.9194 10.9613 40.6136 10.9613 41.4699C10.9613 42.3262 11.6555 43.0203 12.5118 43.0203Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.5038 43.0203C23.3601 43.0203 24.0543 42.3262 24.0543 41.4699C24.0543 40.6136 23.3601 39.9194 22.5038 39.9194C21.6475 39.9194 20.9534 40.6136 20.9534 41.4699C20.9534 42.3262 21.6475 43.0203 22.5038 43.0203Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.4958 43.0203C33.3521 43.0203 34.0463 42.3262 34.0463 41.4699C34.0463 40.6136 33.3521 39.9194 32.4958 39.9194C31.6395 39.9194 30.9454 40.6136 30.9454 41.4699C30.9454 42.3262 31.6395 43.0203 32.4958 43.0203Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.4875 43.0203C43.3438 43.0203 44.038 42.3262 44.038 41.4699C44.038 40.6136 43.3438 39.9194 42.4875 39.9194C41.6312 39.9194 40.9371 40.6136 40.9371 41.4699C40.9371 42.3262 41.6312 43.0203 42.4875 43.0203Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M52.4795 43.0203C53.3358 43.0203 54.03 42.3262 54.03 41.4699C54.03 40.6136 53.3358 39.9194 52.4795 39.9194C51.6233 39.9194 50.9291 40.6136 50.9291 41.4699C50.9291 42.3262 51.6233 43.0203 52.4795 43.0203Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.52045 53.0001C3.37674 53.0001 4.0709 52.3059 4.0709 51.4496C4.0709 50.5933 3.37674 49.8992 2.52045 49.8992C1.66416 49.8992 0.970001 50.5933 0.970001 51.4496C0.970001 52.3059 1.66416 53.0001 2.52045 53.0001Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5118 53.0001C13.3681 53.0001 14.0622 52.3059 14.0622 51.4496C14.0622 50.5933 13.3681 49.8992 12.5118 49.8992C11.6555 49.8992 10.9613 50.5933 10.9613 51.4496C10.9613 52.3059 11.6555 53.0001 12.5118 53.0001Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.5038 53.0001C23.3601 53.0001 24.0543 52.3059 24.0543 51.4496C24.0543 50.5933 23.3601 49.8992 22.5038 49.8992C21.6475 49.8992 20.9534 50.5933 20.9534 51.4496C20.9534 52.3059 21.6475 53.0001 22.5038 53.0001Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.4958 53.0001C33.3521 53.0001 34.0463 52.3059 34.0463 51.4496C34.0463 50.5933 33.3521 49.8992 32.4958 49.8992C31.6395 49.8992 30.9454 50.5933 30.9454 51.4496C30.9454 52.3059 31.6395 53.0001 32.4958 53.0001Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.4875 53.0001C43.3438 53.0001 44.038 52.3059 44.038 51.4496C44.038 50.5933 43.3438 49.8992 42.4875 49.8992C41.6312 49.8992 40.9371 50.5933 40.9371 51.4496C40.9371 52.3059 41.6312 53.0001 42.4875 53.0001Z"
                      fill="#3758F9"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M52.4795 53.0001C53.3358 53.0001 54.03 52.3059 54.03 51.4496C54.03 50.5933 53.3358 49.8992 52.4795 49.8992C51.6233 49.8992 50.9291 50.5933 50.9291 51.4496C50.9291 52.3059 51.6233 53.0001 52.4795 53.0001Z"
                      fill="#3758F9"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-center">
                <h4
                  className="mb-1 text-lg font-semibold text-dark dark:text-white"
                >
                  Melissa Tatcher
                </h4>
                <p className="mb-5 text-sm text-body-color dark:text-dark-6">
                  Marketing Expert
                </p>
                <div className="flex items-center justify-center gap-5">
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M13.3315 7.25625H11.7565H11.194V6.69375V4.95V4.3875H11.7565H12.9377C13.2471 4.3875 13.5002 4.1625 13.5002 3.825V0.84375C13.5002 0.534375 13.2752 0.28125 12.9377 0.28125H10.8846C8.66272 0.28125 7.11584 1.85625 7.11584 4.19062V6.6375V7.2H6.55334H4.64084C4.24709 7.2 3.88147 7.50937 3.88147 7.95937V9.98438C3.88147 10.3781 4.19084 10.7438 4.64084 10.7438H6.49709H7.05959V11.3063V16.9594C7.05959 17.3531 7.36897 17.7188 7.81897 17.7188H10.4627C10.6315 17.7188 10.7721 17.6344 10.8846 17.5219C10.9971 17.4094 11.0815 17.2125 11.0815 17.0437V11.3344V10.7719H11.6721H12.9377C13.3033 10.7719 13.5846 10.5469 13.6408 10.2094V10.1813V10.1531L14.0346 8.2125C14.0627 8.01562 14.0346 7.79063 13.8658 7.56562C13.8096 7.425 13.5565 7.28437 13.3315 7.25625Z"
                        fill=""
                      />
                    </svg>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M16.4647 4.83752C16.565 4.72065 16.4343 4.56793 16.2859 4.62263C15.9549 4.74474 15.6523 4.82528 15.2049 4.875C15.7552 4.56855 16.0112 4.13054 16.2194 3.59407C16.2696 3.46467 16.1182 3.34725 15.9877 3.40907C15.458 3.66023 14.8864 3.84658 14.2854 3.95668C13.6913 3.3679 12.8445 3 11.9077 3C10.1089 3 8.65027 4.35658 8.65027 6.02938C8.65027 6.26686 8.67937 6.49818 8.73427 6.71966C6.14854 6.59919 3.84286 5.49307 2.24098 3.79696C2.13119 3.68071 1.93197 3.69614 1.86361 3.83792C1.68124 4.21619 1.57957 4.63582 1.57957 5.07762C1.57957 6.12843 2.15446 7.05557 3.02837 7.59885C2.63653 7.58707 2.2618 7.51073 1.91647 7.38116C1.74834 7.31808 1.5556 7.42893 1.57819 7.59847C1.75162 8.9004 2.80568 9.97447 4.16624 10.2283C3.89302 10.2978 3.60524 10.3347 3.30754 10.3347C3.23536 10.3347 3.16381 10.3324 3.0929 10.3281C2.91247 10.3169 2.76583 10.4783 2.84319 10.6328C3.35357 11.6514 4.45563 12.3625 5.73809 12.3847C4.62337 13.1974 3.21889 13.6816 1.69269 13.6816C1.50451 13.6816 1.42378 13.9235 1.59073 14.0056C2.88015 14.6394 4.34854 15 5.90878 15C11.9005 15 15.1765 10.384 15.1765 6.38067C15.1765 6.24963 15.1732 6.11858 15.1672 5.98877C15.6535 5.66205 16.0907 5.27354 16.4647 4.83752Z"
                        fill=""
                      />
                    </svg>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M9.02429 11.8066C10.5742 11.8066 11.8307 10.5501 11.8307 9.00018C11.8307 7.45022 10.5742 6.19373 9.02429 6.19373C7.47433 6.19373 6.21783 7.45022 6.21783 9.00018C6.21783 10.5501 7.47433 11.8066 9.02429 11.8066Z"
                        fill=""
                      />
                      <path
                        d="M12.0726 1.5H5.92742C3.48387 1.5 1.5 3.48387 1.5 5.92742V12.0242C1.5 14.5161 3.48387 16.5 5.92742 16.5H12.0242C14.5161 16.5 16.5 14.5161 16.5 12.0726V5.92742C16.5 3.48387 14.5161 1.5 12.0726 1.5ZM9.02419 12.6774C6.96774 12.6774 5.34677 11.0081 5.34677 9C5.34677 6.99194 6.99194 5.32258 9.02419 5.32258C11.0323 5.32258 12.6774 6.99194 12.6774 9C12.6774 11.0081 11.0565 12.6774 9.02419 12.6774ZM14.1048 5.66129C13.8629 5.92742 13.5 6.07258 13.0887 6.07258C12.7258 6.07258 12.3629 5.92742 12.0726 5.66129C11.8065 5.39516 11.6613 5.05645 11.6613 4.64516C11.6613 4.23387 11.8065 3.91935 12.0726 3.62903C12.3387 3.33871 12.6774 3.19355 13.0887 3.19355C13.4516 3.19355 13.8387 3.33871 14.1048 3.60484C14.3468 3.91935 14.5161 4.28226 14.5161 4.66935C14.4919 5.05645 14.3468 5.39516 14.1048 5.66129Z"
                        fill=""
                      />
                      <path
                        d="M13.1135 4.06433C12.799 4.06433 12.5329 4.33046 12.5329 4.64498C12.5329 4.95949 12.799 5.22562 13.1135 5.22562C13.428 5.22562 13.6942 4.95949 13.6942 4.64498C13.6942 4.33046 13.4522 4.06433 13.1135 4.06433Z"
                        fill=""
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
            <div
              className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none"
            >
              <div className="relative z-10 mx-auto mb-5 h-[120px] w-[120px]">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-02.png"
                  alt="team image"
                  className="h-[120px] w-[120px] rounded-full"
                />
                <span
                  className="absolute bottom-0 left-0 -z-10 h-10 w-10 rounded-full bg-secondary opacity-0 transition-all group-hover:opacity-100"
                ></span>
                <span
                  className="absolute right-0 top-0 -z-10 opacity-0 transition-all group-hover:opacity-100"
                >
                  <svg
                    width="45"
                    height="53"
                    viewBox="0 0 45 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.54166 3.1009C3.39795 3.1009 4.09211 2.40674 4.09211 1.55045C4.09211 0.69416 3.39795 0 2.54166 0C1.68537 0 0.991211 0.69416 0.991211 1.55045C0.991211 2.40674 1.68537 3.1009 2.54166 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5338 3.1009C13.3901 3.1009 14.0843 2.40674 14.0843 1.55045C14.0843 0.69416 13.3901 0 12.5338 0C11.6776 0 10.9834 0.69416 10.9834 1.55045C10.9834 2.40674 11.6776 3.1009 12.5338 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 3.1009C23.3823 3.1009 24.0765 2.40674 24.0765 1.55045C24.0765 0.69416 23.3823 0 22.526 0C21.6697 0 20.9756 0.69416 20.9756 1.55045C20.9756 2.40674 21.6697 3.1009 22.526 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 3.1009C33.374 3.1009 34.0682 2.40674 34.0682 1.55045C34.0682 0.69416 33.374 0 32.5177 0C31.6614 0 30.9673 0.69416 30.9673 1.55045C30.9673 2.40674 31.6614 3.1009 32.5177 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 3.1009C43.3657 3.1009 44.0599 2.40674 44.0599 1.55045C44.0599 0.69416 43.3657 0 42.5094 0C41.6531 0 40.959 0.69416 40.959 1.55045C40.959 2.40674 41.6531 3.1009 42.5094 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5338 13.0804C13.3901 13.0804 14.0843 12.3862 14.0843 11.5299C14.0843 10.6737 13.3901 9.97949 12.5338 9.97949C11.6776 9.97949 10.9834 10.6737 10.9834 11.5299C10.9834 12.3862 11.6776 13.0804 12.5338 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 13.0804C23.3823 13.0804 24.0765 12.3862 24.0765 11.5299C24.0765 10.6737 23.3823 9.97949 22.526 9.97949C21.6697 9.97949 20.9756 10.6737 20.9756 11.5299C20.9756 12.3862 21.6697 13.0804 22.526 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 13.0804C33.374 13.0804 34.0682 12.3862 34.0682 11.5299C34.0682 10.6737 33.374 9.97949 32.5177 9.97949C31.6614 9.97949 30.9673 10.6737 30.9673 11.5299C30.9673 12.3862 31.6614 13.0804 32.5177 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 13.0804C43.3657 13.0804 44.0599 12.3862 44.0599 11.5299C44.0599 10.6737 43.3657 9.97949 42.5094 9.97949C41.6531 9.97949 40.959 10.6737 40.959 11.5299C40.959 12.3862 41.6531 13.0804 42.5094 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 23.0604C23.3823 23.0604 24.0765 22.3662 24.0765 21.5099C24.0765 20.6536 23.3823 19.9595 22.526 19.9595C21.6697 19.9595 20.9756 20.6536 20.9756 21.5099C20.9756 22.3662 21.6697 23.0604 22.526 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 23.0604C33.374 23.0604 34.0682 22.3662 34.0682 21.5099C34.0682 20.6536 33.374 19.9595 32.5177 19.9595C31.6614 19.9595 30.9673 20.6536 30.9673 21.5099C30.9673 22.3662 31.6614 23.0604 32.5177 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 23.0604C43.3657 23.0604 44.0599 22.3662 44.0599 21.5099C44.0599 20.6536 43.3657 19.9595 42.5094 19.9595C41.6531 19.9595 40.959 20.6536 40.959 21.5099C40.959 22.3662 41.6531 23.0604 42.5094 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 33.0404C33.374 33.0404 34.0682 32.3462 34.0682 31.4899C34.0682 30.6336 33.374 29.9395 32.5177 29.9395C31.6614 29.9395 30.9673 30.6336 30.9673 31.4899C30.9673 32.3462 31.6614 33.0404 32.5177 33.0404Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 33.0404C43.3657 33.0404 44.0599 32.3462 44.0599 31.4899C44.0599 30.6336 43.3657 29.9395 42.5094 29.9395C41.6531 29.9395 40.959 30.6336 40.959 31.4899C40.959 32.3462 41.6531 33.0404 42.5094 33.0404Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 43.0203C33.374 43.0203 34.0682 42.3262 34.0682 41.4699C34.0682 40.6136 33.374 39.9194 32.5177 39.9194C31.6614 39.9194 30.9673 40.6136 30.9673 41.4699C30.9673 42.3262 31.6614 43.0203 32.5177 43.0203Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 43.0203C43.3657 43.0203 44.0599 42.3262 44.0599 41.4699C44.0599 40.6136 43.3657 39.9194 42.5094 39.9194C41.6531 39.9194 40.959 40.6136 40.959 41.4699C40.959 42.3262 41.6531 43.0203 42.5094 43.0203Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 52.9998C43.3657 52.9998 44.0599 52.3057 44.0599 51.4494C44.0599 50.5931 43.3657 49.8989 42.5094 49.8989C41.6531 49.8989 40.959 50.5931 40.959 51.4494C40.959 52.3057 41.6531 52.9998 42.5094 52.9998Z"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-center">
                <h4
                  className="mb-1 text-lg font-semibold text-dark dark:text-white"
                >
                  Stuard Ferrel
                </h4>
                <p className="mb-5 text-sm text-body-color dark:text-dark-6">
                  Digital Marketer
                </p>
                <div className="flex items-center justify-center gap-5">
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M13.3315 7.25625H11.7565H11.194V6.69375V4.95V4.3875H11.7565H12.9377C13.2471 4.3875 13.5002 4.1625 13.5002 3.825V0.84375C13.5002 0.534375 13.2752 0.28125 12.9377 0.28125H10.8846C8.66272 0.28125 7.11584 1.85625 7.11584 4.19062V6.6375V7.2H6.55334H4.64084C4.24709 7.2 3.88147 7.50937 3.88147 7.95937V9.98438C3.88147 10.3781 4.19084 10.7438 4.64084 10.7438H6.49709H7.05959V11.3063V16.9594C7.05959 17.3531 7.36897 17.7188 7.81897 17.7188H10.4627C10.6315 17.7188 10.7721 17.6344 10.8846 17.5219C10.9971 17.4094 11.0815 17.2125 11.0815 17.0437V11.3344V10.7719H11.6721H12.9377C13.3033 10.7719 13.5846 10.5469 13.6408 10.2094V10.1813V10.1531L14.0346 8.2125C14.0627 8.01562 14.0346 7.79063 13.8658 7.56562C13.8096 7.425 13.5565 7.28437 13.3315 7.25625Z"
                        fill=""
                      />
                    </svg>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M16.4647 4.83752C16.565 4.72065 16.4343 4.56793 16.2859 4.62263C15.9549 4.74474 15.6523 4.82528 15.2049 4.875C15.7552 4.56855 16.0112 4.13054 16.2194 3.59407C16.2696 3.46467 16.1182 3.34725 15.9877 3.40907C15.458 3.66023 14.8864 3.84658 14.2854 3.95668C13.6913 3.3679 12.8445 3 11.9077 3C10.1089 3 8.65027 4.35658 8.65027 6.02938C8.65027 6.26686 8.67937 6.49818 8.73427 6.71966C6.14854 6.59919 3.84286 5.49307 2.24098 3.79696C2.13119 3.68071 1.93197 3.69614 1.86361 3.83792C1.68124 4.21619 1.57957 4.63582 1.57957 5.07762C1.57957 6.12843 2.15446 7.05557 3.02837 7.59885C2.63653 7.58707 2.2618 7.51073 1.91647 7.38116C1.74834 7.31808 1.5556 7.42893 1.57819 7.59847C1.75162 8.9004 2.80568 9.97447 4.16624 10.2283C3.89302 10.2978 3.60524 10.3347 3.30754 10.3347C3.23536 10.3347 3.16381 10.3324 3.0929 10.3281C2.91247 10.3169 2.76583 10.4783 2.84319 10.6328C3.35357 11.6514 4.45563 12.3625 5.73809 12.3847C4.62337 13.1974 3.21889 13.6816 1.69269 13.6816C1.50451 13.6816 1.42378 13.9235 1.59073 14.0056C2.88015 14.6394 4.34854 15 5.90878 15C11.9005 15 15.1765 10.384 15.1765 6.38067C15.1765 6.24963 15.1732 6.11858 15.1672 5.98877C15.6535 5.66205 16.0907 5.27354 16.4647 4.83752Z"
                        fill=""
                      />
                    </svg>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M9.02429 11.8066C10.5742 11.8066 11.8307 10.5501 11.8307 9.00018C11.8307 7.45022 10.5742 6.19373 9.02429 6.19373C7.47433 6.19373 6.21783 7.45022 6.21783 9.00018C6.21783 10.5501 7.47433 11.8066 9.02429 11.8066Z"
                        fill=""
                      />
                      <path
                        d="M12.0726 1.5H5.92742C3.48387 1.5 1.5 3.48387 1.5 5.92742V12.0242C1.5 14.5161 3.48387 16.5 5.92742 16.5H12.0242C14.5161 16.5 16.5 14.5161 16.5 12.0726V5.92742C16.5 3.48387 14.5161 1.5 12.0726 1.5ZM9.02419 12.6774C6.96774 12.6774 5.34677 11.0081 5.34677 9C5.34677 6.99194 6.99194 5.32258 9.02419 5.32258C11.0323 5.32258 12.6774 6.99194 12.6774 9C12.6774 11.0081 11.0565 12.6774 9.02419 12.6774ZM14.1048 5.66129C13.8629 5.92742 13.5 6.07258 13.0887 6.07258C12.7258 6.07258 12.3629 5.92742 12.0726 5.66129C11.8065 5.39516 11.6613 5.05645 11.6613 4.64516C11.6613 4.23387 11.8065 3.91935 12.0726 3.62903C12.3387 3.33871 12.6774 3.19355 13.0887 3.19355C13.4516 3.19355 13.8387 3.33871 14.1048 3.60484C14.3468 3.91935 14.5161 4.28226 14.5161 4.66935C14.4919 5.05645 14.3468 5.39516 14.1048 5.66129Z"
                        fill=""
                      />
                      <path
                        d="M13.1135 4.06433C12.799 4.06433 12.5329 4.33046 12.5329 4.64498C12.5329 4.95949 12.799 5.22562 13.1135 5.22562C13.428 5.22562 13.6942 4.95949 13.6942 4.64498C13.6942 4.33046 13.4522 4.06433 13.1135 4.06433Z"
                        fill=""
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
            <div
              className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none"
            >
              <div className="relative z-10 mx-auto mb-5 h-[120px] w-[120px]">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-03.png"
                  alt="team image"
                  className="h-[120px] w-[120px] rounded-full"
                />
                <span
                  className="absolute bottom-0 left-0 -z-10 h-10 w-10 rounded-full bg-secondary opacity-0 transition-all group-hover:opacity-100"
                ></span>
                <span
                  className="absolute right-0 top-0 -z-10 opacity-0 transition-all group-hover:opacity-100"
                >
                  <svg
                    width="45"
                    height="53"
                    viewBox="0 0 45 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.54166 3.1009C3.39795 3.1009 4.09211 2.40674 4.09211 1.55045C4.09211 0.69416 3.39795 0 2.54166 0C1.68537 0 0.991211 0.69416 0.991211 1.55045C0.991211 2.40674 1.68537 3.1009 2.54166 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5338 3.1009C13.3901 3.1009 14.0843 2.40674 14.0843 1.55045C14.0843 0.69416 13.3901 0 12.5338 0C11.6776 0 10.9834 0.69416 10.9834 1.55045C10.9834 2.40674 11.6776 3.1009 12.5338 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 3.1009C23.3823 3.1009 24.0765 2.40674 24.0765 1.55045C24.0765 0.69416 23.3823 0 22.526 0C21.6697 0 20.9756 0.69416 20.9756 1.55045C20.9756 2.40674 21.6697 3.1009 22.526 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 3.1009C33.374 3.1009 34.0682 2.40674 34.0682 1.55045C34.0682 0.69416 33.374 0 32.5177 0C31.6614 0 30.9673 0.69416 30.9673 1.55045C30.9673 2.40674 31.6614 3.1009 32.5177 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 3.1009C43.3657 3.1009 44.0599 2.40674 44.0599 1.55045C44.0599 0.69416 43.3657 0 42.5094 0C41.6531 0 40.959 0.69416 40.959 1.55045C40.959 2.40674 41.6531 3.1009 42.5094 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5338 13.0804C13.3901 13.0804 14.0843 12.3862 14.0843 11.5299C14.0843 10.6737 13.3901 9.97949 12.5338 9.97949C11.6776 9.97949 10.9834 10.6737 10.9834 11.5299C10.9834 12.3862 11.6776 13.0804 12.5338 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 13.0804C23.3823 13.0804 24.0765 12.3862 24.0765 11.5299C24.0765 10.6737 23.3823 9.97949 22.526 9.97949C21.6697 9.97949 20.9756 10.6737 20.9756 11.5299C20.9756 12.3862 21.6697 13.0804 22.526 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 13.0804C33.374 13.0804 34.0682 12.3862 34.0682 11.5299C34.0682 10.6737 33.374 9.97949 32.5177 9.97949C31.6614 9.97949 30.9673 10.6737 30.9673 11.5299C30.9673 12.3862 31.6614 13.0804 32.5177 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 13.0804C43.3657 13.0804 44.0599 12.3862 44.0599 11.5299C44.0599 10.6737 43.3657 9.97949 42.5094 9.97949C41.6531 9.97949 40.959 10.6737 40.959 11.5299C40.959 12.3862 41.6531 13.0804 42.5094 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 23.0604C23.3823 23.0604 24.0765 22.3662 24.0765 21.5099C24.0765 20.6536 23.3823 19.9595 22.526 19.9595C21.6697 19.9595 20.9756 20.6536 20.9756 21.5099C20.9756 22.3662 21.6697 23.0604 22.526 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 23.0604C33.374 23.0604 34.0682 22.3662 34.0682 21.5099C34.0682 20.6536 33.374 19.9595 32.5177 19.9595C31.6614 19.9595 30.9673 20.6536 30.9673 21.5099C30.9673 22.3662 31.6614 23.0604 32.5177 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 23.0604C43.3657 23.0604 44.0599 22.3662 44.0599 21.5099C44.0599 20.6536 43.3657 19.9595 42.5094 19.9595C41.6531 19.9595 40.959 20.6536 40.959 21.5099C40.959 22.3662 41.6531 23.0604 42.5094 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 33.0404C33.374 33.0404 34.0682 32.3462 34.0682 31.4899C34.0682 30.6336 33.374 29.9395 32.5177 29.9395C31.6614 29.9395 30.9673 30.6336 30.9673 31.4899C30.9673 32.3462 31.6614 33.0404 32.5177 33.0404Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 33.0404C43.3657 33.0404 44.0599 32.3462 44.0599 31.4899C44.0599 30.6336 43.3657 29.9395 42.5094 29.9395C41.6531 29.9395 40.959 30.6336 40.959 31.4899C40.959 32.3462 41.6531 33.0404 42.5094 33.0404Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 43.0203C33.374 43.0203 34.0682 42.3262 34.0682 41.4699C34.0682 40.6136 33.374 39.9194 32.5177 39.9194C31.6614 39.9194 30.9673 40.6136 30.9673 41.4699C30.9673 42.3262 31.6614 43.0203 32.5177 43.0203Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 43.0203C43.3657 43.0203 44.0599 42.3262 44.0599 41.4699C44.0599 40.6136 43.3657 39.9194 42.5094 39.9194C41.6531 39.9194 40.959 40.6136 40.959 41.4699C40.959 42.3262 41.6531 43.0203 42.5094 43.0203Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 52.9998C43.3657 52.9998 44.0599 52.3057 44.0599 51.4494C44.0599 50.5931 43.3657 49.8989 42.5094 49.8989C41.6531 49.8989 40.959 50.5931 40.959 51.4494C40.959 52.3057 41.6531 52.9998 42.5094 52.9998Z"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-center">
                <h4
                  className="mb-1 text-lg font-semibold text-dark dark:text-white"
                >
                  Eva Hudson
                </h4>
                <p className="mb-5 text-sm text-body-color dark:text-dark-6">
                  Creative Designer
                </p>
                <div className="flex items-center justify-center gap-5">
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M13.3315 7.25625H11.7565H11.194V6.69375V4.95V4.3875H11.7565H12.9377C13.2471 4.3875 13.5002 4.1625 13.5002 3.825V0.84375C13.5002 0.534375 13.2752 0.28125 12.9377 0.28125H10.8846C8.66272 0.28125 7.11584 1.85625 7.11584 4.19062V6.6375V7.2H6.55334H4.64084C4.24709 7.2 3.88147 7.50937 3.88147 7.95937V9.98438C3.88147 10.3781 4.19084 10.7438 4.64084 10.7438H6.49709H7.05959V11.3063V16.9594C7.05959 17.3531 7.36897 17.7188 7.81897 17.7188H10.4627C10.6315 17.7188 10.7721 17.6344 10.8846 17.5219C10.9971 17.4094 11.0815 17.2125 11.0815 17.0437V11.3344V10.7719H11.6721H12.9377C13.3033 10.7719 13.5846 10.5469 13.6408 10.2094V10.1813V10.1531L14.0346 8.2125C14.0627 8.01562 14.0346 7.79063 13.8658 7.56562C13.8096 7.425 13.5565 7.28437 13.3315 7.25625Z"
                        fill=""
                      />
                    </svg>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M16.4647 4.83752C16.565 4.72065 16.4343 4.56793 16.2859 4.62263C15.9549 4.74474 15.6523 4.82528 15.2049 4.875C15.7552 4.56855 16.0112 4.13054 16.2194 3.59407C16.2696 3.46467 16.1182 3.34725 15.9877 3.40907C15.458 3.66023 14.8864 3.84658 14.2854 3.95668C13.6913 3.3679 12.8445 3 11.9077 3C10.1089 3 8.65027 4.35658 8.65027 6.02938C8.65027 6.26686 8.67937 6.49818 8.73427 6.71966C6.14854 6.59919 3.84286 5.49307 2.24098 3.79696C2.13119 3.68071 1.93197 3.69614 1.86361 3.83792C1.68124 4.21619 1.57957 4.63582 1.57957 5.07762C1.57957 6.12843 2.15446 7.05557 3.02837 7.59885C2.63653 7.58707 2.2618 7.51073 1.91647 7.38116C1.74834 7.31808 1.5556 7.42893 1.57819 7.59847C1.75162 8.9004 2.80568 9.97447 4.16624 10.2283C3.89302 10.2978 3.60524 10.3347 3.30754 10.3347C3.23536 10.3347 3.16381 10.3324 3.0929 10.3281C2.91247 10.3169 2.76583 10.4783 2.84319 10.6328C3.35357 11.6514 4.45563 12.3625 5.73809 12.3847C4.62337 13.1974 3.21889 13.6816 1.69269 13.6816C1.50451 13.6816 1.42378 13.9235 1.59073 14.0056C2.88015 14.6394 4.34854 15 5.90878 15C11.9005 15 15.1765 10.384 15.1765 6.38067C15.1765 6.24963 15.1732 6.11858 15.1672 5.98877C15.6535 5.66205 16.0907 5.27354 16.4647 4.83752Z"
                        fill=""
                      />
                    </svg>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M9.02429 11.8066C10.5742 11.8066 11.8307 10.5501 11.8307 9.00018C11.8307 7.45022 10.5742 6.19373 9.02429 6.19373C7.47433 6.19373 6.21783 7.45022 6.21783 9.00018C6.21783 10.5501 7.47433 11.8066 9.02429 11.8066Z"
                        fill=""
                      />
                      <path
                        d="M12.0726 1.5H5.92742C3.48387 1.5 1.5 3.48387 1.5 5.92742V12.0242C1.5 14.5161 3.48387 16.5 5.92742 16.5H12.0242C14.5161 16.5 16.5 14.5161 16.5 12.0726V5.92742C16.5 3.48387 14.5161 1.5 12.0726 1.5ZM9.02419 12.6774C6.96774 12.6774 5.34677 11.0081 5.34677 9C5.34677 6.99194 6.99194 5.32258 9.02419 5.32258C11.0323 5.32258 12.6774 6.99194 12.6774 9C12.6774 11.0081 11.0565 12.6774 9.02419 12.6774ZM14.1048 5.66129C13.8629 5.92742 13.5 6.07258 13.0887 6.07258C12.7258 6.07258 12.3629 5.92742 12.0726 5.66129C11.8065 5.39516 11.6613 5.05645 11.6613 4.64516C11.6613 4.23387 11.8065 3.91935 12.0726 3.62903C12.3387 3.33871 12.6774 3.19355 13.0887 3.19355C13.4516 3.19355 13.8387 3.33871 14.1048 3.60484C14.3468 3.91935 14.5161 4.28226 14.5161 4.66935C14.4919 5.05645 14.3468 5.39516 14.1048 5.66129Z"
                        fill=""
                      />
                      <path
                        d="M13.1135 4.06433C12.799 4.06433 12.5329 4.33046 12.5329 4.64498C12.5329 4.95949 12.799 5.22562 13.1135 5.22562C13.428 5.22562 13.6942 4.95949 13.6942 4.64498C13.6942 4.33046 13.4522 4.06433 13.1135 4.06433Z"
                        fill=""
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 lg:w-1/4 xl:w-1/4">
            <div
              className="group mb-8 rounded-xl bg-white px-5 pb-10 pt-12 shadow-testimonial dark:bg-dark dark:shadow-none"
            >
              <div className="relative z-10 mx-auto mb-5 h-[120px] w-[120px]">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/team/image-07/image-04.png"
                  alt="team image"
                  className="h-[120px] w-[120px] rounded-full"
                />
                <span
                  className="absolute bottom-0 left-0 -z-10 h-10 w-10 rounded-full bg-secondary opacity-0 transition-all group-hover:opacity-100"
                ></span>
                <span
                  className="absolute right-0 top-0 -z-10 opacity-0 transition-all group-hover:opacity-100"
                >
                  <svg
                    width="45"
                    height="53"
                    viewBox="0 0 45 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.54166 3.1009C3.39795 3.1009 4.09211 2.40674 4.09211 1.55045C4.09211 0.69416 3.39795 0 2.54166 0C1.68537 0 0.991211 0.69416 0.991211 1.55045C0.991211 2.40674 1.68537 3.1009 2.54166 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5338 3.1009C13.3901 3.1009 14.0843 2.40674 14.0843 1.55045C14.0843 0.69416 13.3901 0 12.5338 0C11.6776 0 10.9834 0.69416 10.9834 1.55045C10.9834 2.40674 11.6776 3.1009 12.5338 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 3.1009C23.3823 3.1009 24.0765 2.40674 24.0765 1.55045C24.0765 0.69416 23.3823 0 22.526 0C21.6697 0 20.9756 0.69416 20.9756 1.55045C20.9756 2.40674 21.6697 3.1009 22.526 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 3.1009C33.374 3.1009 34.0682 2.40674 34.0682 1.55045C34.0682 0.69416 33.374 0 32.5177 0C31.6614 0 30.9673 0.69416 30.9673 1.55045C30.9673 2.40674 31.6614 3.1009 32.5177 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 3.1009C43.3657 3.1009 44.0599 2.40674 44.0599 1.55045C44.0599 0.69416 43.3657 0 42.5094 0C41.6531 0 40.959 0.69416 40.959 1.55045C40.959 2.40674 41.6531 3.1009 42.5094 3.1009Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.5338 13.0804C13.3901 13.0804 14.0843 12.3862 14.0843 11.5299C14.0843 10.6737 13.3901 9.97949 12.5338 9.97949C11.6776 9.97949 10.9834 10.6737 10.9834 11.5299C10.9834 12.3862 11.6776 13.0804 12.5338 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 13.0804C23.3823 13.0804 24.0765 12.3862 24.0765 11.5299C24.0765 10.6737 23.3823 9.97949 22.526 9.97949C21.6697 9.97949 20.9756 10.6737 20.9756 11.5299C20.9756 12.3862 21.6697 13.0804 22.526 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 13.0804C33.374 13.0804 34.0682 12.3862 34.0682 11.5299C34.0682 10.6737 33.374 9.97949 32.5177 9.97949C31.6614 9.97949 30.9673 10.6737 30.9673 11.5299C30.9673 12.3862 31.6614 13.0804 32.5177 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 13.0804C43.3657 13.0804 44.0599 12.3862 44.0599 11.5299C44.0599 10.6737 43.3657 9.97949 42.5094 9.97949C41.6531 9.97949 40.959 10.6737 40.959 11.5299C40.959 12.3862 41.6531 13.0804 42.5094 13.0804Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.526 23.0604C23.3823 23.0604 24.0765 22.3662 24.0765 21.5099C24.0765 20.6536 23.3823 19.9595 22.526 19.9595C21.6697 19.9595 20.9756 20.6536 20.9756 21.5099C20.9756 22.3662 21.6697 23.0604 22.526 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 23.0604C33.374 23.0604 34.0682 22.3662 34.0682 21.5099C34.0682 20.6536 33.374 19.9595 32.5177 19.9595C31.6614 19.9595 30.9673 20.6536 30.9673 21.5099C30.9673 22.3662 31.6614 23.0604 32.5177 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 23.0604C43.3657 23.0604 44.0599 22.3662 44.0599 21.5099C44.0599 20.6536 43.3657 19.9595 42.5094 19.9595C41.6531 19.9595 40.959 20.6536 40.959 21.5099C40.959 22.3662 41.6531 23.0604 42.5094 23.0604Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 33.0404C33.374 33.0404 34.0682 32.3462 34.0682 31.4899C34.0682 30.6336 33.374 29.9395 32.5177 29.9395C31.6614 29.9395 30.9673 30.6336 30.9673 31.4899C30.9673 32.3462 31.6614 33.0404 32.5177 33.0404Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 33.0404C43.3657 33.0404 44.0599 32.3462 44.0599 31.4899C44.0599 30.6336 43.3657 29.9395 42.5094 29.9395C41.6531 29.9395 40.959 30.6336 40.959 31.4899C40.959 32.3462 41.6531 33.0404 42.5094 33.0404Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.5177 43.0203C33.374 43.0203 34.0682 42.3262 34.0682 41.4699C34.0682 40.6136 33.374 39.9194 32.5177 39.9194C31.6614 39.9194 30.9673 40.6136 30.9673 41.4699C30.9673 42.3262 31.6614 43.0203 32.5177 43.0203Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 43.0203C43.3657 43.0203 44.0599 42.3262 44.0599 41.4699C44.0599 40.6136 43.3657 39.9194 42.5094 39.9194C41.6531 39.9194 40.959 40.6136 40.959 41.4699C40.959 42.3262 41.6531 43.0203 42.5094 43.0203Z"
                      fill="#3056D3"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M42.5094 52.9998C43.3657 52.9998 44.0599 52.3057 44.0599 51.4494C44.0599 50.5931 43.3657 49.8989 42.5094 49.8989C41.6531 49.8989 40.959 50.5931 40.959 51.4494C40.959 52.3057 41.6531 52.9998 42.5094 52.9998Z"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
              <div className="text-center">
                <h4
                  className="mb-1 text-lg font-semibold text-dark dark:text-white"
                >
                  Jackie Sanders
                </h4>
                <p className="mb-5 text-sm text-body-color dark:text-dark-6">
                  SEO Expert
                </p>
                <div className="flex items-center justify-center gap-5">
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M13.3315 7.25625H11.7565H11.194V6.69375V4.95V4.3875H11.7565H12.9377C13.2471 4.3875 13.5002 4.1625 13.5002 3.825V0.84375C13.5002 0.534375 13.2752 0.28125 12.9377 0.28125H10.8846C8.66272 0.28125 7.11584 1.85625 7.11584 4.19062V6.6375V7.2H6.55334H4.64084C4.24709 7.2 3.88147 7.50937 3.88147 7.95937V9.98438C3.88147 10.3781 4.19084 10.7438 4.64084 10.7438H6.49709H7.05959V11.3063V16.9594C7.05959 17.3531 7.36897 17.7188 7.81897 17.7188H10.4627C10.6315 17.7188 10.7721 17.6344 10.8846 17.5219C10.9971 17.4094 11.0815 17.2125 11.0815 17.0437V11.3344V10.7719H11.6721H12.9377C13.3033 10.7719 13.5846 10.5469 13.6408 10.2094V10.1813V10.1531L14.0346 8.2125C14.0627 8.01562 14.0346 7.79063 13.8658 7.56562C13.8096 7.425 13.5565 7.28437 13.3315 7.25625Z"
                        fill=""
                      />
                    </svg>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M16.4647 4.83752C16.565 4.72065 16.4343 4.56793 16.2859 4.62263C15.9549 4.74474 15.6523 4.82528 15.2049 4.875C15.7552 4.56855 16.0112 4.13054 16.2194 3.59407C16.2696 3.46467 16.1182 3.34725 15.9877 3.40907C15.458 3.66023 14.8864 3.84658 14.2854 3.95668C13.6913 3.3679 12.8445 3 11.9077 3C10.1089 3 8.65027 4.35658 8.65027 6.02938C8.65027 6.26686 8.67937 6.49818 8.73427 6.71966C6.14854 6.59919 3.84286 5.49307 2.24098 3.79696C2.13119 3.68071 1.93197 3.69614 1.86361 3.83792C1.68124 4.21619 1.57957 4.63582 1.57957 5.07762C1.57957 6.12843 2.15446 7.05557 3.02837 7.59885C2.63653 7.58707 2.2618 7.51073 1.91647 7.38116C1.74834 7.31808 1.5556 7.42893 1.57819 7.59847C1.75162 8.9004 2.80568 9.97447 4.16624 10.2283C3.89302 10.2978 3.60524 10.3347 3.30754 10.3347C3.23536 10.3347 3.16381 10.3324 3.0929 10.3281C2.91247 10.3169 2.76583 10.4783 2.84319 10.6328C3.35357 11.6514 4.45563 12.3625 5.73809 12.3847C4.62337 13.1974 3.21889 13.6816 1.69269 13.6816C1.50451 13.6816 1.42378 13.9235 1.59073 14.0056C2.88015 14.6394 4.34854 15 5.90878 15C11.9005 15 15.1765 10.384 15.1765 6.38067C15.1765 6.24963 15.1732 6.11858 15.1672 5.98877C15.6535 5.66205 16.0907 5.27354 16.4647 4.83752Z"
                        fill=""
                      />
                    </svg>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="text-dark-6 hover:text-primary"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current"
                    >
                      <path
                        d="M9.02429 11.8066C10.5742 11.8066 11.8307 10.5501 11.8307 9.00018C11.8307 7.45022 10.5742 6.19373 9.02429 6.19373C7.47433 6.19373 6.21783 7.45022 6.21783 9.00018C6.21783 10.5501 7.47433 11.8066 9.02429 11.8066Z"
                        fill=""
                      />
                      <path
                        d="M12.0726 1.5H5.92742C3.48387 1.5 1.5 3.48387 1.5 5.92742V12.0242C1.5 14.5161 3.48387 16.5 5.92742 16.5H12.0242C14.5161 16.5 16.5 14.5161 16.5 12.0726V5.92742C16.5 3.48387 14.5161 1.5 12.0726 1.5ZM9.02419 12.6774C6.96774 12.6774 5.34677 11.0081 5.34677 9C5.34677 6.99194 6.99194 5.32258 9.02419 5.32258C11.0323 5.32258 12.6774 6.99194 12.6774 9C12.6774 11.0081 11.0565 12.6774 9.02419 12.6774ZM14.1048 5.66129C13.8629 5.92742 13.5 6.07258 13.0887 6.07258C12.7258 6.07258 12.3629 5.92742 12.0726 5.66129C11.8065 5.39516 11.6613 5.05645 11.6613 4.64516C11.6613 4.23387 11.8065 3.91935 12.0726 3.62903C12.3387 3.33871 12.6774 3.19355 13.0887 3.19355C13.4516 3.19355 13.8387 3.33871 14.1048 3.60484C14.3468 3.91935 14.5161 4.28226 14.5161 4.66935C14.4919 5.05645 14.3468 5.39516 14.1048 5.66129Z"
                        fill=""
                      />
                      <path
                        d="M13.1135 4.06433C12.799 4.06433 12.5329 4.33046 12.5329 4.64498C12.5329 4.95949 12.799 5.22562 13.1135 5.22562C13.428 5.22562 13.6942 4.95949 13.6942 4.64498C13.6942 4.33046 13.4522 4.06433 13.1135 4.06433Z"
                        fill=""
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" className="relative py-20 md:py-[120px]">
      <div
        className="absolute left-0 top-0 -z-[1] h-full w-full dark:bg-dark"
      ></div>
      <div
        className="absolute left-0 top-0 -z-[1] h-1/2 w-full bg-[#E9F9FF] dark:bg-dark-700 lg:h-[45%] xl:h-1/2"
      ></div>
      <div className="container px-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="ud-contact-content-wrapper">
              <div className="ud-contact-title mb-12 lg:mb-[150px]">
                <span
                  className="mb-6 block text-base font-medium text-dark dark:text-white"
                >
                  CONTACT US
                </span>
                <h2
                  className="max-w-[260px] text-[35px] font-semibold leading-[1.14] text-dark dark:text-white"
                >
                  Let's talk about your problem.
                </h2>
              </div>
              <div className="mb-12 flex flex-wrap justify-between lg:mb-0">
                <div className="mb-8 flex w-[330px] max-w-full">
                  <div className="mr-6 text-[32px] text-primary">
                    <svg
                      width="29"
                      height="35"
                      viewBox="0 0 29 35"
                      className="fill-current"
                    >
                      <path
                        d="M14.5 0.710938C6.89844 0.710938 0.664062 6.72656 0.664062 14.0547C0.664062 19.9062 9.03125 29.5859 12.6406 33.5234C13.1328 34.0703 13.7891 34.3437 14.5 34.3437C15.2109 34.3437 15.8672 34.0703 16.3594 33.5234C19.9688 29.6406 28.3359 19.9062 28.3359 14.0547C28.3359 6.67188 22.1016 0.710938 14.5 0.710938ZM14.9375 32.2109C14.6641 32.4844 14.2812 32.4844 14.0625 32.2109C11.3828 29.3125 2.57812 19.3594 2.57812 14.0547C2.57812 7.71094 7.9375 2.625 14.5 2.625C21.0625 2.625 26.4219 7.76562 26.4219 14.0547C26.4219 19.3594 17.6172 29.2578 14.9375 32.2109Z"
                      />
                      <path
                        d="M14.5 8.58594C11.2734 8.58594 8.59375 11.2109 8.59375 14.4922C8.59375 17.7188 11.2187 20.3984 14.5 20.3984C17.7812 20.3984 20.4062 17.7734 20.4062 14.4922C20.4062 11.2109 17.7266 8.58594 14.5 8.58594ZM14.5 18.4297C12.3125 18.4297 10.5078 16.625 10.5078 14.4375C10.5078 12.25 12.3125 10.4453 14.5 10.4453C16.6875 10.4453 18.4922 12.25 18.4922 14.4375C18.4922 16.625 16.6875 18.4297 14.5 18.4297Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5
                      className="mb-[18px] text-lg font-semibold text-dark dark:text-white"
                    >
                      Our Location
                    </h5>
                    <p className="text-base text-body-color dark:text-dark-6">
                      401 Broadway, 24th Floor, Orchard Cloud View, London
                    </p>
                  </div>
                </div>
                <div className="mb-8 flex w-[330px] max-w-full">
                  <div className="mr-6 text-[32px] text-primary">
                    <svg
                      width="34"
                      height="25"
                      viewBox="0 0 34 25"
                      className="fill-current"
                    >
                      <path
                        d="M30.5156 0.960938H3.17188C1.42188 0.960938 0 2.38281 0 4.13281V20.9219C0 22.6719 1.42188 24.0938 3.17188 24.0938H30.5156C32.2656 24.0938 33.6875 22.6719 33.6875 20.9219V4.13281C33.6875 2.38281 32.2656 0.960938 30.5156 0.960938ZM30.5156 2.875C30.7891 2.875 31.0078 2.92969 31.2266 3.09375L17.6094 11.3516C17.1172 11.625 16.5703 11.625 16.0781 11.3516L2.46094 3.09375C2.67969 2.98438 2.89844 2.875 3.17188 2.875H30.5156ZM30.5156 22.125H3.17188C2.51562 22.125 1.91406 21.5781 1.91406 20.8672V5.00781L15.0391 12.9922C15.5859 13.3203 16.1875 13.4844 16.7891 13.4844C17.3906 13.4844 17.9922 13.3203 18.5391 12.9922L31.6641 5.00781V20.8672C31.7734 21.5781 31.1719 22.125 30.5156 22.125Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5
                      className="mb-[18px] text-lg font-semibold text-dark dark:text-white"
                    >
                      How Can We Help?
                    </h5>
                    <p className="text-base text-body-color dark:text-dark-6">
                      info@yourdomain.com
                    </p>
                    <p className="mt-1 text-base text-body-color dark:text-dark-6">
                      contact@yourdomain.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div
              className="wow fadeInUp rounded-lg bg-white px-8 py-10 shadow-testimonial dark:bg-dark-2 dark:shadow-none sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]"
              data-wow-delay=".2s
              "
            >
              <h3
                className="mb-8 text-2xl font-semibold text-dark dark:text-white md:text-[28px] md:leading-[1.42]"
              >
                Send us a Message
              </h3>
              <form>
                <div className="mb-[22px]">
                  <label
                    htmlFor="fullName"
                    className="mb-4 block text-sm text-body-color dark:text-dark-6"
                    >Full Name*</label
                  >
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Adam Gelius"
                    className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-body-color placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-dark-6"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="email"
                    className="mb-4 block text-sm text-body-color dark:text-dark-6"
                    >Email*</label
                  >
                  <input
                    type="email"
                    name="email"
                    placeholder="example@yourmail.com"
                    className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-body-color placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-dark-6"
                  />
                </div>
                <div className="mb-[22px]">
                  <label
                    htmlFor="phone"
                    className="mb-4 block text-sm text-body-color dark:text-dark-6"
                    >Phone*</label
                  >
                  <input
                    type="text"
                    name="phone"
                    placeholder="+885 1254 5211 552"
                    className="w-full border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-body-color placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-dark-6"
                  />
                </div>
                <div className="mb-[30px]">
                  <label
                    htmlFor="message"
                    className="mb-4 block text-sm text-body-color dark:text-dark-6"
                    >Message*</label
                  >
                  <textarea
                    name="message"
                    rows="1"
                    placeholder="type your message here"
                    className="w-full resize-none border-0 border-b border-[#f1f1f1] bg-transparent pb-3 text-body-color placeholder:text-body-color/60 focus:border-primary focus:outline-none dark:border-dark-3 dark:text-dark-6"
                  ></textarea>
                </div>
                <div className="mb-0">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-blue-dark"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>



    <footer
      className="wow fadeInUp relative z-10 bg-[#090E34] pt-20 lg:pt-[100px]"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <a
                href="javascript:void(0)"
                className="mb-6 inline-block max-w-[160px]"
              >
                <img
                  src="../../assets/images/logo/alphahood-logo.svg"
                  alt="logo"
                  className="max-w-full"
                />
              </a>
              <p className="mb-8 max-w-[270px] text-base text-gray-7">
                We create digital experiences for brands and companies by using
                technology.
              </p>
              <div className="-mx-3 flex items-center">
                <a
                  href="javascript:void(0)"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M16.294 8.86875H14.369H13.6815V8.18125V6.05V5.3625H14.369H15.8128C16.1909 5.3625 16.5003 5.0875 16.5003 4.675V1.03125C16.5003 0.653125 16.2253 0.34375 15.8128 0.34375H13.3034C10.5878 0.34375 8.69714 2.26875 8.69714 5.12187V8.1125V8.8H8.00964H5.67214C5.19089 8.8 4.74402 9.17812 4.74402 9.72812V12.2031C4.74402 12.6844 5.12214 13.1313 5.67214 13.1313H7.94089H8.62839V13.8188V20.7281C8.62839 21.2094 9.00652 21.6562 9.55652 21.6562H12.7878C12.994 21.6562 13.1659 21.5531 13.3034 21.4156C13.4409 21.2781 13.544 21.0375 13.544 20.8312V13.8531V13.1656H14.2659H15.8128C16.2596 13.1656 16.6034 12.8906 16.6721 12.4781V12.4438V12.4094L17.1534 10.0375C17.1878 9.79688 17.1534 9.52187 16.9471 9.24687C16.8784 9.075 16.569 8.90312 16.294 8.86875Z"
                    />
                  </svg>
                </a>
                <a
                  href="javascript:void(0)"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M20.1236 5.91236C20.2461 5.76952 20.0863 5.58286 19.905 5.64972C19.5004 5.79896 19.1306 5.8974 18.5837 5.95817C19.2564 5.58362 19.5693 5.04828 19.8237 4.39259C19.885 4.23443 19.7 4.09092 19.5406 4.16647C18.8931 4.47345 18.1945 4.70121 17.4599 4.83578C16.7338 4.11617 15.6988 3.6665 14.5539 3.6665C12.3554 3.6665 10.5725 5.32454 10.5725 7.36908C10.5725 7.65933 10.6081 7.94206 10.6752 8.21276C7.51486 8.06551 4.6968 6.71359 2.73896 4.64056C2.60477 4.49848 2.36128 4.51734 2.27772 4.69063C2.05482 5.15296 1.93056 5.66584 1.93056 6.20582C1.93056 7.49014 2.6332 8.62331 3.70132 9.28732C3.22241 9.27293 2.76441 9.17961 2.34234 9.02125C2.13684 8.94416 1.90127 9.07964 1.92888 9.28686C2.14084 10.8781 3.42915 12.1909 5.09205 12.5011C4.75811 12.586 4.40639 12.6311 4.04253 12.6311C3.95431 12.6311 3.86685 12.6284 3.78019 12.6231C3.55967 12.6094 3.38044 12.8067 3.47499 12.9954C4.09879 14.2404 5.44575 15.1096 7.0132 15.1367C5.65077 16.13 3.93418 16.7218 2.06882 16.7218C1.83882 16.7218 1.74015 17.0175 1.9442 17.1178C3.52016 17.8924 5.31487 18.3332 7.22182 18.3332C14.545 18.3332 18.549 12.6914 18.549 7.79843C18.549 7.63827 18.545 7.47811 18.5377 7.31945C19.1321 6.92012 19.6664 6.44528 20.1236 5.91236Z"
                    />
                  </svg>
                </a>
                <a
                  href="javascript:void(0)"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M11.0297 14.4305C12.9241 14.4305 14.4598 12.8948 14.4598 11.0004C14.4598 9.10602 12.9241 7.57031 11.0297 7.57031C9.13529 7.57031 7.59958 9.10602 7.59958 11.0004C7.59958 12.8948 9.13529 14.4305 11.0297 14.4305Z"
                    />
                    <path
                      d="M14.7554 1.8335H7.24463C4.25807 1.8335 1.83334 4.25823 1.83334 7.24479V14.6964C1.83334 17.7421 4.25807 20.1668 7.24463 20.1668H14.6962C17.7419 20.1668 20.1667 17.7421 20.1667 14.7555V7.24479C20.1667 4.25823 17.7419 1.8335 14.7554 1.8335ZM11.0296 15.4948C8.51614 15.4948 6.53496 13.4545 6.53496 11.0002C6.53496 8.54586 8.54571 6.50554 11.0296 6.50554C13.4839 6.50554 15.4946 8.54586 15.4946 11.0002C15.4946 13.4545 13.5134 15.4948 11.0296 15.4948ZM17.2393 6.91952C16.9436 7.24479 16.5 7.42221 15.9973 7.42221C15.5538 7.42221 15.1102 7.24479 14.7554 6.91952C14.4301 6.59425 14.2527 6.18027 14.2527 5.67758C14.2527 5.17489 14.4301 4.79049 14.7554 4.43565C15.0807 4.08081 15.4946 3.90339 15.9973 3.90339C16.4409 3.90339 16.914 4.08081 17.2393 4.40608C17.535 4.79049 17.7419 5.23403 17.7419 5.70715C17.7124 6.18027 17.535 6.59425 17.2393 6.91952Z"
                    />
                    <path
                      d="M16.0276 4.96777C15.6432 4.96777 15.318 5.29304 15.318 5.67745C15.318 6.06186 15.6432 6.38713 16.0276 6.38713C16.412 6.38713 16.7373 6.06186 16.7373 5.67745C16.7373 5.29304 16.4416 4.96777 16.0276 4.96777Z"
                    />
                  </svg>
                </a>
                <a
                  href="javascript:void(0)"
                  className="px-3 text-gray-7 hover:text-white"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M18.8065 1.8335H3.16399C2.42474 1.8335 1.83334 2.42489 1.83334 3.16414V18.8362C1.83334 19.5459 2.42474 20.1668 3.16399 20.1668H18.7473C19.4866 20.1668 20.078 19.5754 20.078 18.8362V3.13457C20.1371 2.42489 19.5457 1.8335 18.8065 1.8335ZM7.24464 17.4168H4.55379V8.69371H7.24464V17.4168ZM5.88443 7.48135C4.99733 7.48135 4.31721 6.77167 4.31721 5.91414C4.31721 5.05661 5.0269 4.34694 5.88443 4.34694C6.74196 4.34694 7.45163 5.05661 7.45163 5.91414C7.45163 6.77167 6.8011 7.48135 5.88443 7.48135ZM17.4463 17.4168H14.7554V13.1883C14.7554 12.183 14.7258 10.8523 13.336 10.8523C11.9167 10.8523 11.7097 11.976 11.7097 13.0996V17.4168H9.01884V8.69371H11.6506V9.90608H11.6801C12.0645 9.1964 12.9221 8.48672 14.2527 8.48672C17.0027 8.48672 17.5054 10.2609 17.5054 12.6856V17.4168H17.4463Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">About Us</h4>
              <ul>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Testimonial
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">Features</h4>
              <ul>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Refund policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-2/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">
                Our Products
              </h4>
              <ul>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    LineIcons
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    Ecommerce HTML
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    TailAdmin
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="mb-3 inline-block text-base text-gray-7 hover:text-primary"
                  >
                    PlainAdmin
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 md:w-2/3 lg:w-6/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <h4 className="mb-9 text-lg font-semibold text-white">Latest blog</h4>
              <div className="flex flex-col gap-8">
                <a
                  href="blog-details.html"
                  className="group flex items-center gap-[22px]"
                >
                  <div className="overflow-hidden rounded">
                    <img
                      src="../../assets/images/blog/blog-footer-01.jpg"
                      alt="blog"
                    />
                  </div>
                  <span
                    className="max-w-[180px] text-base text-gray-7 group-hover:text-white"
                  >
                    I think really important to design with...
                  </span>
                </a>
                <a
                  href="blog-details.html"
                  className="group flex items-center gap-[22px]"
                >
                  <div className="overflow-hidden rounded">
                    <img
                      src="../../assets/images/blog/blog-footer-02.jpg"
                      alt="blog"
                    />
                  </div>
                  <span
                    className="max-w-[180px] text-base text-gray-7 group-hover:text-white"
                  >
                    Recognizing the need is the primary...
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 md:w-2/3 lg:w-1/2">
              <div className="my-1">
                <div
                  className="-mx-3 flex items-center justify-center md:justify-start"
                >
                  <a
                    href="javascript:void(0)"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    Privacy policy
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    Legal notice
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="px-3 text-base text-gray-7 hover:text-white hover:underline"
                  >
                    Terms of service
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/3 lg:w-1/2">
              <div className="my-1 flex justify-center md:justify-end">
                <p className="text-base text-gray-7">
                  Designed and Developed by
                  <a
                    href="https://tailgrids.com"
                    rel="nofollow noopner"
                    target="_blank"
                    className="text-gray-1 hover:underline"
                  >
                    TailGrids and UIdeck
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span className="absolute left-0 top-0 z-[-1]">
          <img src="../../assets/images/footer/shape-1.svg" alt="" />
        </span>

        <span className="absolute bottom-0 right-0 z-[-1]">
          <img src="../../assets/images/footer/shape-3.svg" alt="" />
        </span>

        <span className="absolute right-0 top-0 z-[-1]">
          <svg
            width="102"
            height="102"
            viewBox="0 0 102 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.8667 33.1956C2.89765 33.1956 3.7334 34.0318 3.7334 35.0633C3.7334 36.0947 2.89765 36.9309 1.8667 36.9309C0.835744 36.9309 4.50645e-08 36.0947 0 35.0633C-4.50645e-08 34.0318 0.835744 33.1956 1.8667 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 33.1956C19.3249 33.1956 20.1606 34.0318 20.1606 35.0633C20.1606 36.0947 19.3249 36.9309 18.2939 36.9309C17.263 36.9309 16.4272 36.0947 16.4272 35.0633C16.4272 34.0318 17.263 33.1956 18.2939 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 33.195C35.7519 33.195 36.5876 34.0311 36.5876 35.0626C36.5876 36.0941 35.7519 36.9303 34.7209 36.9303C33.69 36.9303 32.8542 36.0941 32.8542 35.0626C32.8542 34.0311 33.69 33.195 34.7209 33.195Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 33.195C51.965 33.195 52.8008 34.0311 52.8008 35.0626C52.8008 36.0941 51.965 36.9303 50.9341 36.9303C49.9031 36.9303 49.0674 36.0941 49.0674 35.0626C49.0674 34.0311 49.9031 33.195 50.9341 33.195Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 16.7605C2.89765 16.7605 3.7334 17.5966 3.7334 18.6281C3.7334 19.6596 2.89765 20.4957 1.8667 20.4957C0.835744 20.4957 4.50645e-08 19.6596 0 18.6281C-4.50645e-08 17.5966 0.835744 16.7605 1.8667 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 16.7605C19.3249 16.7605 20.1606 17.5966 20.1606 18.6281C20.1606 19.6596 19.3249 20.4957 18.2939 20.4957C17.263 20.4957 16.4272 19.6596 16.4272 18.6281C16.4272 17.5966 17.263 16.7605 18.2939 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 16.7605C35.7519 16.7605 36.5876 17.5966 36.5876 18.6281C36.5876 19.6596 35.7519 20.4957 34.7209 20.4957C33.69 20.4957 32.8542 19.6596 32.8542 18.6281C32.8542 17.5966 33.69 16.7605 34.7209 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 16.7605C51.965 16.7605 52.8008 17.5966 52.8008 18.6281C52.8008 19.6596 51.965 20.4957 50.9341 20.4957C49.9031 20.4957 49.0674 19.6596 49.0674 18.6281C49.0674 17.5966 49.9031 16.7605 50.9341 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 0.324951C2.89765 0.324951 3.7334 1.16115 3.7334 2.19261C3.7334 3.22408 2.89765 4.06024 1.8667 4.06024C0.835744 4.06024 4.50645e-08 3.22408 0 2.19261C-4.50645e-08 1.16115 0.835744 0.324951 1.8667 0.324951Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 0.324951C19.3249 0.324951 20.1606 1.16115 20.1606 2.19261C20.1606 3.22408 19.3249 4.06024 18.2939 4.06024C17.263 4.06024 16.4272 3.22408 16.4272 2.19261C16.4272 1.16115 17.263 0.324951 18.2939 0.324951Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 0.325302C35.7519 0.325302 36.5876 1.16147 36.5876 2.19293C36.5876 3.2244 35.7519 4.06056 34.7209 4.06056C33.69 4.06056 32.8542 3.2244 32.8542 2.19293C32.8542 1.16147 33.69 0.325302 34.7209 0.325302Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 0.325302C51.965 0.325302 52.8008 1.16147 52.8008 2.19293C52.8008 3.2244 51.965 4.06056 50.9341 4.06056C49.9031 4.06056 49.0674 3.2244 49.0674 2.19293C49.0674 1.16147 49.9031 0.325302 50.9341 0.325302Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 33.1956C67.9346 33.1956 68.7704 34.0318 68.7704 35.0633C68.7704 36.0947 67.9346 36.9309 66.9037 36.9309C65.8727 36.9309 65.037 36.0947 65.037 35.0633C65.037 34.0318 65.8727 33.1956 66.9037 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 33.1956C84.3616 33.1956 85.1974 34.0318 85.1974 35.0633C85.1974 36.0947 84.3616 36.9309 83.3307 36.9309C82.2997 36.9309 81.464 36.0947 81.464 35.0633C81.464 34.0318 82.2997 33.1956 83.3307 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 33.1956C100.789 33.1956 101.624 34.0318 101.624 35.0633C101.624 36.0947 100.789 36.9309 99.7576 36.9309C98.7266 36.9309 97.8909 36.0947 97.8909 35.0633C97.8909 34.0318 98.7266 33.1956 99.7576 33.1956Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 16.7605C67.9346 16.7605 68.7704 17.5966 68.7704 18.6281C68.7704 19.6596 67.9346 20.4957 66.9037 20.4957C65.8727 20.4957 65.037 19.6596 65.037 18.6281C65.037 17.5966 65.8727 16.7605 66.9037 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 16.7605C84.3616 16.7605 85.1974 17.5966 85.1974 18.6281C85.1974 19.6596 84.3616 20.4957 83.3307 20.4957C82.2997 20.4957 81.464 19.6596 81.464 18.6281C81.464 17.5966 82.2997 16.7605 83.3307 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 16.7605C100.789 16.7605 101.624 17.5966 101.624 18.6281C101.624 19.6596 100.789 20.4957 99.7576 20.4957C98.7266 20.4957 97.8909 19.6596 97.8909 18.6281C97.8909 17.5966 98.7266 16.7605 99.7576 16.7605Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 0.324966C67.9346 0.324966 68.7704 1.16115 68.7704 2.19261C68.7704 3.22408 67.9346 4.06024 66.9037 4.06024C65.8727 4.06024 65.037 3.22408 65.037 2.19261C65.037 1.16115 65.8727 0.324966 66.9037 0.324966Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 0.324951C84.3616 0.324951 85.1974 1.16115 85.1974 2.19261C85.1974 3.22408 84.3616 4.06024 83.3307 4.06024C82.2997 4.06024 81.464 3.22408 81.464 2.19261C81.464 1.16115 82.2997 0.324951 83.3307 0.324951Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 0.324951C100.789 0.324951 101.624 1.16115 101.624 2.19261C101.624 3.22408 100.789 4.06024 99.7576 4.06024C98.7266 4.06024 97.8909 3.22408 97.8909 2.19261C97.8909 1.16115 98.7266 0.324951 99.7576 0.324951Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 82.2029C2.89765 82.2029 3.7334 83.039 3.7334 84.0705C3.7334 85.102 2.89765 85.9382 1.8667 85.9382C0.835744 85.9382 4.50645e-08 85.102 0 84.0705C-4.50645e-08 83.039 0.835744 82.2029 1.8667 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 82.2029C19.3249 82.2029 20.1606 83.039 20.1606 84.0705C20.1606 85.102 19.3249 85.9382 18.2939 85.9382C17.263 85.9382 16.4272 85.102 16.4272 84.0705C16.4272 83.039 17.263 82.2029 18.2939 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 82.2026C35.7519 82.2026 36.5876 83.0387 36.5876 84.0702C36.5876 85.1017 35.7519 85.9378 34.7209 85.9378C33.69 85.9378 32.8542 85.1017 32.8542 84.0702C32.8542 83.0387 33.69 82.2026 34.7209 82.2026Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 82.2026C51.965 82.2026 52.8008 83.0387 52.8008 84.0702C52.8008 85.1017 51.965 85.9378 50.9341 85.9378C49.9031 85.9378 49.0674 85.1017 49.0674 84.0702C49.0674 83.0387 49.9031 82.2026 50.9341 82.2026Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 65.7677C2.89765 65.7677 3.7334 66.6039 3.7334 67.6353C3.7334 68.6668 2.89765 69.503 1.8667 69.503C0.835744 69.503 4.50645e-08 68.6668 0 67.6353C-4.50645e-08 66.6039 0.835744 65.7677 1.8667 65.7677Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 65.7677C19.3249 65.7677 20.1606 66.6039 20.1606 67.6353C20.1606 68.6668 19.3249 69.503 18.2939 69.503C17.263 69.503 16.4272 68.6668 16.4272 67.6353C16.4272 66.6039 17.263 65.7677 18.2939 65.7677Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 65.7674C35.7519 65.7674 36.5876 66.6036 36.5876 67.635C36.5876 68.6665 35.7519 69.5027 34.7209 69.5027C33.69 69.5027 32.8542 68.6665 32.8542 67.635C32.8542 66.6036 33.69 65.7674 34.7209 65.7674Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 65.7674C51.965 65.7674 52.8008 66.6036 52.8008 67.635C52.8008 68.6665 51.965 69.5027 50.9341 69.5027C49.9031 69.5027 49.0674 68.6665 49.0674 67.635C49.0674 66.6036 49.9031 65.7674 50.9341 65.7674Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 98.2644C2.89765 98.2644 3.7334 99.1005 3.7334 100.132C3.7334 101.163 2.89765 102 1.8667 102C0.835744 102 4.50645e-08 101.163 0 100.132C-4.50645e-08 99.1005 0.835744 98.2644 1.8667 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M1.8667 49.3322C2.89765 49.3322 3.7334 50.1684 3.7334 51.1998C3.7334 52.2313 2.89765 53.0675 1.8667 53.0675C0.835744 53.0675 4.50645e-08 52.2313 0 51.1998C-4.50645e-08 50.1684 0.835744 49.3322 1.8667 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 98.2644C19.3249 98.2644 20.1606 99.1005 20.1606 100.132C20.1606 101.163 19.3249 102 18.2939 102C17.263 102 16.4272 101.163 16.4272 100.132C16.4272 99.1005 17.263 98.2644 18.2939 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M18.2939 49.3322C19.3249 49.3322 20.1606 50.1684 20.1606 51.1998C20.1606 52.2313 19.3249 53.0675 18.2939 53.0675C17.263 53.0675 16.4272 52.2313 16.4272 51.1998C16.4272 50.1684 17.263 49.3322 18.2939 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 98.2647C35.7519 98.2647 36.5876 99.1008 36.5876 100.132C36.5876 101.164 35.7519 102 34.7209 102C33.69 102 32.8542 101.164 32.8542 100.132C32.8542 99.1008 33.69 98.2647 34.7209 98.2647Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 98.2647C51.965 98.2647 52.8008 99.1008 52.8008 100.132C52.8008 101.164 51.965 102 50.9341 102C49.9031 102 49.0674 101.164 49.0674 100.132C49.0674 99.1008 49.9031 98.2647 50.9341 98.2647Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M34.7209 49.3326C35.7519 49.3326 36.5876 50.1687 36.5876 51.2002C36.5876 52.2317 35.7519 53.0678 34.7209 53.0678C33.69 53.0678 32.8542 52.2317 32.8542 51.2002C32.8542 50.1687 33.69 49.3326 34.7209 49.3326Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M50.9341 49.3326C51.965 49.3326 52.8008 50.1687 52.8008 51.2002C52.8008 52.2317 51.965 53.0678 50.9341 53.0678C49.9031 53.0678 49.0674 52.2317 49.0674 51.2002C49.0674 50.1687 49.9031 49.3326 50.9341 49.3326Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 82.2029C67.9346 82.2029 68.7704 83.0391 68.7704 84.0705C68.7704 85.102 67.9346 85.9382 66.9037 85.9382C65.8727 85.9382 65.037 85.102 65.037 84.0705C65.037 83.0391 65.8727 82.2029 66.9037 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 82.2029C84.3616 82.2029 85.1974 83.0391 85.1974 84.0705C85.1974 85.102 84.3616 85.9382 83.3307 85.9382C82.2997 85.9382 81.464 85.102 81.464 84.0705C81.464 83.0391 82.2997 82.2029 83.3307 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 82.2029C100.789 82.2029 101.624 83.039 101.624 84.0705C101.624 85.102 100.789 85.9382 99.7576 85.9382C98.7266 85.9382 97.8909 85.102 97.8909 84.0705C97.8909 83.039 98.7266 82.2029 99.7576 82.2029Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 65.7674C67.9346 65.7674 68.7704 66.6036 68.7704 67.635C68.7704 68.6665 67.9346 69.5027 66.9037 69.5027C65.8727 69.5027 65.037 68.6665 65.037 67.635C65.037 66.6036 65.8727 65.7674 66.9037 65.7674Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 65.7677C84.3616 65.7677 85.1974 66.6039 85.1974 67.6353C85.1974 68.6668 84.3616 69.503 83.3307 69.503C82.2997 69.503 81.464 68.6668 81.464 67.6353C81.464 66.6039 82.2997 65.7677 83.3307 65.7677Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 65.7677C100.789 65.7677 101.624 66.6039 101.624 67.6353C101.624 68.6668 100.789 69.503 99.7576 69.503C98.7266 69.503 97.8909 68.6668 97.8909 67.6353C97.8909 66.6039 98.7266 65.7677 99.7576 65.7677Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 98.2644C67.9346 98.2644 68.7704 99.1005 68.7704 100.132C68.7704 101.163 67.9346 102 66.9037 102C65.8727 102 65.037 101.163 65.037 100.132C65.037 99.1005 65.8727 98.2644 66.9037 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M66.9037 49.3322C67.9346 49.3322 68.7704 50.1684 68.7704 51.1998C68.7704 52.2313 67.9346 53.0675 66.9037 53.0675C65.8727 53.0675 65.037 52.2313 65.037 51.1998C65.037 50.1684 65.8727 49.3322 66.9037 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 98.2644C84.3616 98.2644 85.1974 99.1005 85.1974 100.132C85.1974 101.163 84.3616 102 83.3307 102C82.2997 102 81.464 101.163 81.464 100.132C81.464 99.1005 82.2997 98.2644 83.3307 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M83.3307 49.3322C84.3616 49.3322 85.1974 50.1684 85.1974 51.1998C85.1974 52.2313 84.3616 53.0675 83.3307 53.0675C82.2997 53.0675 81.464 52.2313 81.464 51.1998C81.464 50.1684 82.2997 49.3322 83.3307 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 98.2644C100.789 98.2644 101.624 99.1005 101.624 100.132C101.624 101.163 100.789 102 99.7576 102C98.7266 102 97.8909 101.163 97.8909 100.132C97.8909 99.1005 98.7266 98.2644 99.7576 98.2644Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
            <path
              d="M99.7576 49.3322C100.789 49.3322 101.624 50.1684 101.624 51.1998C101.624 52.2313 100.789 53.0675 99.7576 53.0675C98.7266 53.0675 97.8909 52.2313 97.8909 51.1998C97.8909 50.1684 98.7266 49.3322 99.7576 49.3322Z"
              fill="white"
              fillOpacity="0.08"
            ></path>
          </svg>
        </span>
      </div>
    </footer>

     <a
      href="#"
      onClick={handleClick}
      className="back-to-top fixed bottom-8 left-auto right-8 z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-dark"
    >
      <span
        className="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white"
      ></span>
    </a>

</>
  );
};

export default Home;