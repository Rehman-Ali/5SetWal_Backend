const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const server = require("http").createServer(app);

var session = require('express-session');

//Models
var models = require("./models"); 
var adminRoutes = require("./routes/adminRoutes"); 
// const User = models.user;
const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(session({ 
  cookie: { maxAge: 60000 },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))





// const { Client } = require('pg');
// var fs = require('fs');

// const client = new Client({
//   user: 'exvwlfwougjjmz',
//   host: 'ec2-52-86-25-51.compute-1.amazonaws.com',
//   database: 'df86hbsmu87ffl',
//   password: 'df51b2b24f8c16724115cf7bd78496db33dafc87e05aedf217113dcaa3b11481',
//   port: 5432,
 
// })
// client.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });
// app.use("/uploads", express.static("uploads"));

// Sync Database REMOVE FORCE TRUE to prevent overwrite of table
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine') 
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

global.__basedir = __dirname + "/";

app.use(express.static("./public"));





app.use(bodyParser.json({
  limit : '50mb'    ///////// LIMIT for JSON
}));
app.use(bodyParser.urlencoded({
  limit : '50mb', ///////// LIMIT for URL ENCODE (image data)
  extended : true
}));
app.use(express.json({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes/index"));
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT, console.log(`Server started on ${PORT}`));
