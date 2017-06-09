const sortRoutes = require('./sorting')
const agrgRoutes = require('./aggregation')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', {title: 'Home'})
  })
  app.get('/sorting', (req, res) => {
    res.render('sorting', {title: 'Sorting'})
  })
  app.get('/aggregation', (req, res) => {
    res.render('aggregation', {title: 'Aggregation'})
  })
  sortRoutes(app)
  agrgRoutes(app)
}
