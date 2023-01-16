import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getNewLocationAsync, selectedCity } from '../../../store/citySlice';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const DropDown = ({ searchType }) => {
  const city = useSelector(selectedCity);
  const dispatch = useDispatch()
  const [locked, setLocked] = useState(0);
  const [searchResult, setSearchResult] = useState(city);
  const [searchValue, setSearchValue] = useState("Sofia");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  };

  const searchForTown = (town) => {
    setLoading(true);
    setTimeout(async () => {
      dispatch(getNewLocationAsync(searchValue));
      searchResult.results !== undefined ? setOptions(searchResult.results) : setOptions([]);
      setLoading(false);
    }, 1000);
  }

  useEffect(() => {
    setOptions([])
    if (locked) {
      clearTimeout(locked);
    }
    setLocked(setTimeout(() => {
      if (searchValue !== "" && searchValue.length > 3) {
        searchForTown(searchValue);
      }
    }, 1000));
  }, [searchValue])

  useEffect(() => {
    setOptions(city);
  }, [city])

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
      isOptionEqualToValue={(option, value) => option.id === value.id || true}
      getOptionLabel={(option) => option.name}
      options={options || []}
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