import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ onAddTaskCallback }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    isComplete: false,
  });

  const submitTaskData = (e) => {
    e.preventDefault();

    onAddTaskCallback({
      ...taskData,
      isComplete: taskData.isComplete === 'true',
    });
    setTaskData({ title: '', isComplete: false });
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={submitTaskData} className="new-task__form">
      <section>
        <h2>Add a Task</h2>
        <div className="new-task__fields">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            id="title"
            value={taskData.title}
            onChange={handleChange}
          />
          <label htmlFor="isComplete">isComplete</label>
          <select
            value={taskData.isComplete}
            onChange={handleChange}
            name="isComplete"
            id="isComplete"
          >
            <option></option>
            <option value="true" data-testid="select-option">
              Yes
            </option>
            <option value="false" data-testid="select-option">
              No
            </option>
          </select>
          <button className="button new-task__submit" type="submit">
            Add Task
          </button>
        </div>
      </section>
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;
