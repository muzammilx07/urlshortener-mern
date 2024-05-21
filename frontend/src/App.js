

import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    originalUrl: '',
    customAlias: '',
    expirationDate: ''
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

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
      const res = await fetch('https://urlshortener-dpwx.onrender.com/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      setResponse(null);
    }
  };

  const handleCopy = () => {
    const textField = document.createElement('textarea');
    textField.innerText = response.shortUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert('URL copied to clipboard!');
  };

  return (
    <div className="container">
      <h2>Create Alias</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="originalUrl">Original URL:</label>
          <input type="text" id="originalUrl" className="input-field" name="originalUrl" value={formData.originalUrl} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="customAlias">Custom Alias (optional):</label>
          <input type="text" id="customAlias" className="input-field" name="customAlias" value={formData.customAlias} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="datetime-local" id="expirationDate" className="input-field" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
        </div>
        <button type="submit" className="button">Create Alias</button>
      </form>
      {error && <div className="error">{error}</div>}
      {response && (
        <div className="response">
          <h3>Response:</h3>
          <p>Short URL: {response.shortUrl}</p>
          <button className="copy-button" onClick={handleCopy}>Copy URL</button>
        </div>
      )}
    </div>
  );
}

export default App;
