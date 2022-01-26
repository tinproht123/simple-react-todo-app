import React, { useContext, useState, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  let data = [
    { id: 1, title: 'add item to list', check: false },
    { id: 2, title: 'You can delete item from list', check: false },
    { id: 3, title: 'double click on item to check', check: false },
    { id: 4, title: 'double click on item again to uncheck', check: true },
    {
      id: 5,
      title: 'item got checked will be push to end of the list',
      check: true,
    },
    {
      id: 6,
      title: 'item  unchecked will be push back in head of the list',
      check: false,
    },
  ];
  const [list, setList] = useState(data);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [check, setCheck] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert('Please add a item');
      return;
    } else if (text && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: text };
          } else {
            return item;
          }
        })
      );
      setText('');
      setIsEditing(false);
      setEditID(null);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: text,
        check: check,
      };
      setList([...list, newItem]);
      setText('');
    }
  };

  //Clear all item from list
  const clearList = () => {
    setList([]);
  };

  //Remove item
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  //Edit item
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setText(specificItem.title);
  };

  //Toggle check the item
  const toggleCheck = (id) => {
    const checkItem = list.find((item) => item.id === id);
    setList(list.splice(list.indexOf(checkItem), 1));
    checkItem.check = !checkItem.check;
    return checkItem.check
      ? setList([...list, checkItem])
      : setList([checkItem, ...list]);
  };

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        text,
        setText,
        check,
        setCheck,
        isEditing,
        handleSubmit,
        clearList,
        removeItem,
        editItem,
        toggleCheck,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
