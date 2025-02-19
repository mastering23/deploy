import React from 'react';
import AddEmployee from '../src/components/AddEmployee';
import EmployeeSearch from './components/EmployeeSearch';
import './index.css'

function App() {
  return (
    <div>
      <h1>Employee Management System</h1>
     <EmployeeSearch />
      <AddEmployee />
    </div>
  );
}

export default App;
