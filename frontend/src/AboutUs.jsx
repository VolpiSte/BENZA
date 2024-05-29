// AboutUs.jsx
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar';
import '../index.css';
import { useState, useEffect } from 'react';

const AboutUs = () => {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar toggleDarkMode={toggleDarkMode} />
      <div className="flex-grow">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-center mb-8">{t('aboutUs.title')}</h1>
          <div className="max-w-4xl mx-auto text-center">
            <p className="mb-8">{t('aboutUs.description')}</p>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">{t('aboutUs.teamTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="/public/en.png" alt="Team member" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">{t('aboutUs.teamMember1.name')}</h3>
              <p>{t('aboutUs.teamMember1.role')}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="/public/it.png" alt="Team member" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">{t('aboutUs.teamMember2.name')}</h3>
              <p>{t('aboutUs.teamMember2.role')}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <img src="/public/Ostisa.png" alt="Team member" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">{t('aboutUs.teamMember3.name')}</h3>
              <p>{t('aboutUs.teamMember3.role')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
