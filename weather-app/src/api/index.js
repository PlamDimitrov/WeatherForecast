import axios from 'axios'

import routes from './apiRoutes'

const getCityNameByGeoLocation = async (location) => {
    const cityNameSearchResult = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`);
    return cityNameSearchResult.data.city;
}

const getCityDataByName = async (cityName) => {
    const cityDataSearchResult = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
    return cityDataSearchResult.data.results;
}

const getWeatherByGeoLocation = async (location) => {
    const hourly = `&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,weathercode,surface_pressure,windspeed_10m,winddirection_10m`;
    const current = `&current_weather=true&models=best_match`;
    const daily = '&daily=weathercode,precipitation_sum,shortwave_radiation_sum,windspeed_10m_max,winddirection_10m_dominant,temperature_2m_max,temperature_2m_min,sunrise,sunset';
    const weatherData = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}${hourly}${current}${daily}&timezone=Europe%2FMoscow`);
    return weatherData;
}

const api = {
    getCityNameByGeoLocation,
    getCityDataByName,
    getWeatherByGeoLocation
}

export default api;