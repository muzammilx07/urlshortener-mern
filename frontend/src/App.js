// src/App.js
import React, { useState } from 'react';


function App() {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customAlias: '',
    expirationDate: ''
  });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/create-alias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create Alias</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Original URL:
          <input type="text" name="originalUrl" value={formData.originalUrl} onChange={handleChange} />
        </label>
        <br />
        <label>
          Custom Alias:
          <input type="text" name="customAlias" value={formData.customAlias} onChange={handleChange} />
        </label>
        <br />
        <label>
          Expiration Date:
          <input type="text" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Alias</button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
