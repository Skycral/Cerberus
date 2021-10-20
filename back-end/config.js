const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  ticketmaster: process.env.TICKETMASTER_API_KEY,
  weatherKey: process.env.WEATHER_API_KEY,
};