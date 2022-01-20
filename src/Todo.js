import React from 'react';
import { useGlobalContext } from './context';

const Todo = ({ item }) => {
  const { removeItem, editItem, toggleCheck } = useGlobalContext();
  return (
    <li
      className={`list-group-item my-2 border-3 d-flex justify-content-between align-items-cente ${
        item.check && 'border-primary'
      }`}
      onDoubleClick={() => toggleCheck(item.id)}
    >
      <h3 className={`${item.check && 'text-primary'}`}>
        {item.title}{' '}
        {item.check && <i className="fas fa-check mx-3 small text-success"></i>}
      </h3>
      <div>
        <i
          onClick={() => editItem(item.id)}
          className="fas fa-edit text-success mx-2"
        ></i>
        <i
          onClick={() => removeItem(item.id)}
          className="fas fa-times text-danger"
        ></i>
      </div>
    </li>
  );
};

export default Todo;
