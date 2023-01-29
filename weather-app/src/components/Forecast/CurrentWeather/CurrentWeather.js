import React from 'react';
import { useSelector } from 'react-redux'
import { selectedCityWeather } from '../../../store/citySlice';


import WeatherDecoder from '../../../helpers/weatherDecoder';

import styles from './CurrentWeather.module.css';
import InfoIconSmall from '../../InfoIconSmall/InfoIconSmall';


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
      <div className={styles["additional-information"]}>
        {weather.hourly
          ? <InfoIconSmall {...{
            type: "humidity",
            value: weather.hourly.relativehumidity_2m[getCurrentTimeIndex()],
            units: weather.hourly_units.relativehumidity_2m,
          }} />
          : null}
        {weather.hourly
          ? <InfoIconSmall {...{
            type: "windSpeed",
            value: weather.hourly.windspeed_10m[getCurrentTimeIndex()],
            units: weather.hourly_units.windspeed_10m,
          }} />
          : null}
        {weather.hourly
          ? <InfoIconSmall {...{
            type: "sunsrise",
            value: weather.daily.sunrise[0].slice(-5),
          }} />
          : null}
        {weather.hourly
          ? <InfoIconSmall {...{
            type: "sunset",
            value: weather.daily.sunset[0].slice(-5),
          }} />
          : null}
        {/* <h1>{weather.hourly ? JSON.stringify(weather.hourly.relativehumidity_2m[getCurrentTimeIndex()]) : null}</h1>
        <h1>{weather.hourly ? JSON.stringify(weather.hourly.windspeed_10m[getCurrentTimeIndex()]) : null}</h1>
        <h1>{weather.daily ? JSON.stringify(weather.daily.sunrise[0].slice(-5)) : null}</h1>
        <h1>{weather.daily ? JSON.stringify(weather.daily.sunset[0].slice(-5)) : null}</h1> */}
      </div>
    </div>
  );
}

export default CurrentWeather;