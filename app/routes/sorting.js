const getJSON = require('../utils/getjson')
const sortConf = require('../../config/srt')
// const csvConverter = require('../utils/csv')


module.exports = (app) => {
  app.post('/sorting', (req, res) => {

    let resID
    let resDLM = "," // default delimiter
    let brk = '"'  // really?
    for (i = 0; i < sortConf.data.length; i++) {
      if (req.body.srt === sortConf.data[i].name) {
        resID = sortConf.data[i].id
      }
      if (req.body.dlm === sortConf.data[i].name) {
        resDLM = sortConf.data[i].id
      }

    }

    const SortBy = (start, end) => {
      return end.data[resID] - start.data[resID]
    }

    getJSON(req.body.url, (err, data) => {

      let dataInput = data.data.children
      let dataOutput = []
      dataInput = dataInput.sort(SortBy)

      for (i = 0; i < dataInput.length; i++) {
        let utcTime = new Date(dataInput[i].data.created_utc * 1000)
        dataOutput[i] = {
          domain: dataInput[i].data.domain,
          id: dataInput[i].data.id,
          title: dataInput[i].data.title,
          date: utcTime,
          score: dataInput[i].data.score
        }
      }

      res.render('result', {
        title: 'Result',
        sortresult: dataOutput,
        dlm: resDLM,
        brk: brk
        // result: csvConverter(dataOutput, resDLM)
      })
    })
  })
}
