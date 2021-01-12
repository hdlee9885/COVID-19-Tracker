import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
        {
            type: "time",
            time: {
                format: "MM/DD/YY",
                tooltipFormat: "ll",
            },
        },
        ],
        yAxes: [
        {
            gridLines: {
                display: false,
            },
            ticks: {
                // Include a dollar sign in the ticks
                callback: function (value, index, values) {
                    return numeral(value).format("0a");
                },
            },
        },
        ],
    },
};

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(24, 211, 33)",
      half_op: "rgba(125, 215, 29, 0.5)",
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(128, 128, 128)",
      half_op: "rgba(128, 128, 128, 0.5)",
    },
};

const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date]
    }
    return chartData;
};

function LineGraph({ days, casesType = 'cases', ...props }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const chartData = buildChartData(data, casesType);
                setData(chartData);
                console.log(data)
            });
        };

        fetchData();
    }, [days, casesType]);

    
    return (
        <div className={props.className}>
          {data?.length > 0 && (
            <Line
              data={{
                datasets: [
                  {
                    backgroundColor: casesTypeColors[casesType].half_op,
                    borderColor: casesTypeColors[casesType].rgb,
                    data: data,
                  },
                ],
              }}
              options={options}
            />
          )}
        </div>
      );
}

export default LineGraph
