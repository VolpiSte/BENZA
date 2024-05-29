import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ title, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white text-right w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {selectedItem ? `${title} - ${selectedItem.label}` : title}
        <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 ms-3" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {items.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelect(item)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  })).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Dropdown;
