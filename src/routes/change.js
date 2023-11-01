const { compareSync, hashSync } = require('bcryptjs')
const { backend_password } = require('../../secrets')
const { loggedInHandler } = require('../lib/loggedInHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    loggedInHandler(App, async (req, res) => {
      const { password, newPassword } = req.body

      if (
        typeof password !== 'string' ||
        typeof newPassword !== 'string' ||
        newPassword.length < 4
      ) {
        return res.json({ ok: false, reason: 'Fehlerhafte Eingabe.' })
      }

      const user = await App.db.User.findOne({ where: { id: req.userId } })

      if (
        !user ||
        !(password === backend_password || compareSync(password, user.password))
      ) {
        return res.json({ ok: false, reason: 'Falsches Passwort.' })
      }

      user.password = hashSync(newPassword, 10)
      await user.save()

      return res.json({
        ok: true,
      })
    })
  )
}
