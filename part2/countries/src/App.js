import React, { useState, useEffect } from 'react';
import axios from 'axios'
import SearchInput from './components/SearchInput.js'
import CountryDetails from './components/CountryDetails.js'
require('dotenv').config()

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  
    useEffect(() => {
    if (newSearch !== '') {
      setWeather([])
      axios
        .get(`https://restcountries.eu/rest/v2/all`)
        .then(res => filterCountries(res.data, newSearch))
        //.then(data => (data.length <= 11) ? setCountries(data) : setCountries([]))
        .then(data => {
          setCountries(data)
          return data;
        })
        .then(countries => {
          if(countries.length === 1){
            axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countries[0].capital}`) 
            .then(res => {
              setWeather(w => w.concat(res.data))
            })
          }  
        })
    }
  }, [newSearch])

  const filterCountries = (countiresData, newSearch) => {
    return countiresData.filter((country) =>
      country.name.toLowerCase().startsWith(newSearch))
  }
  
  const handleSearchChange = (findCountry) => {
    console.log(newSearch)
    setNewSearch(findCountry)
  }

  //console.log('counties after effect', countries);
  //console.log('counties after effect-weather', weather);
  return (
    <div id="app">
      <SearchInput
        countries={countries}
        handleSearchChange={handleSearchChange}
      />
      <CountryDetails
        countries={countries}
        handleSearchChange={handleSearchChange}
        setNewSearch={setNewSearch}
        weather={weather}
      />
    </div>
  );
}
export default App;

