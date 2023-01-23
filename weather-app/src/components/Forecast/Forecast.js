import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectedCityWeather, selectedCity, setNewWeather, setNewLocation } from '../../store/citySlice';
import { useParams } from "react-router-dom";
import api from "../../api";

import styles from './Forecast.module.css';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const Forecast = () => {
  const { cityNameUrl, longitude, latitude } = useParams();
  const dispatch = useDispatch()
  const city = useSelector(selectedCity);
  const weather = useSelector(selectedCityWeather);
  const [loading, setLoading] = useState(false);

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
        dispatch(setNewWeather(weather))
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

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup className={`${styles["forecast-period-option"]}`} variant="contained" aria-label="outlined primary button group">
            <Button>24 hours</Button>
            <Button>10 Days</Button>
            <Button>Weekend</Button>
          </ButtonGroup>
        </Box>

        <div className={`${styles["forecast-container"]}`}>
          {JSON.stringify(city)}
          {JSON.stringify(weather)}
        </div>
      </div>
    </div >
  );
}

export default Forecast;