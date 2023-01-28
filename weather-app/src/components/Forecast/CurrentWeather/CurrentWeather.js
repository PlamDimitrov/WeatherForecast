import React from 'react';
import { useSelector } from 'react-redux'
import { selectedCityWeather } from '../../../store/citySlice';


import WeatherDecoder from '../../../helpers/weatherDecoder';

import styles from './CurrentWeather.module.css';


const CurrentWeather = ({ currentWeather, hourlyUnits }) => {
  const weather = useSelector(selectedCityWeather);

  const emptyCurrentTemperatureData = () => {
    return (
      <h1><span>"---"</span>°C</h1>
    )
  }
  const emptyCurrentWeatherData = () => {
    return (
      <h1>"---"</h1>
    )
  }

  const roundToNearestHour = (date) => {
    date.setMinutes(date.getMinutes() + 30);
    date.setMinutes(0, 0, 0);
    return date;
  }

  const getCurrentTimeIndex = () => {
    const event = new Date();
    const rounded = Date.parse(roundToNearestHour(event));

    return weather.hourly.time.findIndex((time) => Date.parse(time) === rounded);
  }

  return (
    <div className={styles["current-weather-container"]}>
      <h1>The weather now</h1>
      <div className={styles["weather-and-temperature"]}>
        {weather.current_weather ? <img src={WeatherDecoder(weather.current_weather.weathercode).img} alt="current weather" /> : emptyCurrentWeatherData()}
        {hourlyUnits ? <h1><span>{currentWeather.temperature}</span>{hourlyUnits.temperature_2m}</h1> : emptyCurrentTemperatureData()}
      </div>
      {weather.current_weather ? <h2>{WeatherDecoder(weather.current_weather.weathercode).description}</h2> : emptyCurrentWeatherData()}
      {weather.current_weather ? <h3>Apparent temperature {weather.hourly.apparent_temperature[getCurrentTimeIndex()]} <span>{weather.hourly_units.apparent_temperature}</span></h3> : emptyCurrentWeatherData()}
      <div>
      </div>
    </div>
  );
}

export default CurrentWeather;