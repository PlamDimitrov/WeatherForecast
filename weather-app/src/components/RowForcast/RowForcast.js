import React, { useEffect, useLayoutEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useIsDesktop } from "../Hooks/useMediaQuery";

import styles from './RowForcast.module.scss';

import WeatherDecoder from '../../helpers/weatherDecoder';

import Grid from '@mui/material/Grid';

const RowForcast = ({
  title = "---",
  forecast = null,
  index = 0,
  type = "days"
}) => {
  const [subTitle, setSubTitle] = useState(null);
  const [wearherCode, setWearherCode] = useState(null);
  const [temperatureMin, setTemperatureMin] = useState(null);
  const [temperatureMax, setTemperatureMax] = useState(null);
  const [units, setUnits] = useState(null);
  const [additionalInfoActive, setAdditionalInfoActive] = useState(null);
  const [winddirection, setWinddirection] = useState(null);
  const [windspeed, setWindspeed] = useState(null);
  const [windspeedUnits, setWindspeedUnits] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);
  const [precipitationUnits, setPrecipitationUnits] = useState(null);
  const [radiation, setRadiation] = useState(null);
  const [radiationUnits, setRadiationUnits] = useState(null);
  const isDesktop = useIsDesktop();

  const showOrHideRow = () => {
    switch (additionalInfoActive) {
      case false:
        return styles["hidden"];
      case true:
        return styles["active"];

      default:
        return "";
    }
  }

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

  useLayoutEffect(() => {
    switch (type) {
      case "days":
        setSubTitle(forecast.daily.time[index]);
        setWearherCode(forecast.daily.weathercode[index]);
        setTemperatureMin(forecast.daily.temperature_2m_min[index]);
        setTemperatureMax(forecast.daily.temperature_2m_max[index]);
        setUnits(forecast.daily_units.temperature_2m_min);
        setWinddirection(forecast.daily.winddirection_10m_dominant[index]);
        setWindspeed(forecast.daily.windspeed_10m_max[index]);
        setWindspeedUnits(forecast.daily_units.windspeed_10m_max);
        setPrecipitation(forecast.daily.precipitation_sum[index]);
        setPrecipitationUnits(forecast.daily_units.precipitation_sum);
        setRadiation(forecast.daily.shortwave_radiation_sum[index]);
        setRadiationUnits(forecast.daily_units.shortwave_radiation_sum);
        break;
      case "hours":
        setSubTitle(forecast.hourly.time[index].split("T")[0]);
        setWearherCode(forecast.hourly.weathercode[index]);
        setTemperatureMin(null);
        setTemperatureMax(forecast.hourly.temperature_2m[index]);
        setUnits(forecast.hourly_units.temperature_2m);
        setWinddirection(forecast.hourly.winddirection_10m[index]);
        setWindspeed(forecast.hourly.windspeed_10m[index]);
        setWindspeedUnits(forecast.hourly_units.windspeed_10m);
        setPrecipitation(forecast.hourly.precipitation[index]);
        setPrecipitationUnits(forecast.hourly_units.precipitation);
        setRadiation(forecast.hourly.direct_radiation[index]);
        setRadiationUnits(forecast.hourly_units.direct_radiation);
        break;

      default:
        console.log("Error on rowForcast data set.");
        break;
    }
  }, [forecast])
  return (
    <div className={styles["row-container"]}    >
      <motion.div
        whileHover={isDesktop
          ? { scale: 1.2 }
          : { scale: 1.3, marginLeft: "12%", marginRight: "12%" }
        }
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={styles["forecast-information"]}
        onClick={showAdditionalInfo}>
        <div className={styles["title"]}>
          <h1 className={styles["main"]}>{title}</h1>
          <h1 className={styles["secondary"]}>{subTitle}</h1>
        </div>
        <div className={styles["info-container"]} >
          <img src={WeatherDecoder(wearherCode, true).img}
            alt="weather" />
          {temperatureMin !== null ? <h1 className={styles["min"]}>{temperatureMin}{units}</h1> : null}
          {temperatureMax !== null ? <h1 className={styles["max"]}>{temperatureMax}{units}</h1> : null}
        </div>
      </motion.div >
      <div className={`${styles["info-detailed"]} ${showOrHideRow()}`} >
        <Grid sx={{ flexWrap: "nowrap" }} container spacing={0}>
          <Grid item>
            <h3>Wind direction:</h3>
            <h3>Wind speed:</h3>
            <h3>Precipitation:</h3>
            <h3>Solar radiation:</h3>
          </Grid>
          <Grid item>
            <h3>{getWindDirection(winddirection)}</h3>
            <h3>{windspeed} {windspeedUnits}</h3>
            <h3>{precipitation} {precipitationUnits}</h3>
            <h3>{radiation} {radiationUnits}</h3>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default RowForcast;