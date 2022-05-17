import React from 'react';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Task.css';

const Task = ({
  id,
  title,
  isComplete,
  onToggleCompleteCallback,
  onDeleteCallback,
}) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => onToggleCompleteCallback(id)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button alert pull-right"
        data-testid={`delete button ${id}`}
        onClick={() => onDeleteCallback(id)}
      >
        <i className="fa fa-times">
          <FontAwesomeIcon icon={faTimes} />
        </i>
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleCompleteCallback: PropTypes.func.isRequired,
  onDeleteCallback: PropTypes.func.isRequired,
};

export default Task;
