function safeHandler(cb) {
  return async (req, res) => {
    try {
      await cb(req, res)
      return
    } catch (e) {
      console.log('Einhorn-Fehler:', e)
    }
    res.status(500)
    res.json({ error: true })
  }
}

module.exports = { safeHandler }
