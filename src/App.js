import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './components/TaskList';

export const URL = 'https://adas-task-list.herokuapp.com/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        const newTasks = res.data.map((task) => {
          return {
            id: task.id,
            text: task.title,
            done: task.is_complete,
          };
        });
        setStatus('Loaded');
        setTasks(newTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
        let routeWord = 'complete';
        if (!task.done) {
          routeWord = 'incomplete';
        }
        axios
          .patch(`${URL}/${id}/${routeWord}`)
          .then(() => setTasks(newTasks))
          .catch((err) => console.log(err));
      }
      return task;
    });
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
          {status === 'Loading...' ? (
            `${status}`
          ) : (
            <TaskList
              tasks={tasks}
              onToggleCompleteCallback={updateTask}
              onDeleteCallback={deleteTask}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
