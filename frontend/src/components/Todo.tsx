import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TodoType } from '../types/Todo'

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [task, setTask] = useState('')

  useEffect(() => {
    axios.get<TodoType[]>('/api/todos').then((response) => {
      setTodos(response.data)
    })
  }, [])

  const addTodo = () => {
    axios
      .post<TodoType>('/api/todos', { task, completed: false })
      .then((response) => {
        setTodos([...todos, response.data])
        setTask('')
      })
  }

  const toggleTodo = (id: number) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
      axios
        .put<TodoType>(`/api/todos/${id}`, {
          ...todo,
          completed: !todo.completed
        })
        .then((response) => {
          setTodos(todos.map((t) => (t.id === id ? response.data : t)))
        })
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder='New task'
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => toggleTodo(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
