import React, { useState, useEffect } from "react";
import './Weather.css'

const Weather_2 = ({ coords, city }) => {
  const [forecast, setForecast] = useState([]);
  const apiKey = "0fd5c2fa4e62451a817fad3371f7ff11";

  const weatherImages = {
    Clear: 'weather_icons/sunny.png',
    Clouds: 'weather_icons/cloudy.png',
    Rain: 'weather_icons/rainy.png',
    Drizzle: 'weather_icons/rainy.png',
    Thunderstorm: 'weather_icons/bolt.png',
    Snow: 'weather_icons/snow.png',
    Mist: 'weather_icons/fog.png',
    Default: 'weather_icons/default.png'
  };

  useEffect(() => {
    const fetchForecast = async () => {
      const url = city
        ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=kr`
        : `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=kr`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === "200") {
          const processedData = [];
          const seenDays = new Set();

          data.list.forEach((item) => {
            const date = item.dt_txt.split(" ")[0];
            if (!seenDays.has(date)) {
              processedData.push(item);
              seenDays.add(date);
            }
          });
          setForecast(processedData);
        }
      } catch (err) {
        console.error("ERROR");
      }
    };
    fetchForecast();
  }, [coords, city]);

  const getDayOfWeek = (dateString) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const day = new Date(dateString).getDay();
    return week[day];
  };

  if (forecast.length === 0) return <p className="status_msg">예보 로딩 중...</p>;

  return (
    <div className="weather_contents_2">
      <h3>주간 예보</h3>
      <div className="weather_week">
        <ul>
          {forecast.map((day, index) => {
            const dateParts = day.dt_txt.split(" ")[0].split("-");
            const monthDay = `${dateParts[1]}/${dateParts[2]}`;
            
            const mainWeather = day.weather[0].main;
            const iconSrc = weatherImages[mainWeather] || weatherImages.Default;

            return (
              <li key={index}>
                <span className="date_text">{monthDay}({getDayOfWeek(day.dt_txt)})</span>
                
                <img src={iconSrc} alt={mainWeather} className="forecast_mini_icon" />
                
                <span className="temp_text">{Math.round(day.main.temp)}°C</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Weather_2;