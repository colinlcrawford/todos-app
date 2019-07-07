const { expect } = require('@hapi/code')
const lab = exports.lab = require('@hapi/lab').script()
const { describe, it } = lab
const Joi = require('@hapi/joi')

const { TodoFactory } = require('../../tests/factories/todo.factory')

const {
  getTodosValidators,
  getTodosResponse,
  postTodoValidators
} = require('./todos.validators')

describe('todos validators', () => {
  describe('GET Todos Validators', () => {
    it('should validate query params', () => {
      const query = { size: 10, offset: 10 }
      const { error, value } = Joi.validate(query, getTodosValidators.query)

      expect(error).to.equal(null)
      expect(value.size).to.equal(query.size)
      expect(value.offset).to.equal(query.offset)
    })

    it('should provide default values for query params', () => {
      const { error, value } = Joi.validate({}, getTodosValidators.query)

      expect(error).to.equal(null)
      expect(value.size).to.exist()
      expect(value.offset).to.exist()
    })

    it('should return an array of todos', () => {
      const todosResponse = [TodoFactory.build()]

      const { error, value } = Joi.validate(todosResponse, getTodosResponse)

      expect(error).to.equal(null)
      expect(value).to.equal(todosResponse)
    })

    it('should should validate the todos', () => {
      const { error } = Joi.validate({}, getTodosResponse)

      expect(error).to.exist()
    })
  })

  describe('POST Todo Validators', () => {
    it('should return an error for an invalid request body', () => {
      const { error } = Joi.validate({}, postTodoValidators.payload)

      expect(error).to.exist()
    })

    it('should not return an error for a valid request body', () => {
      const body = { title: 'test title', description: 'some title!' }
      const { error, value } = Joi.validate(body, postTodoValidators.payload)

      expect(error).to.equal(null)
      expect(value).to.exist()
    })
  })
})
