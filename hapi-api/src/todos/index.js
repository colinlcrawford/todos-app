const { registerRoutes } = require('./todos.routes')

const todosPlugin = {
  name: 'Todos',
  version: '1.0.0',
  register: registerRoutes
}

module.exports = todosPlugin
