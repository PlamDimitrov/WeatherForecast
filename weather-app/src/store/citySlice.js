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
    getNewLocation: (state, action) => {
      const searchBy = action.payload;
      let res = [];
      try {
        res = axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchBy}`);
        state.params = res.data.results || {};
      } catch (error) {
        console.log(`Location call error: ${error}`);
      }
    },
    getWeather: async (state, action) => {
      const latitude = action.payload.latitude;
      const longitude = action.payload.longitude;
      try {
        state.weather = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`);
      } catch (error) {
        console.log(`Weather call error: ${error}`);
      }
    }
  },
})

export const getNewLocationAsync = (searchBy) => async (dispatch) => {
  let res = [];
  try {
    res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchBy}`);
    dispatch(setNewLocation(res.data.results));
  } catch (error) {
    console.log(`Location call error: ${error}`);
  }
}

export const { getNewLocation, getWeather, setNewLocation } = citySlice.actions;
export const selectedCity = (state) => state.city.params

export default citySlice.reducer