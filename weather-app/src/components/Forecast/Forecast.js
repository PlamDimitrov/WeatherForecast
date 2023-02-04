import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from "framer-motion";
import { selectedCityWeather, selectedCity, setNewWeather, setNewLocation } from '../../store/citySlice';
import { useParams } from "react-router-dom";
import api from "../../api";

import styles from './Forecast.module.scss';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CurrentWeather from './CurrentWeather/CurrentWeather';
import HourlyWeather from './HourlyWeather/HourlyWeather';
import DailyWeather from './DailyWeather/DailyWeather';

const Forecast = () => {
  const { cityNameUrl, longitude, latitude } = useParams();
  const dispatch = useDispatch()
  const city = useSelector(selectedCity);
  const weather = useSelector(selectedCityWeather);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("now");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getClientLocation = async () => {
    try {
      const res = await navigator.permissions.query({ name: 'geolocation' });
      if (res.state === "granted") {
        getGeoLocation();
      } else {
        const location = {
          longitude: city.longitude,
          latitude: city.latitude
        }
        const weather = await api.getWeatherByGeoLocation(location);
        dispatch(setNewWeather(weather.data))
      }
    } catch (error) {
      console.log(`Error on geting client location ${error}`);
    }
  }

  const getGeoLocation = async () => {
    await navigator.geolocation.watchPosition(async (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      const cityName = await api.getCityNameByGeoLocation(location);
      const cityData = await api.getCityDataByName(cityName);
      const weather = await api.getWeatherByGeoLocation(location);
      dispatch(setNewLocation(cityData[0]));
      dispatch(setNewWeather(weather.data));
    })
  }

  const setLocationByUrl = async () => {
    const location = {
      latitude,
      longitude,
    }
    const cityData = await api.getCityDataByName(cityNameUrl);
    const weather = await api.getWeatherByGeoLocation(location);
    dispatch(setNewLocation(cityData[0]));
    dispatch(setNewWeather(weather.data));
  }

  const dropIn = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "linear",
        duration: 1,
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.5,
      }
    },
  }

  useEffect(() => {
    if (cityNameUrl !== undefined & longitude !== undefined & latitude !== undefined) {
      setLocationByUrl();
    } else {
      getClientLocation();
    }
  }, [cityNameUrl, latitude, longitude])

  return (
    <div className={`${styles["forecast-main-container"]}`}>
      <div className={`${styles["city-name"]}`}>
        <h1 >
          {city.name}
        </h1>
        <h3>
          {city.country}
        </h3>
      </div>
      <div className={`${styles["forecast-body"]}`}>
        <Box>
          <Tabs
            variant='fullWidth'
            className={`${styles["forecast-period-option"]}`}
            value={value}
            onChange={handleChange}
            aria-label="tabs"
            TabIndicatorProps={{
              style: {
                background: "rgb(229, 179, 67)",
                height: "2px",
              }
            }}
          >
            <Tab sx={{ borderBottom: 1 }} className={`${styles["tab"]}`} value="now" label="Now" />
            <Tab sx={{ borderLeft: 1, borderBottom: 1 }} style={{ minWidth: 50 }} className={`${styles["tab"]}`} value="24-hours" label="24 h" />
            <Tab sx={{ borderLeft: 1, borderBottom: 1 }} style={{ minWidth: 50 }} className={`${styles["tab"]}`} value="6-days" label="6 Days" />
            <Tab sx={{ borderLeft: 1, borderBottom: 1 }} style={{ minWidth: 50 }} className={`${styles["tab"]}`} value="weekend" label="Weekend" />
          </Tabs>
        </Box>
        <div className={`${styles["forecast-container"]}`}>
          <AnimatePresence >
            {value === "now" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropIn}
              >
                <CurrentWeather {...{
                  currentWeather: weather.current_weather,
                  hourlyUnits: weather.hourly_units
                }} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence >
            {value === "24-hours" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropIn}
              >
                <HourlyWeather />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence >
            {value === "6-days" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropIn}
              >
                <DailyWeather {...{ type: "week" }} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {value === "weekend" && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropIn}
              >
                <DailyWeather {...{ type: "weekend" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div >
  );
}

export default Forecast;