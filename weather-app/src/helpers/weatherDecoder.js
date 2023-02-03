import imgClearSkyDay from '../img/weather-icons/clear-day.svg';
import imgMainlyClear from '../img/weather-icons/clear-day.svg';
import imgPartlyCloudy from '../img/weather-icons/cloudy.svg';
import imgOvercast from '../img/weather-icons/overcast.svg';
import imgFog from '../img/weather-icons/fog.svg';
import imgDepositingRimeFog from '../img/weather-icons/haze.svg';
import imgDrizzleLight from '../img/weather-icons/drizzle.svg';
import imgDrizzleDense from '../img/weather-icons/drizzle.svg';
import imgFreezingDrizzleLight from '../img/weather-icons/partly-cloudy-day-hail.svg';
import imgFreezingDrizzleDense from '../img/weather-icons/sleet.svg';
import imgRainSlight from '../img/weather-icons/rain.svg';
import imgRainModerate from '../img/weather-icons/rain.svg';
import imgRainHeavy from '../img/weather-icons/rain.svg';
import imgFreezingRainSlight from '../img/weather-icons/hail.svg';
import imgFreezingRainModerate from '../img/weather-icons/hail.svg';
import imgFreezingRainHeavy from '../img/weather-icons/hail.svg';
import imgSnowFallSlight from '../img/weather-icons/snow.svg';
import imgSnowFallModerate from '../img/weather-icons/snow.svg';
import imgSnowFallHeavy from '../img/weather-icons/snow.svg';
import imgSnowGrains from '../img/weather-icons/sleet.svg';
import imgRainShowersSlight from '../img/weather-icons/rain.svg';
import imgRainShowersModerate from '../img/weather-icons/rain.svg';
import imgRainShowersHeavy from '../img/weather-icons/rain.svg';
import imgSnowShowersSlight from '../img/weather-icons/snow.svg';
import imgSnowShowersHeavy from '../img/weather-icons/snow.svg';
import imgThunderstormSlight from '../img/weather-icons/thunderstorms.svg';
import imgThunderstormHeavy from '../img/weather-icons/thunderstorms.svg';
import imgNotAvailable from '../img/weather-icons/not-available.svg';

// Code	Description
// 0	Clear sky -
// 1, 2, 3	Mainly clear, partly cloudy, and overcast -
// 45, 48	Fog and depositing rime fog -
// 51, 53, 55	Drizzle: Light, moderate, and dense intensity -
// 56, 57	Freezing Drizzle: Light and dense intensity -
// 61, 63, 65	Rain: Slight, moderate and heavy intensity - 
// 66, 67	Freezing Rain: Light and heavy intensity - 
// 71, 73, 75	Snow fall: Slight, moderate, and heavy intensity - 
// 77	Snow grains - 
// 80, 81, 82	Rain showers: Slight, moderate, and violent - 
// 85, 86	Snow showers slight and heavy - 
// 95 *	Thunderstorm: Slight or moderate - 
// 96, 99 *	Thunderstorm with slight and heavy hail

const WeatherDecoder = (code) => {
  if (code != null) {
    switch (code) {
      case 0:
        return { img: imgClearSkyDay, description: "Clear sky" };
      case 1:
        return { img: imgMainlyClear, description: "Mainly clear" };
      case 2:
        return { img: imgPartlyCloudy, description: "Partly cloudy" };
      case 3:
        return { img: imgOvercast, description: "Overcast" };
      case 45:
        return { img: imgFog, description: "Fog" };
      case 48:
        return { img: imgDepositingRimeFog, description: "Depositing rime fog" };
      case 51:
        return { img: imgDrizzleLight, description: "Drizzle light" };
      case 53:
        return { img: imgDrizzleDense, description: "Drizzle moderate" };
      case 55:
        return { img: imgFreezingDrizzleLight, description: "Drizzle dense" };
      case 56:
        return { img: imgFreezingDrizzleDense, description: "Freezing drizzle light" };
      case 57:
        return { img: imgRainSlight, description: "Freezing drizzle dense" };
      case 61:
        return { img: imgRainModerate, description: "Rain light" };
      case 63:
        return { img: imgRainHeavy, description: "Rain moderate" };
      case 65:
        return { img: imgFreezingRainSlight, description: "Rain dense" };
      case 66:
        return { img: imgFreezingRainModerate, description: "Freezing rain light" };
      case 67:
        return { img: imgFreezingRainHeavy, description: "Freezing rain heavy" };
      case 71:
        return { img: imgSnowFallSlight, description: "Snow fall slight" };
      case 73:
        return { img: imgSnowFallModerate, description: "Snow fall moderate" };
      case 75:
        return { img: imgSnowFallHeavy, description: "Snow fall heavy" };
      case 77:
        return { img: imgSnowGrains, description: "Snow grains" };
      case 80:
        return { img: imgRainShowersSlight, description: "Rain showers slight" };
      case 81:
        return { img: imgRainShowersModerate, description: "Rain showers moderate" };
      case 82:
        return { img: imgRainShowersHeavy, description: "Rain showers heavy" };
      case 85:
        return { img: imgSnowShowersSlight, description: "Snow showers slight" };
      case 86:
        return { img: imgSnowShowersHeavy, description: "Snow showers heavy" };
      case 95:
        return { img: imgThunderstormSlight, description: "Thunderstorm" };
      case 96:
        return { img: imgThunderstormSlight, description: "Thunderstorm slight hail" };
      case 99:
        return { img: imgThunderstormHeavy, description: "Thunderstorm heavy hail" };

      default:
        console.log("Weather code missmatch! code: " + code);
        return { img: imgNotAvailable, description: "No data" };
    }
  } else {
    return { img: imgNotAvailable, description: "No data" };
  }
}

export default WeatherDecoder;