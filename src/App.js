import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList';

export const URL = 'https://adas-task-list.herokuapp.com/tasks';

const App = () => {
  const [tasks, setTasks] = useState(TASKS);

  const updateTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          done: !task.done,
        };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onDeleteCallback={deleteTask}
            onToggleCompleteCallback={updateTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
