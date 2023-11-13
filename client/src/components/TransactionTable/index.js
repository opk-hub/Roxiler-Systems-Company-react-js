import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const TransactionList = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('3'); // Default to March
  const [searchText, setSearchText] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apis-roxiers.onrender.com/api/monthlyData`
        );
        console.log(response.data)
        setData(response.data);
        setSearchText(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


//   const getMonth =()=>{
//     console.log(data)
//   }

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;


  const Filter = (e) => {
    const searchText = e.target.value.toLowerCase();
  
    setSearchText(
      data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchText) ||
          item.description.toLowerCase().includes(searchText) ||
          item.price.toString().includes(searchText) ||
          item.category.toLowerCase().includes(searchText)           )
    );
  };

  const filterByMonth = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);

    setSearchText(
      data.filter((item) => new Date(item.dateOfSale).getMonth() + 1 === Number(month))
    );
  };
  

  return (
    <div className='tab-container' >
      <h2>Transaction List</h2>

      <div className='t-container'>
      <div >
        <input
          type="text"
          placeholder="Search Transctions"
          className='search'
         
          onChange={Filter}
        />
      </div>
      <div className='month'>
        <div className='search'>
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={filterByMonth}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString('en', { month: 'short' })}
            </option>
          ))}
        </select>
        </div>
        </div>
      </div>

      
     <div className='table'>
      <table >
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>category</th>
            <th>image</th>
            <th>month</th>
            <th>dateOfSale</th>
            <th>Sold</th>
          </tr>
        </thead>

        <tbody className='t-body'>
          {searchText.slice(startIndex, endIndex).map((item) => (
            <tr key={item.id}>
              <td >{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ maxWidth: '50px', maxHeight: '50px' }}
                  />
                </td>
              <td>{new Date(item.dateOfSale).getMonth() + 1}</td>
              <td>{item.dateOfSale}</td>
              <td>{item.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className='footer'>
        <p>Page No:{page}</p>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
          <p>Per-Page:10</p>
      </div>
    </div>
  );
};

export default TransactionList;