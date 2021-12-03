import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import NewTaskForm from './NewTaskForm';

describe('NewTaskForm', () => {
  test('NewTaskForm can be rendered', () => {
    render(<NewTaskForm onAddTaskCallback={() => {}} />);
    expect(screen.getByText('Add a Task')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Done')).toBeInTheDocument();
  });

  test('NewTaskform can be filled in', async () => {
    // Arrange
    render(<NewTaskForm onAddTaskCallback={() => {}} />);
    const title = screen.getByLabelText('Title');
    const done = screen.getByLabelText('Done');

    // Act
    fireEvent.change(title, { target: { name: 'title', value: 'test' } });
    fireEvent.change(done, { target: { value: 'true' } });

    // Assert
    expect(title.value).toBe('test');
    expect(done.value).toBe('true');
  });

  test('NewTaskform can be filled in with a task not done', () => {
    // Arrange
    render(<NewTaskForm onAddTaskCallback={() => {}} />);
    const title = screen.getByLabelText('Title');
    const done = screen.getByLabelText('Done');

    // Act
    fireEvent.change(title, { target: { name: 'title', value: 'test' } });
    fireEvent.change(done, { target: { value: 'false' } });

    // Assert
    expect(title.value).toBe('test');
    expect(done.value).toBe('false');
  });

  test('when task is submitted the callback function is called', () => {
    // Arrange
    const callbackFunction = jest.fn();
    render(<NewTaskForm onAddTaskCallback={callbackFunction} />);

    const title = screen.getByLabelText('Title');
    const done = screen.getByLabelText('Done');
    const submitButton = screen.getByText('Add Task');

    // Act
    fireEvent.change(title, { target: { name: 'title', value: 'test' } });
    fireEvent.change(done, { target: { value: 'false' } });
    fireEvent.click(submitButton);

    // Assert
    expect(callbackFunction).toHaveBeenCalledTimes(1);
    expect(callbackFunction).toHaveBeenCalledWith({
      title: 'test',
      done: false,
    });
  });
});
