const getJSON = require('../middleware/getjson')
const sortConf = require('../../config/srt')


module.exports = (app, db) => {
  app.post('/result', (req, res) => {

    var resID
    for (i = 0; i < sortConf.data.length; i++) {
      if (req.body.srt === sortConf.data[i].name) {
        resID = sortConf.data[i].id
      }
    }

    const SortBy = (start, end) => {
      console.log("output: ", typeof(end.data))
      return end.data[resID] - start.data[resID]
    }

    getJSON(req.body.url, (err, data) => {
      //sort data
      let dataInput = data.data.children
      let dataOutput = []
      dataInput = dataInput.sort(SortBy)

      for (i = 0; i < dataInput.length; i++) {
        // console.log("OUT: ", SortBy)
        let utcTime = new Date(dataInput[i].data.created_utc * 1000)
        dataOutput[i] = {
          'id': dataInput[i].data.id,
          'title': dataInput[i].data.title,
          'score': dataInput[i].data.score,
          'date': utcTime
        }
      }
      //output Result

      // console.log('console output: ', dataOutput)
      res.render('result', {
        title: 'Result',
        result: JSON.stringify(dataOutput)
      })
    })
  })
}
