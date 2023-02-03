import React from 'react';
import { useSelector } from 'react-redux'
import { selectedCityWeather } from '../../../store/citySlice';


import styles from './HourlyWeather.module.css';
import RowForcast from '../../RowForcast/RowForcast';


const HourlyWeather = () => {
  const weather = useSelector(selectedCityWeather);

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

  const getCurrentTime = (i) => {
    const now = Math.round(roundToNearestHour(new Date()).getTime() / 1000);
    const offset = now + (i * 3600);

    return `${new Date(offset * 1000).getHours()}:00`;
  }

  const renderRows = () => {
    const rows = []
    const time = getCurrentTimeIndex();
    for (let i = 0; i < 24; i++) {
      rows.push(
        <RowForcast key={time + i} {...{
          title: getCurrentTime(i),
          forecast: weather,
          index: time + i,
          type: "hours"
        }} />
      )
    }
    return rows
  }

  return (
    <>
      <div className={styles["hourly-forecast"]}>
        <h1>24 Hours</h1>
      </div>
      {weather.hourly
        ? <>
          {renderRows()}
        </>
        : null}
    </>
  );
}

export default HourlyWeather;