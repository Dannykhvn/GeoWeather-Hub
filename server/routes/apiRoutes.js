const express = require('express');
const router = express.Router();
const passport = require('../auth/passport'); 
const User = require('../models/user'); 
const bcrypt = require('bcrypt');

// Registration
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email, username});
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    // Create a new user
    await User.save({ email, username, password });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration failed:', error.message);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return next(err);
    }
    if (!user) {
      console.error('User not found:', info.message);
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return next(err);
      }
      console.log('User logged in:', user);
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res, next);
});

// Use dynamic import for ES Module compatibility
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const apiKey = '8036d6c72b5b8cc742c4dddd1c065316';
// const cityId = '7626786'; 

// API endpoint to get weather forecast
router.get('/weather/forecast', async (req, res) => {
  try {
    const cityName = req.query.city;
    const days = req.query.days || 1; 

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
