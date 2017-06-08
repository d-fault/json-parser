const getJSON = require('../middleware/getjson')
const sortConf = require('../../config/srt')
const csvConverter = require('../middleware/csv')


module.exports = (app, db) => {
  app.post('/result', (req, res) => {

    var resID
    for (i = 0; i < sortConf.data.length; i++) {
      if (req.body.srt === sortConf.data[i].name) {
        resID = sortConf.data[i].id
      }
    }

    const SortBy = (start, end) => {
      return end.data[resID] - start.data[resID]
    }

    getJSON(req.body.url, (err, data) => {
      //sort data

      let dataInput = data.data.children
      let dataOutput = []
      dataInput = dataInput.sort(SortBy)

      for (i = 0; i < dataInput.length; i++) {
        let utcTime = new Date(dataInput[i].data.created_utc * 1000)
        dataOutput[i] = {
          'id': dataInput[i].data.id,
          'title': dataInput[i].data.title,
          'date': utcTime,
          'score': dataInput[i].data.score
        }
      }

      res.render('result', {
        title: 'Result',
        result: csvConverter(dataOutput)
      })
    })
  })
}
