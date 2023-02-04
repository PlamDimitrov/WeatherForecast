import React, { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { selectedCityWeather } from '../../../store/citySlice';


import WeatherDecoder from '../../../helpers/weatherDecoder';

import styles from './CurrentWeather.module.scss';
import InfoIconSmall from '../../InfoIconSmall/InfoIconSmall';
import RowForcast from '../../RowForcast/RowForcast';


const CurrentWeather = ({ currentWeather, hourlyUnits }) => {
  const weather = useSelector(selectedCityWeather);
  const [thirdDayName, setThirdDayName] = useState(null);

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
    const now = new Date();
    const rounded = Date.parse(roundToNearestHour(now));
    let index = weather.hourly.time.findIndex((time) => Date.parse(time) === rounded);

    return index < 0 ? 0 : index;
  }

  useLayoutEffect(() => {
    if (weather.daily !== undefined) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const date = new Date(weather.daily.time[2]);
      setThirdDayName(days[date.getDay()])
    }
  }, [weather.daily])

  return (
    <div>
      <div className={styles["current-weather-container"]}>
        <h1>The weather now</h1>
        <div
          className={styles["weather-and-temperature"]}>
          {weather.current_weather
            ? <img src={WeatherDecoder(weather.current_weather.weathercode, true).img}
              alt="current weather" />
            : emptyCurrentWeatherData()}
          {hourlyUnits ? <h1><span>{currentWeather.temperature}</span>{hourlyUnits.temperature_2m}</h1> : emptyCurrentTemperatureData()}
        </div>
        {weather.current_weather ? <h2>{WeatherDecoder(weather.current_weather.weathercode, true).description}</h2> : emptyCurrentWeatherData()}
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
        </div>
      </div>
      {weather.daily && (
        <div className={styles["three-day-forecast"]}>
          <RowForcast {...{
            title: "Today",
            forecast: weather,
            index: 0
          }} />
          <RowForcast {...{
            title: "Tomorrow",
            forecast: weather,
            index: 1
          }} />
          <RowForcast {...{
            title: thirdDayName,
            forecast: weather,
            index: 2
          }} />
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;