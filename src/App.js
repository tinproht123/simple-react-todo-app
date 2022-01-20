import React from 'react';
import Form from './Form';
import TodoList from './TodoList';
import FinishedList from './FinishedList';
import { useGlobalContext } from './context';

export default function App() {
  const { list, finishedList, clearList } = useGlobalContext();
  return (
    <div
      className="my-5 container border border-dark border-3 px-3 py-4"
      style={{ maxWidth: 500 }}
    >
      <h1 id="title" className="text-dark text-center mb-3">
        <span className="text-primary">React</span> Todo App
      </h1>
      <Form />
      <h1>Todo List</h1>
      {list.length > 0 ? <TodoList /> : 'LIST IS EMPTY'}
      <hr />
      <h1>Finished</h1>
      {finishedList.length > 0 ? <FinishedList /> : 'LIST IS EMPTY'}
      {(list.length > 0) | (finishedList.length > 0) ? (
        <button
          onClick={clearList}
          type="button"
          className="btn btn-danger w-100 clear-btn my-3"
        >
          CLEAR LIST
        </button>
      ) : (
        ''
      )}
    </div>
  );
}
