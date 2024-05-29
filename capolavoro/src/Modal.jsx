import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Modal = ({ showModal, handleAllow, handleDeny }) => {
  const { t } = useTranslation();

  if (!showModal) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 id="modal-title" className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t('modal.title')}</h2>
        <p id="modal-description" className="text-gray-700 dark:text-gray-300 mb-4">
          {t('modal.description')}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleDeny}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            {t('modal.deny')}
          </button>
          <button 
            onClick={handleAllow}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            autoFocus
          >
            {t('modal.allow')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleAllow: PropTypes.func.isRequired,
  handleDeny: PropTypes.func.isRequired,
};

export default Modal;
