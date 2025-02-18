import { useState } from 'react'
import React from 'react';
import AddEmployee from '../src/components/AddEmployee';
import './index.css'

function App() {
  return (
    <div>
      <h1>Employee Management System</h1>
      <AddEmployee />
    </div>
  );
}

export default App;
