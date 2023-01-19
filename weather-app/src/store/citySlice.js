import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const citySlice = createSlice({
  name: 'city',
  initialState: {
    params: [{
      "admin1": "Sofia-grad",
      "admin1_id": 731061,
      "admin2": "Sofia",
      "admin2_id": 6458974,
      "country": "Bulgaria",
      "country_code": "BG",
      "country_id": 732800,
      "elevation": 562,
      "feature_code": "PPLC",
      "id": 727011,
      "latitude": 42.69751,
      "longitude": 23.32415,
      "name": "Sofia",
      "population": 1152556,
      "postcodes": ["1000"],
      "timezone": "Europe/Sofia"
    }],
    weather: {}
  },
  reducers: {
    setNewLocation: (state, action) => {
      state.params = action.payload;
    },
    setNewWeather: (state, action) => {
      state.weather = action.payload;
    },
  },
})

export const getCurrentLocationAutomaticAsync = () => async (dispatch) => {
  let cityName = "";
  let cityData = [];
  if ("geolocation" in navigator) {
    await navigator.geolocation.getCurrentPosition(async (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      try {
        const cityNameSearchResult = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`);
        cityName = cityNameSearchResult.data.city;
        const cityDataSearchResult = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
        cityData = [cityDataSearchResult.data.results[0]];
        dispatch(setNewLocation(cityData));
        dispatch(getNewWeatherAsync(location));
      } catch (error) {
        console.log(`Location call error: ${error}`);
      }
    });
  } else {
    console.log("Automatic location not available");
  }
}

export const getNewLocationAsync = (searchBy) => async (dispatch) => {
  let res = [];
  try {
    res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchBy}`);
    dispatch(setNewLocation(res.data.results));
  } catch (error) {
    console.log(`Location call error: ${error}`);
  }
}

export const getNewWeatherAsync = (city) => async (dispatch) => {
  let res = [];
  try {
    res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m`);
    dispatch(setNewWeather(res.data));
  } catch (error) {
    console.log(`Weather call error: ${error}`);
  }
}

export const { setNewLocation, setNewWeather } = citySlice.actions;
export const selectedCity = (state) => state.city.params
export const selectedCityWeather = (state) => state.city.weather

export default citySlice.reducer