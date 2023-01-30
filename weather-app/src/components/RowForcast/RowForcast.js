import React, { useEffect, useState } from 'react';

import WeatherDecoder from '../../helpers/weatherDecoder';

import styles from './RowForcast.module.css';

const RowForcast = ({
  title = "---",
  forecast = null,
  index = 0,
}) => {
  const [subTitle, setSubTitle] = useState(null);
  const [wearherCode, setWearherCode] = useState(null);
  const [temperatureMin, setTemperatureMin] = useState(null);
  const [temperatureMax, setTemperatureMax] = useState(null);
  const [units, setUnits] = useState(null);
  const [additionalInfoActive, setAdditionalInfoActive] = useState(false);

  const showAdditionalInfo = () => {
    setAdditionalInfoActive(!additionalInfoActive);
  }

  const getWindDirection = (direction) => {
    switch (true) {
      case 0 <= direction && direction < 45:
        return "N";
      case 45 <= direction && direction < 90:
        return "NE";
      case 90 <= direction && direction < 135:
        return "E";
      case 135 <= direction && direction < 180:
        return "SE";
      case 180 <= direction && direction < 225:
        return "S";
      case 225 <= direction && direction < 270:
        return "SW";
      case 270 <= direction && direction < 315:
        return "W";
      case 315 <= direction && direction <= 360:
        return "NW";

      default:
        console.log("Error: no direction avaiulable!");
        return "N/A"
    }
  }

  useEffect(() => {
    setSubTitle(forecast.daily.time[index]);
    setWearherCode(forecast.daily.weathercode[index]);
    setTemperatureMin(forecast.daily.temperature_2m_min[index]);
    setTemperatureMax(forecast.daily.temperature_2m_max[index]);
    setUnits(forecast.daily_units.temperature_2m_min);
  }, [forecast])
  return (
    <>
      <div className={styles["forecast-information"]} onClick={showAdditionalInfo}>
        <div className={styles["title"]}>
          <h1 className={styles["main"]}>{title}</h1>
          <h1 className={styles["secondary"]}>{subTitle}</h1>
        </div>
        <div className={styles["info-container"]} >
          <img src={WeatherDecoder(wearherCode).img} alt="weather" />
          <h1 className={styles["max"]}>{temperatureMax}{units}</h1>
          <h1 className={styles["min"]}>{temperatureMin}{units}</h1>
        </div>
      </div >
      <div className={`${styles["info-detailed"]} ${additionalInfoActive ? styles["active"] : styles["hidden"]}`} >
        <h3>Wind direction: {getWindDirection(forecast.daily.winddirection_10m_dominant[index])}</h3>
        <h3>Wind speed: {forecast.daily.windspeed_10m_max[index]} {forecast.daily_units.windspeed_10m_max}</h3>
        <h3>Precipitation: {forecast.daily.precipitation_sum[index]} {forecast.daily_units.precipitation_sum}</h3>
        <h3>Solar radiation: {forecast.daily.shortwave_radiation_sum[index]} {forecast.daily_units.shortwave_radiation_sum}</h3>
      </div>
    </>
  )
}

export default RowForcast;