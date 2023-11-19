# GeoWeather-Hub

# NOTES DURING DEVELOPMENT
- Download sqlite3 from offical website
- Save the folder to appropriate location
- locate sqlite3.exe
- Create new environmental variable under Path pointing at the 
- cd into geoweather-frontend and run npn start in the terminal
- In geoweather-hub run node .\server\app.js in the terminal
directory holding sqlite3.exe


# EXAMPLES OF URLS:

For two word cities:
- %20 as <SPACE> Delimiter
- http://localhost:5000/api/weather/forecast?city=san%20fransisco
- http://localhost:5000/api/weather/forecast?city=los%20angeles
- http://localhost:3000/