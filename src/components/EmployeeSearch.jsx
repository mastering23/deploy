
import React, { useState } from 'react';

const EmployeeSearch = () => {
  const [employeeId, setEmployeeId] = useState(''); // Store the employee ID
  const [employee, setEmployee] = useState(null);   // Store the employee data
  const [error, setError] = useState(null);         // Store any errors
  const [isEditing, setIsEditing] = useState(false); // State to check if editing mode is on
  const [editedEmployee, setEditedEmployee] = useState({ name: '', email: '' }); // Store edited data


  const handleSearch = async () => {
    const response = await fetch(`/employees/${employeeId}`);

    if (response.ok) {
      const data = await response.json();
      setEmployee(data);
      setEditedEmployee({ name: data.name, email: data.email })
      setError(null);
    } else {
      setError("Employee not found");
      setEmployee(null); 
    }
  };

  
  const handleEdit = () => {
    setIsEditing(true);
  };

  
  const handleSave = async () => {
    console.log("Trying to save employee:", employeeId);
    console.log(employeeId);

    const response = await fetch(`/employees/${employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedEmployee), 
    });

    if (response.ok) {
      const updatedEmployee = await response.json();
      setEmployee(updatedEmployee); 
      setIsEditing(false); 
      setError(null); 
    } else {
      setError("Failed to update employee");
    }
  };

  return (
    <div>
      <h2>Search Employee by ID</h2>
      <input
        type="number"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)} 
        placeholder="Enter Employee ID"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display errors if there are any */}
      {error && <p>{error}</p>}

      {/* Display employee data if found */}
      {employee && (
        <div>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedEmployee.name}
                onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })}
              />
              <input
                type="email"
                value={editedEmployee.email}
                onChange={(e) => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p>Name: {employee.name}</p>
              <p>Email: {employee.email}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
