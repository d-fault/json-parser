const getJSON = require('../utils/getjson')
const _ =require('underscore')
const util = require('util')

module.exports = (app) => {

  app.post('/aggregation', (req, res) => {

    getJSON(req.body.url, (err, data) => {
      let dataInput = data.data.children
      let dataMiddle = []
      let finalResult = []

      for (i = 0; i < dataInput.length; i++) {
        dataMiddle[i] = dataInput[i].data
      }

      sum = (numbers) => {
        return _.reduce(numbers, (result, current) => {
          return result + parseFloat(current)
        }, 0)
      }

      // amount of posts by domain
      let amount = _.countBy(dataMiddle, (d) => {
        return(d["domain"])
      })

      let result = _.chain(dataMiddle)
        .groupBy("domain")
        .map((value, key) => {
          return {
            domain: key,
            score: sum(_.pluck(value, "score")),
            amount: amount[key]
          }
        })
        .value()

      res.render('result', {
        title: 'Result',
        agrgresult: result
      })
    })
  })
}
