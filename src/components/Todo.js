import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import classes from './Todo.module.css'

const Todo = ({ todos, updateTodos }) => {
  const [editIndex, setEditIndex] = useState(-1);

  const submitUpdate = todo => {
    todos[editIndex].task = todo.text
    setEditIndex(-1)
    updateTodos(todos)
  };


  return todos.map((todo, index) => (
    index == editIndex ?
      <TodoForm edit={true} onSubmit={submitUpdate} />
      :
      <div
        className={todo.isComplete ? `${classes['todo-row']} ${classes['complete']}` : classes['todo-row']}
        key={index}
      >
        <div key={todo.id} onClick={() => { todos[index].isComplete = true; updateTodos(todos) }}>
          {todo.task}
        </div>
        <div className={classes['icons']}>
          <RiCloseCircleLine
            onClick={() => { { todos.splice(index, 1); updateTodos(todos) } }}
            className={classes['delete-icon']}
          />
          <TiEdit
            onClick={() => setEditIndex(index)}
            className={classes['edit-icon']}
          />
        </div>
      </div>

  ));
};

export default Todo;
