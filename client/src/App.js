import React, { Component } from 'react';
import PieChartComponent from './components/PieChartComponent';
import TransactionsBarChart from './components/BarChart';
import './App.css';
import TransactionTable from './components/TransactionTable';
import SalesStatistics from './components/SalesStatistics';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        
        <div className="task-section">
        <h1>Task-1 <br /> Monthly Transaction List</h1>
          <TransactionTable  />
        </div>
        
        <div className="task-section">
        <h1>Task-2</h1>
          <SalesStatistics />
        </div>
        
        <div className="task-section">
        <h1>Task-3 <br /> Monthly Price Ranges</h1>
          <TransactionsBarChart />
        </div>
        
        <div className="task-section">
        <h1>Task-4 <br /> Monthly Price Ranges</h1>
          <PieChartComponent />
        </div>
      </div>
    );
  }
}

export default App;
