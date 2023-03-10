import React from 'react';
import { useSelector } from 'react-redux'
import { selectedCityWeather } from '../../../store/citySlice';
import { useIsDesktop } from "../../Hooks/useMediaQuery";

import styles from './DailyWeather.module.scss';
import RowForcast from '../../RowForcast/RowForcast';

import Tabs from '@mui/material/Tabs';

const DailyWeather = ({ type = "week" }) => {
  const weather = useSelector(selectedCityWeather);
  const isDesktop = useIsDesktop();

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < 7; i++) {
      const dayName = new Date(weather.daily.time[i]).toLocaleDateString('en-us', { weekday: "long" });
      if (type === "week") {
        rows.push(
          <RowForcast key={i} {...{
            title: dayName,
            forecast: weather,
            index: i,
            type: "days"
          }} />
        )
      } else if (type === "weekend") {
        if (dayName === "Friday" || dayName === "Saturday" || dayName === "Sunday") {
          rows.push(
            <RowForcast key={i} {...{
              title: dayName,
              forecast: weather,
              index: i,
              type: "days"
            }} />
          )
        }
      }
    }
    return rows;
  }

  return (
    <>
      <div className={styles["dayly-forecast"]}>
        <h1>{type === "week" ? "Next 6 Days" : "Weekend"}</h1>
      </div>
      {weather.hourly
        ? <Tabs
          variant="scrollable"
          orientation={isDesktop ? 'horizontal' : 'vertical'}
          scrollButtons="auto"
          value={0}
          sx={isDesktop
            ? {
              "& .MuiTabs-scroller": {
                "& .MuiTabs-flexContainer": {
                  alignItems: "baseline",
                  margin: "1em",
                }
              }
            }
            : {}
          }
          TabIndicatorProps={{
            style: {
              display: "none",
            }
          }}
        >
          {renderRows()}
        </Tabs>
        : null}
    </>
  );
}

export default DailyWeather;