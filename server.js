const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const path = require('path')
const db = require('./config/db')
const app = express()

const port = process.env.POST || 3030
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

require('./app/routes')(app)
app.listen(port, () => {
  console.log('running on ', port)
})

// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err)
//   require('./app/routes')(app, database)
//   app.listen(port, () => {
//     console.log('running on ' + port)
//   })
// })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
