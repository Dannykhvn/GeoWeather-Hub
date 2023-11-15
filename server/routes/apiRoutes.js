const express = require('express');
const router = express.Router();

// Use dynamic import for ES Module compatibility
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiKey = '8036d6c72b5b8cc742c4dddd1c065316';
// const cityId = '7626786'; 

// API endpoint to get weather forecast
router.get('/weather/forecast', async (req, res) => {
  try {
    const cityName = req.query.city;
    const days = req.query.days || 7; // default to a week

    const requestURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&cnt=${days}&appid=${apiKey}`;
    console.log('Request URL:', requestURL);

    const response = await fetch(requestURL);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching weather forecast data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
