let todosCount = 0
let todos = []

const saveTodo = async todo => {
  const newTodo = { ...todo, id: todosCount++ }
  todos.push(newTodo)
  return newTodo
}

const getTodos = async () => todos

const deleteTodos = async () => {
  todos = []
}

module.exports = {
  saveTodo,
  getTodos,
  deleteTodos
}
