const R = require('ramda')
const { saveTodo } = require('../../src/todos/todos.persistence')

const makeTodo = count => ({
  title: `todo ${count}`,
  description: `this is todo #${count}`,
  priority: 'medium'
})

const TodoFactory = () => {
  let todoCount = 0
  const incrimentTodoCount = () => todoCount++
  const build = () => R.pipe(incrimentTodoCount, makeTodo)(null)
  return {
    create: async () => R.pipe(build, saveTodo)(null),
    build
  }
}

module.exports = {
  TodoFactory: TodoFactory()
}
