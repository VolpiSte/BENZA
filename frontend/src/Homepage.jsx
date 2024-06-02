import { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import Map from './Map';
import Card from './Card';
import Modal from './Modal';
import GasPriceList from './GasPriceList';
import BackToTop from './BackToTop'; // Import BackToTop component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

function Homepage() {
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [rangeValue, setRangeValue] = useState(0.5);
  const [showFilters, setShowFilters] = useState(true);
  const [showGasPrices, setShowGasPrices] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [filterOptions, setFilterOptions] = useState({ selectedFuel: 'all', selectedService: 'all', selectedSort: '' });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAllow = () => {
    setShowModal(false);
    getGeolocation();
  };

  const handleDeny = () => {
    setShowModal(false);
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(newCoordinates);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleCenter = () => {
    getGeolocation();
  };

  const handleSearch = (placeId) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const newCoordinates = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        setCoordinates(newCoordinates);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const checkGeolocationPermission = useCallback(async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state === 'granted') {
        getGeolocation();
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error checking geolocation permission:', error);
      setShowModal(true);
    }
  }, []);

  const haversineDistance = (coords1, coords2) => {
    const toRadians = (angle) => (angle * Math.PI) / 180;
    const R = 6371; // Earth radius in kilometers

    const dLat = toRadians(coords2.lat - coords1.lat);
    const dLng = toRadians(coords2.lng - coords1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(coords1.lat)) *
        Math.cos(toRadians(coords2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleApiRequest = () => {
    if (!coordinates) {
      alert('Please select a location on the map.');
      return;
    }

    const apiUrl = 'http://localhost:3000';
    const params = {
      points: [coordinates],
      radius: rangeValue,
      fuelType: 'all', // Modify as per your logic
      selfService: '0' // Modify as per your logic
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      },
      body: JSON.stringify(params)
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          let processedData = data.results.map(result => ({
            name: result.name,
            logo: result.brand,
            fuel: result.fuels.map(fuel => `${t(`fuelTypes.${fuel.name}`)} (${t(`serviceTypes.${fuel.isSelf ? 'Self' : 'Servito'}`)})`).join(', '),
            type: result.fuels.every(fuel => fuel.isSelf) ? t('serviceTypes.Self') : t('serviceTypes.Servito'),
            distance: `${haversineDistance(coordinates, result.location).toFixed(2)} km`,
            prices: result.fuels.map(fuel => ({
              type: `${t(`fuelTypes.${fuel.name}`)} (${t(`serviceTypes.${fuel.isSelf ? 'Self' : 'Servito'}`)})`,
              amount: `${fuel.price} €`
            })),
            isSelfService: result.fuels.some(fuel => fuel.isSelf)
          }));

          const { selectedFuel, selectedService, selectedSort } = filterOptions;

          // Filter by fuel type
          if (selectedFuel !== 'all') {
            processedData = processedData.filter(station =>
              station.fuel.toLowerCase().includes(selectedFuel)
            );
          }

          // Filter by service type
          if (selectedService !== 'all') {
            const isSelf = selectedService === 'self';
            processedData = processedData.filter(station =>
              station.isSelfService === isSelf
            );
          }

          // Sort data
          if (selectedSort === 'price') {
            processedData.sort((a, b) => {
              const priceA = parseFloat(a.prices[0].amount.split(' ')[0]);
              const priceB = parseFloat(b.prices[0].amount.split(' ')[0]);
              return priceA - priceB;
            });
          } else if (selectedSort === 'distance') {
            processedData.sort((a, b) => {
              const distanceA = parseFloat(a.distance.split(' ')[0]);
              const distanceB = parseFloat(b.distance.split(' ')[0]);
              return distanceA - distanceB;
            });
          }

          setApiData(processedData);
          setShowGasPrices(true);
        } else {
          alert('Failed to fetch data from API.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    checkGeolocationPermission();
  }, [checkGeolocationPermission]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar toggleDarkMode={toggleDarkMode} />
      <div className="flex-grow p-4 flex flex-col md:flex-row gap-4">
        <div className={`h-80 md:h-auto ${isMobile ? 'fixed top-0 left-0 right-0 w-full z-10' : 'md:w-1/2 md:h5/6 md:max-h-[calc(100vh-64px)]'}`}>
          <Map coordinates={coordinates} setCoordinates={setCoordinates} range={rangeValue} />
        </div>
        <div className={`md:w-1/2 md:h-screen md:overflow-y-auto md:max-h-[calc(100vh-128px)] ${isMobile ? 'pt-60' : ''}`}>
          {showFilters && (
            <Card
              rangeValue={rangeValue}
              setRangeValue={setRangeValue}
              onSearch={handleSearch}
              onCenter={handleCenter}
              darkMode={darkMode}
              toggleFilters={toggleFilters}
              handleApiRequest={handleApiRequest}
              setShowFilters={setShowFilters}  // pass the setShowFilters function to Card
              setFilterOptions={setFilterOptions} // pass the setFilterOptions function to Card
            />
          )}
          {showGasPrices && <GasPriceList darkMode={darkMode} apiData={apiData} />}
        </div>
      </div>
      {!showFilters && (
        <button
          onClick={toggleFilters}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg md:bottom-auto md:top-20 md:right-4"
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
      )}
      <BackToTop /> {/* Add the BackToTop component */}
      <Modal showModal={showModal} handleAllow={handleAllow} handleDeny={handleDeny} />
    </div>
  );
}

export default Homepage;
  