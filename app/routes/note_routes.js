module.exports = function(app, db) {
  app.post('/result', (req, res) => {
    console.log(req.body)
    res.send("SOMTH")
  })
}
