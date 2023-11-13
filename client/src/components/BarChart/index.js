import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './index.css'
const TransactionsBarChart = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const barColor = "#4CAF50"; 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis-roxiers.onrender.com/api/price-ranges');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const renderTableAndChart = (monthIndex) => {
    const monthlyData = data[monthIndex];
    if (!monthlyData) {
      return null;
    }

    const chartData = Object.entries(monthlyData).map(([range, count]) => ({
      range,
      count,
    }));

    return (
      <div className='b-container' key={monthIndex} style={{ display: selectedMonth === monthIndex + 1 ? 'block' : 'none' }}>
        <h3>{`Displayed  ${monthNames[monthIndex]} Data`}</h3>

        {/* Bar Chart */}
        <BarChart width={1000} height={500} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="range"
            tick={(props) => {
              const { x, y, payload } = props;
              const range = payload.value;
              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(-45)"
                  >
                    {range}
                  </text>
                </g>
              );
            }}
          />
          <YAxis interval={1} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={barColor} />
        </BarChart>
      </div>
    );
  };

  return (
    <div className='bar-container'>
      <h2>Monthly Price Ranges</h2>
    <div>
      <label>Select Month: </label>
      <select className='bar-input' value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>{`${monthNames[i]}`}</option>
        ))}
      </select>
      </div>

      {Array.from({ length: 12 }, (_, i) => renderTableAndChart(i))}
    </div>
  );
};

export default TransactionsBarChart;
