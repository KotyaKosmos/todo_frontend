import { useState, useEffect } from 'react';

import api from './api';
import './App.css';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const isDisabledButton = !newTodo.trim();

  const onChangeHandler = (event) => {
    setNewTodo(event.target.value);
  };

  const addNewTodo = async () => {
    let date = new Date();
    date = new Date(date);
    date.toLocaleString();
    const data = {
      completed: false,
      datetime: date.toJSON(),
      title: newTodo,
    }

    const res = await api.addTodo(data);
    const newTodoList = [ ...todoList ];
    newTodoList.push(res);
    setTodoList(newTodoList);
    setNewTodo('');
  };

  const completeTodo = async (id, completed) =>  {
    const data = {
      id,
      completed: !completed,
    };
    const res = await api.modifyTodo(data);
    console.log(res);
    const newTodoList = [ ...todoList ];
    newTodoList.forEach((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
    setTodoList(newTodoList);
  };

  const deleteTodo = async (id) => {
    const res = await api.deleteTodo(id);

    if(res.status === 'Todo was removed') {
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
    }
  }

  const getAllTodos = async () => {
    const result = await api.getAllTodos();
    setTodoList(result);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="app">
      <header className='app-header  mb-4'>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="New todo ..."
            value={newTodo}
            onChange={onChangeHandler}
          />
          <button
            type="button"
            className="btn btn-success"
            onClick={addNewTodo}
            disabled={isDisabledButton}
          >
            Add new todo
          </button>
        </div>
      </header>
      <table className="table app-table">
        <thead>
        <tr className='table-secondary'>
          <th scope="col">#</th>
          <th scope="col"></th>
          <th scope="col">Title</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody className='app-table__body'>
          {
            todoList.map((todo, index) => (
              <tr key={todo.id} className={`app-table__row ${index % 2 === 1 ? 'table-primary' : ''}`}>
                <th scope="row">{ index + 1 }</th>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      checked={todo.completed}
                      onChange={() => completeTodo(todo.id, todo.completed)}
                    />
                  </div>
                </td>
                <td className={'app-table__title-cell'} title={todo.title}>
                  { todo.title }
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
