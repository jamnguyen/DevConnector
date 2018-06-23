const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

// Config
const port = process.env.port || 5000;
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log('Connected to MongoDB.');
    // Authentication
    app.use(passport.initialize());
    // Config Passport
    require('./config/passport')(passport);
  })
  .catch( (err) => {
    console.log(err);
  });

// Parse body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes
const userRoute = require('./routes/api/user');
const profileRoute = require('./routes/api/profile');
const postRoute = require('./routes/api/post');

app.use('/api/user', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/post', postRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
})