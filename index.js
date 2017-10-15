
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require("./routes");
const app = express();

const metadataCache = require('./cache/metadataCache');



app.set("port", process.env.PORT || 8888);


app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(routes);




metadataCache.loadCache().then(
  app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
  })
).catch(error => {console.log(error)})
