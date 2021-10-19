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

routes.get("/:params", async (req, res) => {
  try {
    const acts = await db.getActivites();
    res.send(acts);
  } catch (error) {
    console.log(error);
    res.status(500).json({status: "nok"});
  }
});

module.exports = routes;