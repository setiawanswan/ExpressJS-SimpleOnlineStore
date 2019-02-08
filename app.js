let logger = require('morgan');
let indexRouter = require('./routes/index');
let authRouter = require('./routes/auth');
// let profile = require('./routes/profile')

let cors = require('cors')
//Jwt
let passport = require('passport')

let express = require('express');
let path = require('path');

// let bodyParser = require('body-parser');

let app = express();
app.use(cors())

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/auth', authRouter);
// app.use('/profile', profile)

let server = app.listen(process.env.PORT || 3000, function () {
    console.log("app running on port.", server.address().port);
});

module.exports = app;


// var cookieParser = require('cookie-parser');
// app.use(cookieParser());