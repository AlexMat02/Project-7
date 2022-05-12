const express = require("express");
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const path = require("path");

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('', postRoutes);
app.use('', userRoutes);
module.exports = app;