const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const routes = require("./routes");
const app = express();


app.set("port", process.env.PORT || 8888);


app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
