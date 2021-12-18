const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

// using dotenv for specifying config.env file path
dotenv.config({path: 'config.env'})
// getting port value from config.env file or default port value is 8080
const PORT = process.env.PORT || 8080
// using morgan for log request in console
app.use(morgan('tiny'));
// mongo db connection
connectDB();
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))

// app listen on
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});