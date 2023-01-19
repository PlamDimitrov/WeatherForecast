import * as React from 'react';
import { useSelector } from 'react-redux'

import './App.css';
import SearchBar from './components/SearchBar/SearchBar';

import { selectedCityWeather } from './store/citySlice';

function App() {
  const city = useSelector(selectedCityWeather);

  return (
    <div className="App">
      <SearchBar />
      {JSON.stringify(city)}
    </div>
  );
}

export default App;
