// src/utils/getJoyrideStyles.js
export const getJoyrideStyles = (darkMode) => ({
    options: {
      arrowColor: darkMode ? '#333' : '#fff',
      backgroundColor: darkMode ? '#333' : '#fff',
      overlayColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
      primaryColor: darkMode ? '#f04' : '#333',
      textColor: darkMode ? '#fff' : '#333',
      zIndex: 1000,
    },
  });