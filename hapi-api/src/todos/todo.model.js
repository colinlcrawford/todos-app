const Joi = require('@hapi/joi')

const todoSchema = Joi.object().keys({
  id: Joi.string(),
  title: Joi.string().min(1).max(50).required(),
  description: Joi.string().max(500).required(),
  priority: Joi.string().valid(['low', 'medium', 'high']).default('medium')
})

const validateTodo = todo => Joi.validate(todo, todoSchema)

const createTodo = todo => {
  return validateTodo(todo)
}

module.exports = {
  validateTodo,
  todoSchema,
  createTodo
}
