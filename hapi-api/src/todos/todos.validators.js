const Joi = require('@hapi/joi')
const { todoSchema } = require('./todo.model')

const getTodosValidators = {
  query: Joi.object({
    size: Joi.number().min(1).max(100).default(1),
    offset: Joi.number().min(0).default(0)
  })
}

const postTodoValidators = {
  payload: todoSchema.optionalKeys('id', 'priority')
}

const getTodosResponse = Joi.array().items(todoSchema)

module.exports = {
  postTodoValidators,
  getTodosValidators,
  getTodosResponse
}
