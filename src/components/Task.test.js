import React from 'react';
import { render, screen } from '@testing-library/react';
import Task from './Task';

describe('Task', () => {
  test('Renders title content', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={true}
        onToggleCompleteCallback={() => {}}
        onDeleteCallback={() => {}}
      />
    );

    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('Runs callbacks when buttons clicked', () => {
    // Arrange
    const clickCallback = jest.fn();
    const deleteCallback = jest.fn();

    // Act
    render(
      <Task
        id={42}
        title={'Test Title'}
        isComplete={true}
        onToggleCompleteCallback={clickCallback}
        onDeleteCallback={deleteCallback}
      />
    );

    screen.getByText('Test Title').click();
    screen.getByTestId('delete button 42').click();

    // Assert
    expect(clickCallback).toHaveBeenCalledTimes(1);
    expect(deleteCallback).toHaveBeenCalledTimes(1);
    // Check parameters passed to callbacks
    expect(clickCallback).toHaveBeenCalledWith(42);
    expect(deleteCallback).toHaveBeenCalledWith(42);
  });

  test('Task has class "tasks__item__toggle--completed" if isComplete is true', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={true}
        onToggleCompleteCallback={() => {}}
        onDeleteCallback={() => {}}
      />
    );

    expect(screen.getByText('Test Title')).toHaveClass(
      'tasks__item__toggle--completed'
    );
  });

  test('Task does not have class "tasks__item__toggle--completed" if isComplete is false', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={false}
        onToggleCompleteCallback={() => {}}
        onDeleteCallback={() => {}}
      />
    );

    // Assert
    expect(screen.getByText('Test Title')).not.toHaveClass(
      'tasks__item__toggle--completed'
    );
  });
});
