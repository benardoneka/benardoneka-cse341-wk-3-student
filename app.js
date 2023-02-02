const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require('express-handlebars');


const mongodb = require("./db/connect");
const professionalRoutes = require("./routes/employee");

const port = process.env.PORT || 8080;
const app = express();

//Using the handlebars to set views
// app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: "main"}));
// app.set('view engine', '.hbs');
// app.set("views", "./views");

//Using my static files in public directory
// app.use(express.static(path.join(__dirname, "public")));
// app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .engine('.hbs', engine({ extname: '.hbs', defaultLayout: "main"}))
  .set('view engine', '.hbs')
  .set("views", "./views")
  .use("/", require("./routes/employee"))
  .use("/", require("./routes/index"))
  //Using my static files in public directory
  .use(express.static(path.join(__dirname, "public")));

  mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and listening on ${port}`);
  }
});
