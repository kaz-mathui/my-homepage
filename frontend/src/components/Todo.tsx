import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api'
import { TodoType } from '../types/Todo'

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [task, setTask] = useState('')
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      api
        .get<TodoType[]>('/api/todos')
        .then((response) => {
          setTodos(response.data)
        })
        .catch((error) => {
          console.error('Error fetching todos:', error)
        })
    }
  }, [isLoggedIn, navigate])

  const addTodo = () => {
    api
      .post<TodoType>('/api/todos', { task, completed: false })
      .then((response) => {
        setTodos([...todos, response.data])
        setTask('')
      })
      .catch((error) => {
        console.error('Error adding todo:', error)
      })
  }

  const toggleTodo = (ID: number) => {
    const todo = todos.find((todo) => todo.ID === ID)
    if (todo) {
      api
        .put<TodoType>(`/api/todos/${ID}`, {
          ...todo,
          completed: !todo.completed
        })
        .then((response) => {
          setTodos(todos.map((t) => (t.ID === ID ? response.data : t)))
        })
        .catch((error) => {
          console.error('Error toggling todo:', error)
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
          <li key={todo.ID}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => toggleTodo(todo.ID)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
