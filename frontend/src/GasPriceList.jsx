import PropTypes from 'prop-types';
import GasPriceCard from './GasPriceCard';
import { useTranslation } from 'react-i18next';

const GasPriceList = ({ darkMode, apiData }) => {
  const { t } = useTranslation();

  return (
    <div className={`p-6 rounded-lg shadow-lg max-w-4xl mx-auto ${darkMode ? 'bg-gray-900' : 'bg-white'} h-full md:overflow-y-auto`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('Gas Prices')}</h2>
      {apiData.map((station, index) => (
        <GasPriceCard key={index} station={station} darkMode={darkMode} />
      ))}
    </div>
  );
};

GasPriceList.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  apiData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    fuel: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    prices: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
};

export default GasPriceList;
