import React, { useEffect } from 'react';

import imgHumidity from '../../img/weather-icons/humidity.svg';
import imgNotAvailable from '../../img/weather-icons/not-available.svg';
import imgWindsock from '../../img/weather-icons/windsock.svg';
import imgSunrise from '../../img/weather-icons/sunrise.svg';
import imgSunset from '../../img/weather-icons/sunset.svg';

import styles from './InfoIconSmall.module.scss';


const InfoIconSmall = (
  { type = "",
    value = "---",
    units = "", }
) => {

  const typeMapper = () => {
    switch (type) {
      case "humidity":
        return (
          <>
            <img src={imgHumidity} alt="humidity" />
            <h3>{value} {units}</h3>
          </>
        )
      case "windSpeed":
        return (
          <>
            <img src={imgWindsock} alt="windspeed" />
            <h3>{value} {units}</h3>
          </>
        )
      case "sunsrise":
        return (
          <>
            <img src={imgSunrise} alt="windspeed" />
            <h3>{value} {units}</h3>
          </>
        )
      case "sunset":
        return (
          <>
            <img src={imgSunset} alt="windspeed" />
            <h3>{value} {units}</h3>
          </>
        )

      default:
        return (
          <>
            <img src={imgNotAvailable} alt="windspeed" />
            <h3>{value}</h3>
          </>
        )
    }
  }

  return (
    <div className={styles["info-icon-small"]}>
      {typeMapper()}
    </div>
  )
}

export default InfoIconSmall;