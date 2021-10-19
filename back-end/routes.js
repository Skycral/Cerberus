const routes = require("express").Router();
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

routes.get("/:activity", async (req, res) => {
  try {
    console.log(req.params.activity)
    const acts = await db.getActivites(req.params.activity);
    console.log('hej', acts)
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