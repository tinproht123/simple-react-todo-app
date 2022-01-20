import React from 'react';
import { useGlobalContext } from './context';

const Form = () => {
  const { text, setText, handleSubmit, setCheck, isEditing } =
    useGlobalContext();
  return (
    <div className="container mb-3">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the value"
            className="form-control"
          />
          <button
            type="submit"
            className={`btn ${isEditing ? 'btn-danger' : 'btn-primary'}`}
          >
            {isEditing ? 'Edit' : 'Add Item'}
          </button>
        </div>
        <div className="form-check mt-2">
          <label className="form-check-label">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(e) => setCheck(e.currentTarget.checked)}
            />{' '}
            Check
          </label>
        </div>
      </form>
    </div>
  );
};

export default Form;
