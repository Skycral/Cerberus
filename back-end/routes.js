const routes = require("express").Router();
const axios = require("axios");
const { ticketmaster, googleKey } = require("./config");
const db = require("./database");


routes.get("/", async (req, res) => {
  try {
    if (req.query.city) {
      const cities = await db.searchCity(req.query.city);
      res.send(cities);
    } else {
      const cities = await db.getCities();
      res.send(cities);
    }
  } catch (error) {
    res.status(500).json({status: "nok"});
  }
});

routes.get("/categories", async (req, res) => {
  try {
    const cats = await db.getCategories();
    res.send(cats);
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "nok"});
  }
});


routes.get("/events/:start/:end/:city/:country/:page?", async (req, res) => {
  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketmaster}&locale=*&startDateTime=${req.params.start}&endDateTime=${req.params.end}&sort=date,asc&city=${req.params.city}&countryCode=${req.params.country}&size=10&page=${req.params.page}`;
    const headers = {headers: {accept: 'application/json', 'content-type': 'application/json', "User-Agent": "Axios 0.21.1"}};
    const result = await axios.get(url, headers);
    res.json(result.data);
    
  } catch (error) {
    console.log(error);
  }
});

routes.get("/city/:city", async (req, res) => {
  try {
      const url = `https://sv.wikipedia.org/api/rest_v1/page/summary/${req.params.city}`;
      const newUrl = encodeURI(url);
      const headers = {headers: {accept: 'application/json', 'content-type': 'application/json', "User-Agent": "Axios 0.21.1"}};
      const result = await axios.get(newUrl, headers);
      res.json(result.data);
  } catch (error) {
    console.log('Det blir fel');
  }
});



routes.get("/places/:what/:city", async (req, res) => {
  try {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.what}%20in%20${req.params.city}&key=${googleKey}`
  const config = {
    method: 'get',
    url: encodeURI(url),
    headers: { }
  };
  const result = await axios(config);
  console.log(result.data.results[0].photos[0]['photo_reference'])
  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.data.results[0].photos[0]['photo_reference']}&key=${googleKey}`
  const imageConfig = {
    method: 'get',
    url: imageUrl,
    header: { }
  }
  const imageResult = await axios(imageConfig);
  res.json({resultat: result.data, foto: imageResult.request._redirectable._options.href});
  // res.json(result.data);
  } catch (error) {
  console.log(error);
  };
});

routes.get("/weather/:start/:end/:city", async (req, res) => {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?aggregateHours=24&combinationMethod=aggregate&startDateTime=${req.params.start}&endDateTime=${req.params.end}&maxStations=-1&maxDistance=-1&contentType=json&unitGroup=metric&locationMode=array&key=${weatherKey}&dataElements=default&locations=${req.params.city}`;
    const headers = {headers: {accept: 'application/json', 'content-type': 'application/json', "User-Agent": "Axios 0.21.1"}};
    const result = await axios.get(url, headers);
    res.json(result.data);
    
  } catch (error) {
    console.log(error);
  }
});

routes.get("/activities/:activity", async (req, res) => {
  try {
    console.log(req.params.activity)
    const acts = await db.getActivites(req.params.activity);
    if (acts) {
      res.send(acts);
    } else {
      res.status(404).send({status: "nok", msg: `This activity could not be found.`});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "nok"});
  }
});


module.exports = routes;