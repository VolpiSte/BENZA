import { useState, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import Map from './Map';
import Card from './Card';
import Modal from './Modal';
import GasPriceList from './GasPriceList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

function Homepage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [rangeValue, setRangeValue] = useState(0.5);
  const [showFilters, setShowFilters] = useState(true);
  const [showGasPrices, setShowGasPrices] = useState(false);
  const [apiData, setApiData] = useState(null);

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
          const processedData = data.results.map(result => ({
            name: result.name,
            logo: result.brand,
            fuel: result.fuels.map(fuel => fuel.name).join(', '),
            type: result.fuels.every(fuel => fuel.isSelf) ? 'Self' : 'Served',
            distance: `${rangeValue} km`,
            prices: result.fuels.map(fuel => ({
              type: fuel.name,
              amount: `${fuel.price} €`
            })),
          }));
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
        <div className="h-80 md:h-auto md:flex-1">
          <Map coordinates={coordinates} setCoordinates={setCoordinates} range={rangeValue} />
        </div>
        <div className="md:flex-1 md:overflow-y-auto">
          {showFilters && (
            <Card
              rangeValue={rangeValue}
              setRangeValue={setRangeValue}
              onSearch={handleSearch}
              onCenter={handleCenter}
              darkMode={darkMode}
              toggleFilters={toggleFilters}
              handleApiRequest={handleApiRequest}
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
      <Modal showModal={showModal} handleAllow={handleAllow} handleDeny={handleDeny} />
    </div>
  );
}

export default Homepage;
