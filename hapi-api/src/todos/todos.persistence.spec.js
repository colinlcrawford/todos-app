const { expect } = require('@hapi/code')
const lab = exports.lab = require('@hapi/lab').script()
const { describe, it, beforeEach } = lab

const { TodoFactory } = require('../../tests/factories/todo.factory')

const { saveTodo, getTodos, deleteTodos } = require('./todos.persistence')

describe('todos persistence', () => {
  beforeEach(deleteTodos)

  describe('deleteTodos', () => {
    it('should delete persisted todos', async () => {
      await TodoFactory.create()

      await deleteTodos()

      expect(await getTodos()).to.equal([])
    })
  })

  describe('getTodos', () => {
    it('should return persisted todos', async () => {
      const todo = await TodoFactory.create()

      expect(await getTodos()).to.equal([todo])
    })
  })

  describe('saveTodo', () => {
    it('should persist a todo', async () => {
      const todo = TodoFactory.build()

      await saveTodo(todo)
      const todos = await getTodos()

      expect(todos.length).to.equal(1)
      expect(todos[0]).to.include(todo)
    })
  })
})
