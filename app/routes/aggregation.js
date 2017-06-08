const getJSON = require('../middleware/getjson')
const _ =require('underscore')
const util = require('util')

module.exports = (app, db) => {

  app.post('/aggregation', (req, res) => {

    getJSON(req.body.url, (err, data) => {
      let dataInput = data.data.children
      let dataMiddle = []
      for (i = 0; i < dataInput.length; i++) {
        dataMiddle[i] = dataInput[i].data
      }

      // amount of posts by domain
      let amount = _.countBy(dataMiddle, (d) => {
        return(d["domain"])
      })

      // console.log("amount: \n", util.inspect(amount, false, null, true))

      let tmp = _.groupBy(dataMiddle, (d) => {
        return(d["domain"])
      })

      // console.log("OUT ", util.inspect(tmp, false, null, true))

      let tmp2 = {}
      _.each(tmp, (t, unit) => {
        // console.log("out: \n", unit)
        tmp2[unit] = _.groupBy(t, (d) => {
          return d["score"]
        })
      })

      // console.log("tmp2: \n", util.inspect(tmp2, false, null, true))

      let finalResult = []
      _.each(tmp2, (t, unit) => {
        _.each(t, (items, currency) => {
          let total = 0
          _.each(items, (item) => {
            // console.log("OUT:\n", item)
            total += item["score"]
          })
          finalResult.push({
            "domain": unit,
            "totalscore": total
          })
        })
      })

      // console.log("FINAL RES: \n", util.inspect(finalResult, false, null, true))
      // console.log("tmp2: \n" +  util.inspect(tmp2, false, null, true))

      for (i = 0; i < dataInput.length; i++) {

      }

      res.render('result', {title: 'Result'})
    })

  })
}
