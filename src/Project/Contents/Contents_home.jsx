import React from "react";
import Thanks from "./Contents_list/Thanks";
import News from "./Contents_list/News";
import Fortune from "./Contents_list/Fortune";
import Game from "./Contents_list/Game";
import "./Contents.css";
import { Route, Routes } from "react-router-dom";
import Contents_nav from "./Contents_nav";
import axios from "axios";


const Contents_main = () => {
  return (
    <div className="contents_home">
      <Contents_nav />

      <div className="contents_window">
        <Routes>
          <Route path="/News" element={<News />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Fortune" element={<Fortune />} />
          <Route path="/Thanks" element={<Thanks />} />
        </Routes>
      </div>
    </div>
  );
};

export default Contents_main;
