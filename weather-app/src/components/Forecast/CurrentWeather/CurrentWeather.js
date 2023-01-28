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

  return (
    <div className={styles["current-weather-container"]}>
      <h1>Weather now</h1>
      <div className={styles["weather-and-temperature"]}>
        {weather.current_weather ? <img src={WeatherDecoder(weather.current_weather.weathercode).img} alt="current weather" /> : emptyCurrentWeatherData()}
        {hourlyUnits ? <h1><span>{currentWeather.temperature}</span>{hourlyUnits.temperature_2m}</h1> : emptyCurrentTemperatureData()}
      </div>
    </div>
  );
}

export default CurrentWeather;