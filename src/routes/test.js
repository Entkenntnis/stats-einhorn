const { safeHandler } = require('../lib/safeHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    safeHandler(async (req, res) => {
      const { param } = req.body

      return res.json({ ok: true })
    })
  )
}
