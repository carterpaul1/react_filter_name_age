import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const users = [
    { name: 'John', age: 25 },
    { name: 'Mary', age: 30 },
    { name: 'Jane', age: 20 },
    { name: 'Bob', age: 35 },
    { name: 'Matthew', age: 28 },
    { name: 'Beatrice', age: 34 },
  ];

  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filterCriteria, setFilterCriteria] = useState({ name: '', age: '' });
  const [sortCriteria, setSortCriteria] = useState(null);

  const handleFilter = (event) => {
    const { name, value } = event.target;
    const newFilterCriteria = { ...filterCriteria, [name]: value };
    setFilterCriteria(newFilterCriteria);

    const filtered = users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(newFilterCriteria.name.toLowerCase());
      const ageMatch = newFilterCriteria.age === '' || user.age === parseInt(newFilterCriteria.age, 10);
      return nameMatch && ageMatch;
    });
    setFilteredUsers(filtered);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (criteria === 'name') {
        return a.name.localeCompare(b.name);
      } else if (criteria === 'age') {
        return a.age - b.age;
      }
      return 0;
    });
    setFilteredUsers(sortedUsers);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        onChange={handleFilter}
        placeholder="Filter by name"
        value={filterCriteria.name}
      />
      <input
        type="number"
        name="age"
        onChange={handleFilter}
        placeholder="Filter by age"
        value={filterCriteria.age}
      />
      <button onClick={() => handleSort('name')}>Sort by Name</button>
      <button onClick={() => handleSort('age')}>Sort by Age</button>
      {filteredUsers.map(user => (
        <div key={user.name}>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

