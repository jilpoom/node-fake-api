var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { sequelize } = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user/');
var boardsRouter = require('./routes/board/');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mariadb connect
sequelize.sync({ alter: false }) // true로 변경하지 말 것.
    .then(() => {
        console.log("MARIADB CONNECTED")
    })
    .catch((err) => {
        console.error("MARIADB CONNECT FAIL >>>", err);
    })


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 등록
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/boards', boardsRouter);
// TODO: comment, boardfile Router 제작.


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const mongoConnect = require('./middlewares/mongo-con')
mongoConnect();


module.exports = app;
