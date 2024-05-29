// Navbar.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'it' ? 'en' : 'it';
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center relative z-20">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/Ostisa.png" alt="logo" className="h-10 w-10" />
          <span className="ml-2 text-xl font-extrabold">GasGo</span>
        </Link>
      </div>
      <div className="hidden md:flex space-x-4 items-center">
        <Link to="/" className="hover:text-blue-300 transition-colors duration-300 font-bold">{t('navbar.homepage')}</Link>
        <Link to="/about" className="hover:text-blue-300 transition-colors duration-300 font-bold">{t('navbar.aboutUs')}</Link>
        <label className="inline-flex items-center cursor-pointer ml-4 dark-mode-toggle">
          <input type="checkbox" value="" className="sr-only peer" onChange={toggleDarkMode} />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-300 dark:text-gray-300">{t('navbar.darkMode')}</span>
        </label>
        <button onClick={toggleLanguage} className="flag-button">
          <img
            src={currentLanguage === 'it' ? '/it.png' : '/en.png'}
            alt={currentLanguage === 'it' ? 'Italian Flag' : 'English Flag'}
            className="h-5 w-6"
          />
        </button>
      </div>
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
      </button>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col space-y-2 p-4 md:hidden z-30"
        >
          <Link to="/" className="hover:text-blue-300 transition-colors duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.howToUse')}</Link>
          <Link to="/about" className="hover:text-blue-300 transition-colors duration-300" onClick={() => setMenuOpen(false)}>{t('navbar.aboutUs')}</Link>
          <label className="inline-flex items-center cursor-pointer mt-4 dark-mode-toggle">
            <input type="checkbox" value="" className="sr-only peer" onChange={toggleDarkMode} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-300 dark:text-gray-300">{t('navbar.darkMode')}</span>
          </label>
          <button onClick={toggleLanguage} className="flag-button mt-2">
            <img
              src={currentLanguage === 'it' ? '/it.png' : '/en.png'}
              alt={currentLanguage === 'it' ? 'Italian Flag' : 'English Flag'}
              className="h-5 w-6"
            />
          </button>
        </motion.div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
};

export default Navbar;
