const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('./auth/passport'); 
const apiRoutes = require('./routes/apiRoutes'); 
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./config/db'); // Require the database connection
require('./scripts/schema'); // Require the schema for initializing tables

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: '12345', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Simple test query
db.get("SELECT * FROM users LIMIT 1", (err, row) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Successful connection');
    }
});

// Use the API routes
app.use('/api', apiRoutes);

// Middleware to check if a user is authenticated
app.use((req, res, next) => {
  // Allow access to the registration endpoint without authentication
  if (req.path === '/api/register') {
    return next();
  }

  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to GeoWeather Hub API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the server at: http://localhost:5000/api/weather/forecast`)
});