const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes");
const { port } = require('./config');

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is now listening on port: ${port}`);
});

