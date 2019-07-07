const R = require('ramda')
const { expect } = require('@hapi/code')
const lab = exports.lab = require('@hapi/lab').script()
const { describe, it, beforeEach, afterEach } = lab

const { PORT, NODE_ENV } = require('../../src/config/config').getConfig()
const { createServer, initServer } = require('../../src/server')
const { TodoFactory } = require('../factories/todo.factory')

const todosPath = '/api/v1/todos'

const getTodos = async server => server.inject({
  method: 'GET',
  url: todosPath
})

const deleteTodos = async server => server.inject({
  method: 'DELETE',
  url: todosPath
})

const postTodo = server => async payload => server.inject({
  method: 'POST',
  url: todosPath,
  payload
})

describe('/todos', () => {
  let server

  beforeEach(async () => {
    if (!server) server = await createServer({ port: PORT, nodeEnv: NODE_ENV })
    server = await initServer(server)
    await deleteTodos(server)
  })

  afterEach(async () => {
    await server.stop()
    server = null
  })

  it('GET / should return a list of todos in the database', async () => {
    const todos = await Promise.all(R.map(TodoFactory.create)(Array(2).fill()))

    const response = await getTodos(server)

    expect(response.result).to.equal(todos)
    expect(response.statusCode).to.equal(200)
  })

  it('DELETE / should delete all todos', async () => {
    await Promise.all(R.map(TodoFactory.create)(Array(2).fill()))

    await deleteTodos(server)

    const todos = (await getTodos(server)).result
    expect(todos).to.equal([])
  })

  it('POST / should create a todo', async () => {
    const createTodoDto = TodoFactory.build()

    const response = await postTodo(server)(createTodoDto)

    expect(response.result)
      .to.include(createTodoDto)
      .and.to.include(['id'])
    expect(response.statusCode).to.equal(201)
  })

  it('POST / should validate the request body', async () => {
    const response = await postTodo(server)({})

    expect(response.statusCode).to.equal(400)
  })
})
