const express = require("express");
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

app.use('', postRoutes);
app.use('', userRoutes);
module.exports = app;