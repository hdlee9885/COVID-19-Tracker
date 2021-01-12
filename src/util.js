import React from 'react'
import { Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 300,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(24, 211, 33)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 400,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(128, 128, 128)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 900,
    },
  };

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}

export const prettyStat = (stat) => 
    stat ? `+${numeral(stat).format("0,0")}` : "+0";

export const showDataOnMap = (data, casesType="cases") => 
    data.map((country) => (
        <Circle 
            center={[country.countryInfo.lat, country.countryInfo.long]}
            pathOptions={{color: casesTypeColors[casesType].rgb,
                          fillColor: casesTypeColors[casesType].rgb }}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-wrapper">
                    <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="info-name">{country.country}</div>
                    <div className="info-cases">Total Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Total Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Total Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ));

