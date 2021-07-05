require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");

const app = express()

// include router
const mainRoute = require('./router')
app.use(mainRoute)

// listening on port 8000
app.listen(process.env.PORT)