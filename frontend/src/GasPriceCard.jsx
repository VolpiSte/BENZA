import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMapMarkerAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const GasPriceCard = ({ station, darkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className={`rounded-lg shadow-md p-4 my-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-between items-center">
        <div className="flex-grow mx-4">
          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{station.name}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{`${t('fuel')}: ${station.fuel}`}</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{`${t('type')}: ${station.type}`}</p>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{`${t('distance')}: ${station.distance}`}</p>
        </div>
        <button onClick={toggleOpen} className={darkMode ? 'text-white' : 'text-gray-900'}>
          <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            {station.prices.map((price, index) => (
              <div key={index} className={`flex justify-between mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span>{price.type}</span>
                <span>{price.amount}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-gray-900'}`}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> {t('directions')}
            </button>
            <button className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-gray-900'}`}>
              <FontAwesomeIcon icon={faShareAlt} className="mr-2" /> {t('share')}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

GasPriceCard.propTypes = {
  station: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fuel: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default GasPriceCard;
