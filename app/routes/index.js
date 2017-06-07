const sortRoutes = require('./sorting')
const agrgRoutes = require('./aggregation')

module.exports = (app, db) => {
  app.get('/', (req, res) => {
    res.render('index', {title: 'JSON Parser'})
  })
  sortRoutes(app, db)
}
