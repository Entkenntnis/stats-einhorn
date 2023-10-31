const { backend_password } = require('../../secrets')
const { safeHandler } = require('../lib/safeHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    safeHandler(async (req, res) => {
      const { password } = req.body

      if (password !== backend_password) {
        return res.json({ ok: false, reason: 'Ungültige Anfrage' })
      }

      const users = await App.db.User.findAll({
        raw: true,
        attributes: ['id', 'name', 'createdAt'],
      })
      const logs = await App.db.Log.findAll({
        raw: true,
      })
      const solved = await App.db.Solved.findAll({
        raw: true,
      })

      return res.json({ ok: true, users, logs, solved })
    })
  )
}
