const {
  createAuthTokenHandler
} = require('./users.handlers')

const {
  createAuthTokenValidators
} = require('./users.validators')

const registerRoutes = async (server, options) => {
  server.route({
    method: 'POST',
    path: '/token',
    handler: createAuthTokenHandler,
    options: {
      validate: createAuthTokenValidators
    }
  })
}

module.exports = {
  registerRoutes
}
