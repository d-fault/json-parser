module.exports = convertToCSV = (args) => {
  let data, ctr
  data = args || null
  if (data === null || !data.length) {
    return null
  }

  let columnDelimiter = args.columnDelimiter || ','
  let lineDelimiter = args.lineDelimiter || '\r\n'

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
