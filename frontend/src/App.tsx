import React, { useState, useEffect } from 'react';
import './App.css';

interface Business {
  id: number;
  name: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  rating: number;
  description: string;
}

function App() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API URL - this will be important for Docker networking later
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    fetch(`${apiUrl}/api/businesses`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }
        return response.json();
      })
      .then(data => {
        setBusinesses(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading businesses...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Local Business Directory</h1>
        <p>Find local businesses in your area</p>
      </header>
      
      <main className="business-grid">
        {businesses.map(business => (
          <div key={business.id} className="business-card">
            <h3>{business.name}</h3>
            <p className="category">{business.category}</p>
            <p className="address">{business.address}</p>
            <p className="contact">
              📞 {business.phone} | ✉️ {business.email}
            </p>
            <p className="rating">⭐ {business.rating}/5</p>
            <p className="description">{business.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
