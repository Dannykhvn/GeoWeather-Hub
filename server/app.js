const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes'); // Import your API routes
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Use the API routes
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to GeoWeather Hub API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});