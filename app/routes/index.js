const noteRoutes = require('./note_routes')
const sortRoutes = require('./sorting')
const agrgRoutes = require('./aggregation')

var getJSON = (url, res) => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.resposeType = 'json'
  xhr.onload = () => {
    let status = xhr.status
    if (status == 200) {
      res(null, xhr.response)
    } else {
      res(status)
    }
  }
  xhr.send()
}

module.exports = function(app, db) {
  app.get('/', (req, res) => {
    res.render('index', {title: 'JSON Parser'})
  })
  noteRoutes(app, db)
}
