import React, { useState, useEffect } from 'react';
import './Weather.css';

const Weather_1 = ({ coords, city }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = "0fd5c2fa4e62451a817fad3371f7ff11";

  const weatherImages = {
    Clear: 'weather_icons/sunny.png',   // 맑음 이미지
    Clouds: 'weather_icons/cloudy.png', // 구름 이미지
    Rain: 'weather_icons/rainy.png',    // 비 이미지
    Drizzle: 'weather_icons/rainy.png', // 이슬비
    Thunderstorm: 'weather_icons/bolt.png', // 번개
    Snow: 'weather_icons/snow.png',    // 눈
    Mist: 'weather_icons/fog.png',      // 안개
    Default: 'weather_icons/default.png'
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const url = city 
        ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=kr`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) setWeather(data);
        else alert("NO Search");
      } catch (err) {
        console.error("ERROR");
      }
    };
    fetchWeather();
  }, [coords, city]);

  if (!weather) return <p>Loading...</p>;

  const mainWeather = weather.weather[0].main;
  const weatherIconSrc = weatherImages[mainWeather] || weatherImages.Default;

  return (
    <div className='weather_contents_1'>
      <h2>{weather.name}의 현재 날씨</h2>
      
      
      <div className="weather_icon">
        <img 
          src={weatherIconSrc} 
          alt={mainWeather} 
        />
      </div>

      <p>온도: {Math.round(weather.main.temp)}°C | {weather.weather[0].description}</p>
    </div>
  );
};

export default Weather_1;