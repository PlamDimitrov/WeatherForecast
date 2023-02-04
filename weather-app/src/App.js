import React, { useEffect } from 'react';
import { motion, useAnimationControls } from "framer-motion";

import SearchBar from './components/SearchBar/SearchBar';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';

import Forecast from './components/Forecast/Forecast';

function App() {
  const controls = useAnimationControls()

  const animation = {
    motion: {
      backgroundPositionX: "10000px",
      transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 500,
      }
    }
  }

  return (
    <motion.div
      animate="motion"
      variants={animation}
      className={styles["App"]} >
      <SearchBar />
      <Routes>
        <Route path='/' element={<Forecast />} />
        <Route path='/:cityNameUrl/:longitude/:latitude' key={window.location.pathname} element={<Forecast />} />
      </Routes>
    </motion.div >
  );
}

export default App;
