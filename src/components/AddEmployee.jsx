import React, { useState } from 'react';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Employee ${data.name} added successfully with ID ${data.id}!`);
        setEmployee({ name: '', email: '' });
      } else {
        setResponseMessage('Failed to add employee. Please check the input data.');
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add a New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Name : '
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email : '
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default AddEmployee;
