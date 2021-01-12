import React, { useState, useEffect } from "react";
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import InfoBox from "./InfoBox";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import '../node_modules/leaflet/dist/leaflet.css'
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData } from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(res => res.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);

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

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      });
    };

    getCountriesData();
  }, []);

const onCountryChange = async (e) => {
  // grab the selected value from the dropdown
  const countryCode = e.target.value;

  const url =
    countryCode === "Worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
      console.log(mapCenter)
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      console.log(mapCenter)
      setMapZoom(4);
    });
};

  return (
    <div className="app">
      <div className="app-left">
        {/* Header */}
        {/* Title + Select input */}
        <div className="app-header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app-dropdown">
            <Select 
              variant="outlined" 
              value={country} 
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app-stats">
          {/* Info Boxes x3 */}
          <InfoBox 
            onClick={(e) => setCasesType("cases")} 
            title="Coronavirus cases" 
            isRed
            active={casesType === "cases"}
            total={countryInfo.cases} 
            cases={countryInfo.todayCases} 
          />
          <InfoBox 
            onClick={(e) => setCasesType("recovered")} 
            title="Recovered" 
            active={casesType === "recovered"}
            total={countryInfo.recovered} 
            cases={countryInfo.todayRecovered}
          />
          <InfoBox 
            onClick={(e) => setCasesType("deaths")}
            title="Deaths" 
            isRed
            active={casesType === "deaths"}
            total={countryInfo.deaths} 
            cases={countryInfo.todayDeaths}
          />
        </div>
        
        {/* Map */}
        <Map 
          countries={mapCountries}
          casesType={casesType} 
          center={mapCenter} 
          zoom={mapZoom} 
        />
        
      </div>

      <Card className="app-right">
        <CardContent>
          <div className="app-data">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType}/>
          </div>
        </CardContent>
          {/* Table */}
          {/* Graph */}
      </Card>
    </div>
  );
}

export default App;
