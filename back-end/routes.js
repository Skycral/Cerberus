const routes = require("express").Router();
const axios = require("axios");
const { ticketmaster, googleKey } = require("./config");
const db = require("./database");

// DB CITY

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

// DB CATEGORY

routes.get("/categories", async (req, res) => {
  try {
    const cats = await db.getCategories();
    res.send(cats);
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "nok"});
  }
});

// TICKETMASTER API

routes.get("/events/:start/:end/:city/:country/:page?", async (req, res) => {
  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=${ticketmaster}&locale=*&startDateTime=${req.params.start}&endDateTime=${req.params.end}&sort=date,asc&city=${encodeURI(req.params.city)}&countryCode=${req.params.country}&size=10&page=${req.params.page}`;
    const headers = {
      headers: {accept: 'application/json', 'content-type': 'application/json', "User-Agent": "Axios 0.21.1"}
    };
    const result = await axios.get(url, headers);
    res.json(result.data);
    
  } catch (error) {
    console.log(error);
  }
});

// WIKIPEDIA API

routes.get("/city/:city", async (req, res) => {
  try {
      const url = `https://sv.wikipedia.org/api/rest_v1/page/summary/${req.params.city}`;
      const newUrl = encodeURI(url);
      const headers = {
        headers: {accept: 'application/json', 'content-type': 'application/json', "User-Agent": "Axios 0.21.1"}
      };
      const result = await axios.get(newUrl, headers);
      res.json(result.data);
  } catch (error) {
    console.log('Det blir fel');
  }
});

// GOOGLE GEOLOCATION AND PLACES

routes.get("/places/:what/:city", async (req, res) => {
  try {
  const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.params.city}&region=se&key=${googleKey}`
  const geoConfig = {
    method: 'get',
    url: encodeURI(geoUrl),
    headers: { }
  };
  const geoResult = await axios(geoConfig);

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${geoResult.data.results[0].geometry.location.lat}00%2C${geoResult.data.results[0].geometry.location.lng}00&radius=20000&query=${encodeURI(req.params.what)}&key=${googleKey}`
  const config = {
    method: 'get',
    url: url,
    headers: { }
  };

  const result = await axios(config);

  const detailsUrl1 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.data.results[0].place_id}&key=${googleKey}`
  const detailsConfig1 = {
    method: 'get',
    url: detailsUrl1,
    headers: { }
  };
  
  const detailsResult1 = await axios(detailsConfig1);

  const detailsUrl2 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.data.results[1].place_id}&key=${googleKey}`
  const detailsConfig2 = {
    method: 'get',
    url: detailsUrl2,
    headers: { }
  };
  
  const detailsResult2 = await axios(detailsConfig2);

  const detailsUrl3 = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${result.data.results[2].place_id}&key=${googleKey}`
  const detailsConfig3 = {
    method: 'get',
    url: detailsUrl3,
    headers: { }
  };
  
  const detailsResult3 = await axios(detailsConfig3);

  let imageResult1 = '';
  if(result.data.results[0].photos) {
  const imageUrl1 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.data.results[0].photos[0]['photo_reference']}&key=${googleKey}`
  const imageConfig1 = {
    method: 'get',
    url: imageUrl1,
    header: { }
  }
  const imageResult = await axios(imageConfig1);
  imageResult1 = imageResult.request._redirectable._options.href;
}

  let imageResult2 = '';
  if(result.data.results[1].photos) {
  const imageUrl2 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.data.results[1].photos[0]['photo_reference']}&key=${googleKey}`
  const imageConfig2 = {
    method: 'get',
    url: imageUrl2,
    header: { }
  }
  const imageResult = await axios(imageConfig2);
  imageResult2 = imageResult.request._redirectable._options.href;
}

let imageResult3 = '';
if(result.data.results[2].photos) {
  const imageUrl3 = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.data.results[2].photos[0]['photo_reference']}&key=${googleKey}`
  const imageConfig3 = {
    method: 'get',
    url: imageUrl3,
    header: { }
  }
  const imageResult = await axios(imageConfig3);
  imageResult3 = imageResult.request._redirectable._options.href;
}

  res.json({details: [detailsResult1.data, detailsResult2.data, detailsResult3.data], photos: [imageResult1, imageResult2, imageResult3]});

  } catch (error) {
  console.log(error);
  };
});

// WEATHER API 

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

// DB ACTIVITIES

routes.get("/activities/:category", async (req, res) => {
  try {
    console.log(req.params.category)
    const acts = await db.getActivities(req.params.category);
    if (acts) {
      res.send(acts);
    } else {
      res.status(404).send({status: "nok", msg: `No activities could be found.`});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "nok"});
  }
});

// DB FILTERING

routes.get("/result/:company/:category/:start/:end", async (req, res) => {
  try {
    let startYear = req.params.start.substring(0, 4);
    let endYear = req.params.end.substring(0, 4);
    let startMonth = req.params.start.substring(5, 7);
    let endMonth = req.params.end.substring(5, 7);
    console.log(startMonth, endMonth);
    
    if (endYear > startYear) {
      startYear = '1970';
      endYear = '1971';
    } else {
      startYear = '1970';
      endYear = '1970';
    }
    
    const newStart = startYear.concat(req.params.start.substring(4, 10));
    const newEnd = endYear.concat(req.params.end.substring(4, 10));
    const acts = await db.getResult(req.params.company, req.params.category, newStart, newEnd);

    if (acts) {
      res.send(acts);
    } else {
      res.status(404).send({status: "nok", msg: `No activities could be found.`});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "nok"});
  }
});

  
module.exports = routes;