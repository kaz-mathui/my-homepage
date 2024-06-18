import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TodoType } from '../types/Todo'

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [task, setTask] = useState('')

  useEffect(() => {
    axios.get<TodoType[]>('/api/todos').then((response) => {
      console.log('Fetched todos:', response.data) // 取得したデータをログ出力
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

  const toggleTodo = (ID: number) => {
    console.log(`Toggling todo with id: ${ID}`) // ここでidをログに出力
    const todo = todos.find((todo) => todo.ID === ID)
    if (todo) {
      axios
        .put<TodoType>(`/api/todos/${ID}`, {
          ...todo,
          completed: !todo.completed
        })
        .then((response) => {
          setTodos(todos.map((t) => (t.ID === ID ? response.data : t)))
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
        {todos.map((todo) => {
          console.log('Rendering todo:', todo.ID) // 各todoアイテムをログ出力
          return (
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
          )
        })}
      </ul>
    </div>
  )
}

export default Todo
