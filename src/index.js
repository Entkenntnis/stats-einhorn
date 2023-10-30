const App = {}

require('./modules/secrets.js')(App)
require('./modules/db.js')(App)
require('./modules/express.js')(App)

require('./routes/register.js')(App)
require('./routes/check.js')(App)
require('./routes/login.js')(App)

require('./app.js')(App)
