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
    const weatherData = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m`);
    return weatherData;
}

const api = {
    getCityNameByGeoLocation,
    getCityDataByName,
    getWeatherByGeoLocation
}

export default api;