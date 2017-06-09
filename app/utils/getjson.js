const request = require('request')

module.exports =  getJsonFromUrl = (url, callback) => {
  request(url, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      let jsonpData = body
      let json
      try {
        json = JSON.parse(jsonpData)
      }
      catch(e) {
        let startPos = jsonpData.indexOf('({')
        let endPos = jsonpData.indexOf('})')
        let jsonString = jsonpData.substring(startPos+1, endPos+1)
        json = JSON.parse(jsonString)
      }
      callback(null, json)
    } else {
      callback(err)
    }
  })
}
