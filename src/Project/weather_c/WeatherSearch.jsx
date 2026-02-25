import React, { useState } from 'react';

const WeatherSearch = ({ onSearch, onReset }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input); 
      setInput('');    // 검색 후 입력창 비우기
    }
  };

  return (
    <div className='weather_search'>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search City"
        />
        <button className="search_btn" type="submit"></button>
        <button className="currnet_btn" type="button" onClick={onReset}></button>
      </form>
    </div>
  );
};

export default WeatherSearch;