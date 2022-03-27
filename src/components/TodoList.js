import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/list').then(
      response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      }
    ).then(
      data => {
        setTodos(data)
      }
    ).catch(
      error => console.log(error)
    )
  }, [])

  const updateTodos = todos => {
    console.log(todos)
    fetch('http://localhost:3001/update/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todos)
    }).then(
      response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      }
    ).then(
      data => {
        setTodos(data)
      }
    ).catch(
      error => console.log(error)
    )
  }

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    todos.push({ task: todo.text, isComplete: false })
    updateTodos(todos)
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        // completeTodo={completeTodo}
        // removeTodo={removeTodo}
        updateTodos={updateTodos}
      />
    </>
  );
}

export default TodoList;
