
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressLogging = require('express-logging');
const logger = require('logops');
const compression = require('compression')
const cors = require('cors');
// const routes = require("./routes");
const metadataCache = require('./cache/metadataCache');
const config = require('./config/config').config;

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(expressLogging(logger));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serving the tiles
app.use('/img', express.static(path.join(__dirname, config.urlToDataFolder)));
// app.use(routes);




metadataCache.loadCache().then(
  app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
  })
).catch(error => {console.log(error)})
