import React, { useState, useEffect } from 'react';
import Weather_1 from './Weather_1';
import Weather_2 from './Weather_2';
import WeatherSearch from './WeatherSearch'; 
import './Weather.css';

const MainWeather = () => {
  const [coords, setCoords] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => { setCity('Seoul'); }
    );
  }, []);

 
  const handleSearch = (searchCity) => {
    setCity(searchCity);
    setCoords(null);
  };

  // 위치 리셋 
  const resetToLocation = () => {
    setCity('');
    navigator.geolocation.getCurrentPosition((pos) => {
      setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    });
  };

  return (
    <div className='weather_total'>
      
      <WeatherSearch onSearch={handleSearch} onReset={resetToLocation} />

      {(coords || city) ? (
        <>
          <Weather_1 coords={coords} city={city} />
          <Weather_2 coords={coords} city={city} />
        </>
      ) : (
        <p>위치 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default MainWeather;