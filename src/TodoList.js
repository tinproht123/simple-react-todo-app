import React from 'react';
import Todo from './Todo';
import { useGlobalContext } from './context';

const TodoList = () => {
  const { list } = useGlobalContext();
  return (
    <div className="container my-3">
      <ul className="list-group">
        {list.map((item) => {
          return <Todo key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
