import React, { useState, useEffect } from 'react';
import './index.css';

const SalesStatistics = () => {
  const [monthlyStatistics, setMonthlyStatistics] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis-roxiers.onrender.com/api/statistics');
        const data = await response.json();
        setMonthlyStatistics(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value, 10);
    setSelectedMonth(selectedMonth);
  };

  const getStatisticsForSelectedMonth = () => {
    return monthlyStatistics[selectedMonth] || {};
  };

  return (
    <div className='container'>
      <h1 className='s-h1'>Transctions Statistics </h1>

    <div className="sales-statistics-container">
      <label>Statistics:</label>
      <select value={selectedMonth} onChange={handleMonthChange}>
        {monthNames.map((month, index) => (
          <option key={index + 1} value={index + 1}>
            {month}
          </option>
        ))}
      </select>

      <div className="statistics-for-selected-month">
        <h2>Statistics for Selected Month:</h2>
        <p>Total Sale Amount: {getStatisticsForSelectedMonth().totalSaleAmount || 0}</p>
        <p>Total Sold Items: {getStatisticsForSelectedMonth().totalSoldItems || 0}</p>
        <p>Total Not Sold Items: {getStatisticsForSelectedMonth().totalNotSoldItems || 0}</p>
      </div>
    </div>
    </div>
  );
};

export default SalesStatistics;
