// const sortConf = require('../../config/srt')

module.exports = convertToCSV = (args, delims) => {
  let data, ctr

  data = args || null
  if (data === null || !data.length) {
    return null
  }

  let columnDelimiter = delims || ','
  let lineDelimiter =  '\r\n'

  let keys = Object.keys(data[0])

  let result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  data.forEach((item) => {
    let ctr = 0
    keys.forEach((key) => {
      if (ctr > 0) {
        result += columnDelimiter
      }
      result += '"' + item[key] + '"'
      ctr++
    })
    result += lineDelimiter
  })
  return result
}
