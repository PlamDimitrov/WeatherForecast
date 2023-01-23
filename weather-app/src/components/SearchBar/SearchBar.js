import React, { useState } from 'react';

import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchBar.module.css';
import DropDown from './DropDown/DropDown';

const SearchBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <Paper
      className={styles["header-container"]}
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: "10px 0 10px 0",
        minWidth: "300px",
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <DropDown {...{ visible, setVisible }} />
      <IconButton sx={{ p: '5px' }}
        onClick={() => setVisible(value => !value)}
      >
        <SearchIcon sx={{ p: '5px' }} aria-label="search" />
      </IconButton>
    </Paper >
  );
}

export default SearchBar;