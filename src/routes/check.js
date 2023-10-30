const { safeHandler } = require('../lib/safeHandler')

module.exports = (App) => {
  App.express.post(
    '/check',
    safeHandler(async (req, res) => {
      const { name } = req.body

      if (typeof name !== 'string') {
        return res.json({ ok: false, reason: 'Parameter Name fehlt.' })
      }

      const existingUser = await App.db.User.findOne({ where: { name } })

      // console.log(name, existingUser)

      return res.json({ ok: true, userExists: !!existingUser })
    })
  )
}
