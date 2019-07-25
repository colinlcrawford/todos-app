const {
  loginHandler
} = require('./users.handlers')

const {
  loginValidators
} = require('./users.validators')

const registerRoutes = async (server, options) => {
  server.route({
    method: 'GET',
    path: '/todos',
    handler: loginHandler,
    options: {
      validate: loginValidators
    }
  })
}

module.exports = {
  registerRoutes
}
