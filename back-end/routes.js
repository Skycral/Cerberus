const routes = require("express").Router();
const db = require("./database");


routes.get("/", async (req, res) => {
    try {
    //const XXX = await db.XXX();
    //res.send(XXX);
    } catch (error) {
      res.status(500).json({status: "nok"});
    }
  });