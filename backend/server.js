const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require("mongoose")

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello it is working'
    });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});

mongoose.connect('mongodb+srv://user1:RsvpZHgDAJVHmIV5@cluster0.2wy7q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Success, Connected to MONGODB')
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDb Atlas');
        console.error(error)
    }
);