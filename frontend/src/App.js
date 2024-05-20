import React, { useState } from 'react';
import axios from 'axios';
import './UrlShortener.css';

const App = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            const apiUrl = 'https://urlshortener-dpwx.onrender.com/api/shorten';
            const response = await axios.post(proxyUrl + apiUrl, {
                originalUrl,
                customAlias,
                expirationDate
            });
            setShortUrl(response.data.shortUrl);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="url-shortener">
            <h2>URL Shortener</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Enter long URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Custom Alias"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Expiration Date"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Shortening...' : 'Shorten'}
                </button>
            </form>
            {shortUrl && (
                <div className="short-url">
                    <p>Short URL:</p>
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default App;
