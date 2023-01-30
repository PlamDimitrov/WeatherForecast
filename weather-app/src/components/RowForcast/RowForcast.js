import React from 'react';

import WeatherDecoder from '../../helpers/weatherDecoder';

import styles from './RowForcast.module.css';


const RowForcast = ({
  title = "---",
  subTitle = "---",
  wearherCode = null,
  temperatureMin = "---",
  temperatureMax = "---",
  units = "---",
  forecast = {}
}) => {

  return (
    <div className={styles["forecast-information"]}>
      <div className={styles["title"]}>
        <h1 className={styles["main"]}>{title}</h1>
        <h1 className={styles["secondary"]}>{subTitle}</h1>
      </div>
      <div className={styles["info-container"]} >
        <img src={WeatherDecoder(wearherCode).img} alt="weather" />
        <h1 className={styles["min"]}>{temperatureMin}{units}</h1>
        <h1 className={styles["max"]}>{temperatureMax}{units}</h1>
      </div>
    </div >
  )
}

export default RowForcast;