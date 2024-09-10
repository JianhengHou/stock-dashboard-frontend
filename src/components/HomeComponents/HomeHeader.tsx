import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alphahoodLogo from "../../images/home_logo/alphahood-logo.svg";

const HomeHeader: React.FC = ({ isHomePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const defaultLang = 'en';
  const [language, setLanguage] = useState(localStorage.getItem('language') || defaultLang);
  const navigate = useNavigate();

  // Function to handle language switch
  const handleLanguageSwitch = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    window.location.reload(); // Reload the page

  };

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle sign-in button click
  const handleSignIn = () => {
    navigate('/auth/signin');
  };

  return (
    <div className="container">
      <div className="relative flex items-center justify-between">
        {/* Logo */}
        <div className="w-75 max-w-full px-4">
          <a href="/" className="block py-4">
            <img src={alphahoodLogo} alt="logo" className="w-full" />
          </a>
        </div>

        {/* Empty space based on language */}
        <div className={`relative flex items-center justify-between ${language === 'cn' ? 'w-22' : 'w-2'}`}></div>

        {/* Navigation and Sign-In button for Desktop */}
        <div className="flex w-full items-center justify-between">
          <div>
            <button
              id="navbarToggler"
              className="absolute -right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              onClick={toggleMenu}
            >
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-white"></span>
            </button>
            <nav
              id="navbarCollapse"
              className={`absolute top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none dark:lg:bg-transparent xl:px-6 ${
                isMenuOpen ? '' : 'hidden'
              }`}
            >
              <ul className="block lg:flex 2xl:ml-25">
                {['home', 'about', 'features', 'pricing', 'team', 'contact'].map((item) => (
                  <li key={item} className="group relative">
                    <a
                      href={isHomePage?`#${item}`:`/`}
                      className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-dark group-hover:text-primary dark:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70"
                    >
                      {language === 'en' ? item.charAt(0).toUpperCase() + item.slice(1) : getTranslation(item)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Language Switcher */}
          <div className="flex">
            <button
              onClick={() => handleLanguageSwitch('en')}
              className={`px-1 py-1 lg:px-2 rounded-xl text-sm lg:text-base ${
                language === 'en' ? 'text-[#C5CDFB]' : 'text-white'
              }`}
            >
              EN
            </button>
            <a className="text-white">/</a>
            <button
              onClick={() => handleLanguageSwitch('cn')}
              className={`px-1 py-1 lg:px-2 rounded-xl text-sm lg:text-base ${
                language === 'cn' ? 'text-[#C5CDFB]' : 'text-white'
              }`}
            >
              中
            </button>
          </div>

          {/* Sign-In Button */}
          <div className="flex items-center justify-end pr-10 lg:pr-0">
            <a
              href="/auth/signin"
              className="loginBtn px-2 py-1 text-sm lg:text-base font-medium text-white hover:opacity-70 border border-white rounded-xl lg:px-5 lg:w-auto flex-shrink-0"
            >
              {language === 'en' ? 'Sign In' : '登录'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Function to return translations for different sections
  function getTranslation(key: string): string {
    const translations: { [key: string]: string } = {
      home: '主页',
      about: '关于',
      features: '功能',
      pricing: '定价',
      team: '团队',
      contact: '联系',
    };
    return translations[key] || key;
  }
};

export default HomeHeader;
