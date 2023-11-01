const { loggedInHandler } = require('../lib/loggedInHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    loggedInHandler(App, async (req, res) => {
      const { name } = req.body
      if (typeof name === 'string' && name && req.userId) {
        await App.db.User.update(
          { name: `deleted_at_${new Date().getTime()}` },
          { where: { id: req.userId, name } }
        )
        return res.json({ ok: true })
      }

      return res.json({
        ok: false,
        reason: 'Ungültige Anfrage. Es wurde nichts verändert.',
      })
    })
  )
}
