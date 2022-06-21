import React from 'react';
import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onTaskClicked, onRemoveClicked }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const handleTaskClicked = () => {
    onTaskClicked(id);
  };

  const handleRemoveClicked = () => {
    onRemoveClicked(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={handleTaskClicked}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={handleRemoveClicked}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onTaskClicked: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired,
};

export default Task;
