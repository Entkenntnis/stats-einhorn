const { compareSync } = require('bcryptjs')
const { safeHandler } = require('../lib/safeHandler')
const { sync } = require('uid-safe')

module.exports = (App) => {
  App.express.post(
    '/login',
    safeHandler(async (req, res) => {
      const { name, password } = req.body

      if (typeof name !== 'string' || typeof password !== 'string') {
        return res.json({
          ok: false,
          reason: 'Kein Name oder Passwort angegeben.',
        })
      }

      const user = await App.db.User.findOne({ where: { name } })
      if (user) {
        if (compareSync(password, user.password)) {
          const token = sync(18)
          // Question: should I remove other sessions with this username? not necessary
          const expires = new Date().getTime() + 24 * 60 * 60 * 1000
          await App.db.Session.create({ token, userId: user.id, expires })
          // TODO pass user token and other useful data to client
          return res.json({
            ok: true,
            token,
            data: { id: user.id, name: user.name /* solved */ },
          })
        }
      }

      return res.json({ ok: false, reason: 'Name oder Passwort falsch.' })
    })
  )
}
