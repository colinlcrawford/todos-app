const {
  getTodosHandler,
  postTodoHandler,
  deleteTodosHandler
} = require('./todos.handlers')

const {
  getTodosValidators,
  postTodoValidators
} = require('./todos.validators')

const registerRoutes = async (server, options) => {
  server.route({
    method: 'GET',
    path: '/todos',
    handler: getTodosHandler,
    options: {
      validate: getTodosValidators
    }
  })

  server.route({
    method: 'POST',
    path: '/todos',
    handler: postTodoHandler,
    options: {
      validate: postTodoValidators
    }
  })

  server.route({
    method: 'DELETE',
    path: '/todos',
    handler: deleteTodosHandler
  })
}

module.exports = {
  registerRoutes
}
