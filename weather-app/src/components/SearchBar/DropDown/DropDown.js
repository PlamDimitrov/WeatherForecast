import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../../api';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import styles from './DropDown.module.css';

const DropDown = () => {
  let navigate = useNavigate();
  const [locked, setLocked] = useState(0);
  const [searchValue, setSearchValue] = useState("Sofia");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setOptions([])
    if (locked) {
      clearTimeout(locked);
    }
    setLocked(setTimeout(() => {
      if (searchValue !== "" && searchValue.length > 3) {
        searchForTown(searchValue);
      }
    }, 1000));
    setSearchValue(event.target.value)
  };

  const searchForTown = (town) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const searctResultResponse = await api.getCityDataByName(searchValue);
        searctResultResponse !== null ? setOptions(searctResultResponse) : setOptions([]);
        setLoading(false);
      } catch (error) {
        console.log(`Error on town search: ${error}`);
      }
    }, 1000);
  }

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        const searctResultResponse = await api.getCityDataByName(e.target.value);
        if (searctResultResponse) {
          await setOptions(searctResultResponse);
          setOpen(false);
          redirect(searctResultResponse[0].name, searctResultResponse[0].longitude, searctResultResponse[0].latitude);
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.log(`Error on town search: ${error}`);
      }
    }
  }

  const redirect = (cityName, longitude, latitude) => {
    let path = `/${cityName}/${longitude}/${latitude}`;
    navigate(path);
  }

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onKeyDown={e => {
        handleKeyPress(e)
      }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id || true}
      getOptionLabel={(option) => option.name}
      options={options || []}
      loading={loading}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}
          key={option.id}
        >
          <div className={styles["option"]}
            onClick={e => {
              redirect(option.name, option.longitude, option.latitude);
            }}
          >
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
              alt={option.country_code}
            />
            {option.name}
          </div>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          className={styles["search-input"]}
          {...params}
          onChange={handleInputChange}
          label="Your city..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={15} /> : null}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default DropDown;