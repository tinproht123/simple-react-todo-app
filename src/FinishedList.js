import React from 'react';
import Todo from './Todo';
import { useGlobalContext } from './context';

const FinishedList = () => {
  const { finishedList } = useGlobalContext();
  return (
    <div className="container my-3">
      <ul className="list-group">
        {finishedList.map((item) => {
          return <Todo key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default FinishedList;
