const { loggedInHandler } = require('../lib/loggedInHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    loggedInHandler(App, async (req, res) => {
      const { storyId } = req.body

      if (typeof storyId !== 'number' || !Number.isInteger(storyId)) {
        return res.json({ ok: false, reason: 'Missing story id' })
      }

      await App.db.Solved.create({ storyId, userId: req.userId })

      return res.json({ ok: true })
    })
  )
}
