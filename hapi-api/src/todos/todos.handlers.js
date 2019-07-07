const R = require('ramda')
const HttpStatus = require('http-status-codes')

const { getTodos, saveTodo, deleteTodos } = require('./todos.persistence')

const getTodosHandler = async function (request, h) {
  return R.pipe(
    getTodos,
    R.then(todos => h.response(todos).code(HttpStatus.OK))
  )(request.query)
}

const postTodoHandler = async function (request, h) {
  return R.pipe(
    saveTodo,
    R.then(todo => h.response(todo).code(HttpStatus.CREATED))
  )(request.payload)
}

const deleteTodosHandler = async function (request, h) {
  return R.pipe(
    deleteTodos,
    R.then(() => h.response({ message: 'success' }).code(HttpStatus.OK))
  )(request.payload)
}

module.exports = {
  getTodosHandler,
  postTodoHandler,
  deleteTodosHandler
}
