import React, { useContext, useState, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [check, setCheck] = useState(false);
  const [editID, setEditID] = useState(null);
  const [finishedList, setFinishedList] = useState([]);

  useEffect(() => {
    list.map((item) => {
      if (item.check === true) {
        let index = list.indexOf(item);
        list.splice(index, 1);
        setFinishedList([...finishedList, item]);
      }
    });
  }, [list]);

  useEffect(() => {
    finishedList.map((item) => {
      if (item.check === false) {
        let index = finishedList.indexOf(item);
        finishedList.splice(index, 1);
        setList([...list, item]);
      }
    });
  }, [finishedList]);

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
    } else if (check) {
      const newItem = {
        id: new Date().getTime().toString(),
        title: text,
        check: check,
      };
      setFinishedList([...finishedList, newItem]);
      setText('');
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

  const clearList = () => {
    setList([]);
    setFinishedList([]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setText(specificItem.title);
  };

  const toggleCheck = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, check: !item.check } : item
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        finishedList,
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
