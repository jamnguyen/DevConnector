const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Config
const port = process.env.port || 3000;
const db = require('./config/keys').mongoURI;

// Parse body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
const userRoute = require('./routes/api/user');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/post');

app.get('/', (req, res) => {
  res.send('Hello from Jam!');
});

app.use('/api/user', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/post', postRoute);

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('Connected to MongoDB.');
  })
  .catch( (err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})