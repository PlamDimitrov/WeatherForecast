import * as React from 'react';

import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';

import Forecast from './components/Forecast/Forecast';

function App() {

  return (
    <div className={styles["App"]}>
      <SearchBar />
      <Routes>
        <Route path='/' element={<Forecast />} />
        <Route path='/:cityNameUrl/:longitude/:latitude' key={window.location.pathname} element={<Forecast />} />
      </Routes>
    </div>
  );
}

export default App;
