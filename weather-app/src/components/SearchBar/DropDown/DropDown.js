import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const initialCity = {
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
};

const DropDown = ({ searchType }) => {
  const [locked, setLocked] = useState(0);
  const [searchResult, setSearchResult] = useState(initialCity);
  const [searchValue, setSearchValue] = useState("Sofia");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
    setOptions([])
    if (locked) {
      clearTimeout(locked);
    }
    setLocked(setTimeout(() => {
      if (event.target.value !== "" && event.target.value.length > 3) {
        searchForTown(event.target.value);
      }
    }, 1000));
  };

  const searchForTown = (town) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${town}`);
        res.data.results !== undefined ? setOptions(res.data.results) : setOptions([]);
      } catch (error) {
        console.log("Error on town search call: " + error)
      } finally {
        setLoading(false);
      }
    }, 1000)
  }

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult])

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onChange={(e, v) => setSearchResult(v)}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
            alt={option.country_code}
          />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={handleInputChange}
          label="Your city..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default DropDown;