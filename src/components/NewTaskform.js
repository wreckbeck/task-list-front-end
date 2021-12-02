import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ onAddTaskCallback }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    done: false,
  });

  const submitTaskData = (e) => {
    e.preventDefault();
    onAddTaskCallback(taskData);
    setTaskData({ title: '', done: false });
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
          <label htmlFor="done">Done</label>
          <select value={taskData.done} onChange={handleChange}>
            <option></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </section>
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;
