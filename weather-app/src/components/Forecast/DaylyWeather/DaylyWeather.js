import React from 'react';
import { useSelector } from 'react-redux'
import { selectedCityWeather } from '../../../store/citySlice';

import styles from './DaylyWeather.module.css';
import RowForcast from '../../RowForcast/RowForcast';


const DaylyWeather = ({ currentWeather, hourlyUnits }) => {
  const weather = useSelector(selectedCityWeather);

  const renderRows = () => {
    const rows = []
    for (let i = 0; i < 7; i++) {
      const dayName = new Date(weather.daily.time[i]).toLocaleDateString('en-us', { weekday: "long" });
      rows.push(
        <RowForcast key={i} {...{
          title: dayName,
          forecast: weather,
          index: i,
          type: "days"
        }} />
      )
    }
    return rows
  }

  return (
    <>
      <div className={styles["dayly-forecast"]}>
        <h1>Next 6 Days</h1>
      </div>
      {weather.hourly
        ? <>
          {renderRows()}
        </>
        : null}
    </>
  );
}

export default DaylyWeather;