const App = {}

require('./modules/secrets.js')(App)
require('./modules/db.js')(App)
require('./modules/express.js')(App)

require('./app.js')(App)