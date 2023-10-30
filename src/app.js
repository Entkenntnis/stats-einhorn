module.exports = (App) => {
  void (async function start() {
    await App.db.sync({})
    App.express.listen(3111, () => {
      console.log('server started on port 3111')
    })
  })()
}
