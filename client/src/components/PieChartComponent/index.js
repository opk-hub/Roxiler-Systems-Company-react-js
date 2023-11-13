import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import './index.css'
const PieChartComponent = () => {
  const [data, setData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apis-roxiers.onrender.com/api/piechart'); // replace with your actual API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const categoryColors = {
    electronics: '#0088FE',
    womenClothing: '#00C49F',
    menClothing: '#FFBB28',
    jewelry: '#FF8042',
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className='pie-container'>
      {data ? (
        <div>
        <div className='pie-search-card'>
          <label htmlFor="monthDropdown">Select Month:</label>
          <select
            id="monthDropdown"
            value={selectedMonth}
            onChange={handleMonthChange}
            className='pie-search'
          >
            {monthNames.map((month, index) => (
              <option key={index + 1} value={index + 1}>{`${month}`}</option>
            ))}
          </select>
          </div>
          

          <div className='pie-card'>
            <h2 className='pie-selecting-des'>{"Displayed "}<span className='highlighted-month'>{`${monthNames[selectedMonth - 1]}`}</span>{' Data'}</h2>
            <PieChart width={500} height={500}>
              <Legend />
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={Object.entries(data[selectedMonth]).map(([category, count]) => ({
                  name: category,
                  value: count,
                  color: categoryColors[category] || '#8884d8', 
                }))}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {Object.entries(data[selectedMonth]).map(([category]) => (
                  <Cell key={category} fill={categoryColors[category] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      ) : (
        <p>Loading... data from server</p>
      )}
    </div>
  );
};

export default PieChartComponent;
