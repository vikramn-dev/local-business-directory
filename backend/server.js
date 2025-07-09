const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load sample data
const sampleData = JSON.parse(fs.readFileSync('./sample-data.json', 'utf8'));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Business Directory API is running!' });
});

app.get('/api/businesses', (req, res) => {
  res.json(sampleData.businesses);
});

app.get('/api/categories', (req, res) => {
  res.json(sampleData.categories);
});

app.get('/api/businesses/:id', (req, res) => {
  const business = sampleData.businesses.find(b => b.id === parseInt(req.params.id));
  if (!business) {
	  return res.status(404).json({ error: 'Business not found' });
  }
  res.json(business);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
