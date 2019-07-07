const { expect } = require('@hapi/code')
const lab = exports.lab = require('@hapi/lab').script()
const { describe, it } = lab

const { TodoFactory } = require('../../tests/factories/todo.factory')

const { validateTodo, createTodo } = require('./todo.model')

describe('Todo model', () => {
  describe('validateTodo', () => {
    it('should validate a todo', () => {
      const todo = {}
      const { error } = validateTodo(todo)

      expect(error).to.exist()
    })

    it('shouldnt return an error for a valid todo', () => {
      const todo = TodoFactory.build()
      const { error, value } = validateTodo(todo)

      expect(error).to.equal(null)
      expect(value).to.equal(todo)
    })
  })

  describe('createTodo', () => {
    it('should create a todo', () => {
      const todo = TodoFactory.build()
      const { error, value } = createTodo(todo)

      expect(error).to.not.exist()
      expect(value).to.equal(todo)
    })
  })
})
