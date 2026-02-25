import "./Project.css";
import Contents_home from "./Contents/Contents_home";
import User from "./User/User";
import MainWeather from "./weather_c/Mainweather";
import Watch from "./Watch";
import WeatherSearch from "./weather_c/WeatherSearch";

const Main = () => {
  return (
    <div className="main_tile">

    <div className="main">
      
      <div className="main_left">
        <div className="weather_main">
          <MainWeather />
        </div>
      </div>
      
      <div className="main_middle">
        <div className="main_title">
          <h1>Weather Project</h1>
        </div>

        <div className="contents">
          <Contents_home />
        </div>
      </div>

      <div className="main_right">

        <div className="watch_total">
        <div className="watch">
          <Watch />
        </div>
          <div className="air_con"></div>
        </div>

        <div className="user">
          <User />
        </div>
      </div>

    </div>
    </div>
  );
};

export default Main;
