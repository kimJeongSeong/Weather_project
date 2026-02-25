import React, { useState, useEffect } from 'react';

const Watch = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000); 
    return () => clearInterval(timer);
  }, []);


  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${month}-${day}`;
  };

  const formatTime = (date) => {
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    
    return `${hh}:${mm}`;
  };

  return (
    <div className="watch_container">
      <div className="date_text">{formatDate(now)}</div>
      <div className="time_text">{formatTime(now)}</div>
    </div>
  );
};

export default Watch;