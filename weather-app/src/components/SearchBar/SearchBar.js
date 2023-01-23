import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchBar.module.css';
import DropDown from './DropDown/DropDown';

const SearchBar = () => {

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        padding: "10px 0 10px 0",
        minWidth: "300px",
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <DropDown />
      <SearchIcon sx={{ p: '10px' }} aria-label="search" />
    </Paper >
  );
}

export default SearchBar;