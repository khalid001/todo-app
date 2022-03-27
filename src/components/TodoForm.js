import React, { useState, useEffect, useRef } from 'react';
import classes from './TodoForm.module.css'

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className={classes['todo-form']}>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className={`${classes['todo-input']} ${classes['edit']}`}
          />
          <button onClick={handleSubmit} className={`${classes['todo-button']} ${classes['edit']}`}>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder='Add a todo'
            value={input}
            onChange={handleChange}
            name='text'
            className={classes['todo-input']}
            ref={inputRef}
          />
          <button onClick={handleSubmit} className={classes['todo-button']}>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
