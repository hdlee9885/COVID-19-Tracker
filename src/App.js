import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // runs a piece of code based on a given condition
    // inside here will run only once when the component loads and not again after
    // async -> send a request to the server, wait, and do something
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => {
        // map vs forEach
        // map will return something
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso3,
          }
        ));

        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app-dropdown">
          <Select variant="outlined" value="abc">
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input */}

      {/* Info Boxes x3 */}

      {/* Table */}

      {/* Map */}

      {/* Graph */}
    </div>
  );
}

export default App;
