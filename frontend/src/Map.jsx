import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Map = ({ coordinates, setCoordinates, range }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const initialZoomLevel = coordinates ? (isMobile ? 14 : 15) : 6;

    const map = new window.google.maps.Map(mapRef.current, {
      center: coordinates || { lat: 41.9028, lng: 12.4964 }, // Default to Italy
      zoom: initialZoomLevel,
    });

    mapInstance.current = map;

    markerRef.current = new window.google.maps.Marker({
      map,
      position: coordinates || { lat: 41.9028, lng: 12.4964 },
      title: 'Your Location',
    });

    circleRef.current = new window.google.maps.Circle({
      map,
      center: coordinates || { lat: 41.9028, lng: 12.4964 },
      radius: range * 1000, // Convert km to meters
      fillColor: '#AA0000',
      fillOpacity: 0.2,
      strokeColor: '#AA0000',
      strokeOpacity: 0.5,
      clickable: false,
    });

    map.addListener('click', (e) => {
      const newCoordinates = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setCoordinates(newCoordinates);
    });

    return () => {
      markerRef.current.setMap(null);
      circleRef.current.setMap(null);
    };
  }, []);

  useEffect(() => {
    if (coordinates && markerRef.current && circleRef.current && mapInstance.current) {
      const isMobile = window.innerWidth <= 768;
      const zoomLevel = coordinates ? (isMobile ? 14 : 15) : 6;

      markerRef.current.setPosition(coordinates);
      circleRef.current.setCenter(coordinates);
      mapInstance.current.setCenter(coordinates);
      mapInstance.current.setZoom(zoomLevel); // Use determined zoom level
    }
  }, [coordinates]);

  useEffect(() => { 
    if (circleRef.current) {
      circleRef.current.setRadius(range * 1000); // Update radius
    }
  }, [range]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full w-full rounded-lg overflow-hidden"
    >
      <div ref={mapRef} className="w-full h-full" />
    </motion.div>
  );
};

Map.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  setCoordinates: PropTypes.func.isRequired,
  range: PropTypes.number.isRequired,
};

export default Map;
