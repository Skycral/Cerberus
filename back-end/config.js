const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  tickermaster: process.env.TICKETMASTER_API_KEY,
};