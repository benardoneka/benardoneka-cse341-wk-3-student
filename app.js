const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport")
const { engine } = require('express-handlebars');
const morgan = require("morgan")

 
const session = require("express-session"); 

const mongodb = require("./db/connect");
// const professionalRoutes = require("./routes/employee");
require("./passport")(passport)

const port = process.env.PORT || 8080;
const app = express();


app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  //sessions
  .use(session({ 		//Usuage
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

  }))
  //Passport middleware
  .use(passport.initialize())
  .use(passport.session())


 

  .engine('.hbs', engine({ extname: '.hbs', defaultLayout: "main"}))
  .set('view engine', '.hbs')
  .set("views", "./views")
   //Using my static files in public directory
  .use(express.static(path.join(__dirname, "public")))
  
  .use("/", require("./routes/swagger"))
  .use("/", require("./routes/employee"))
  .use("/", require("./routes/index"))
  .use("/auth", require("./routes/auth"))
  

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  mongodb.initDb((err, mongodb) => {
  if (err) { 
    console.log(err);
  } else {
    app.listen(
      port
    );
    console.log(`Connected to Database and listening on ${port}`);
  }


});
