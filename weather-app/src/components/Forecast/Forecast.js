import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectedCityWeather, selectedCity, setNewWeather, setNewLocation } from '../../store/citySlice';
import { useParams } from "react-router-dom";
import api from "../../api";

import styles from './Forecast.module.css';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import CurrentWeather from './CurrentWeather/CurrentWeather';

const Forecast = () => {
  const { cityNameUrl, longitude, latitude } = useParams();
  const dispatch = useDispatch()
  const city = useSelector(selectedCity);
  const weather = useSelector(selectedCityWeather);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState("24-hours");

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
        <Box sx={{ width: '100%' }}>
          <Tabs
            className={`${styles["forecast-period-option"]}`}
            value={value}
            onChange={handleChange}
            aria-label="tabs"
            TabIndicatorProps={{
              style: {
                background: "rgb(218, 237, 14)",
                height: "4px",
              }
            }}
            variant='fullWidth'

          >
            <Tab sx={{ width: "33.3%" }} className={`${styles["tab"]}`} value="24-hours" label="24 h" />
            <Tab sx={{ width: "33.3%" }} className={`${styles["tab"]}`} value="10-days" label="10 Days" />
            <Tab sx={{ width: "33.3%" }} className={`${styles["tab"]}`} value="weekend" label="Weekend" />
          </Tabs>
        </Box>
        <div className={`${styles["forecast-container"]}`}>

          {value === "24-hours" ? <CurrentWeather {...{ currentWeather: weather.current_weather, hourlyUnits: weather.hourly_units }} /> : ""}
          {value === "10-days" ? JSON.stringify(weather) : ""}
          {value === "weekend" ? "3" : ""}
        </div>
      </div>
    </div >
  );
}

export default Forecast;