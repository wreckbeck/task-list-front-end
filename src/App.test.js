import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App, { URL } from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const API_TASKS = [
  {
    id: 1,
    title: 'test-task-1',
    // eslint-disable-next-line camelcase
    is_complete: true,
  },
];

const taskGetResponse = rest.get(URL, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(API_TASKS));
});

const deleteResponse = rest.delete(`${URL}/:taskId`, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({ ok: true }));
});

const markTaskCompleteOrIncompleteResponse = rest.patch(
  `${URL}/:taskId/:completeOrIncomplete`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ok: true }));
  }
);

const addTaskResponse = rest.post(URL, (req, res, ctx) => {
  const maxId = API_TASKS.reduce((max, task) => Math.max(max, task.id), 0);
  return res(
    ctx.status(201),
    ctx.json({
      task: {
        id: maxId + 1,
        title: req.body.title,
        // eslint-disable-next-line camelcase
        is_complete: !!req.body.completed_at,
      },
    })
  );
});

const server = new setupServer(taskGetResponse);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders Ada's Task List", async () => {
  // Act
  render(<App />);
  const task1 = await screen.findByText('test-task-1');
  const adasTaskList = screen.getByText(/Ada\'s Task List/i);
  // Assert
  expect(task1).toBeVisible();
  expect(adasTaskList).toBeVisible();
});

test('deleting a task triggers a delete request and removes task', async () => {
  server.use(deleteResponse);
  // Act
  const id = API_TASKS[0].id;
  render(<App />);
  const deleteButton = await screen.findByTestId(`delete button ${id}`);

  deleteButton.click();

  // Assert
  await waitFor(() => {
    expect(screen.queryByText(API_TASKS[0].title)).not.toBeInTheDocument();
  });
});

test('Clicking on a task triggers a patch request and toggles task complete/incomplete', async () => {
  // Arrange
  server.use(markTaskCompleteOrIncompleteResponse);
  const { title } = API_TASKS[0];
  render(<App />);

  const taskButton = await screen.findByText(title);

  // Act
  taskButton.click();

  // Assert

  await waitFor(() => {
    expect(screen.queryByText(title)).not.toHaveClass(
      'tasks__item__toggle--completed'
    );
  });
});

test('Clicking on a task again triggers a patch request and toggles task complete/incomplete', async () => {
  // Arrange
  server.use(markTaskCompleteOrIncompleteResponse);
  const { title } = API_TASKS[0];
  render(<App />);

  const taskButton = await screen.findByText(title);

  taskButton.click();

  await waitFor(() => {
    expect(screen.queryByText(title)).not.toHaveClass(
      'tasks__item__toggle--completed'
    );
  });

  // Act again
  taskButton.click();

  await waitFor(() => {
    expect(screen.queryByText(title)).toHaveClass(
      'tasks__item__toggle--completed'
    );
  });
});

test('adding a new task calls the API and updates the task list', async () => {
  // Arrange
  server.use(addTaskResponse);

  render(<App />);

  const newTaskTitle = 'new task title';

  // Act
  fireEvent.change(screen.getByLabelText('Title'), {
    target: { value: newTaskTitle },
  });

  await screen.findByDisplayValue(newTaskTitle);

  fireEvent.click(screen.getByText('Add Task'));

  const newTask = await screen.findByText(newTaskTitle);

  // Assert
  expect(newTask).toBeVisible();
});

test('You can add a task with the task marked complete', async () => {
  // Arrange
  server.use(addTaskResponse, taskGetResponse);

  render(<App />);

  // Waiting for tasks to load
  await screen.findByText(API_TASKS[0].title);

  const newTaskTitle = 'new task title';

  // Act
  fireEvent.change(screen.getByLabelText('Title'), {
    target: { value: newTaskTitle },
  });

  const selectControl = screen.getByRole('combobox');
  fireEvent.change(selectControl, { target: { value: 'true' } });

  await waitFor(() => {
    expect(screen.getAllByTestId('select-option')[0].selected).toBe(true);
  });

  await screen.findByDisplayValue(newTaskTitle);

  fireEvent.click(screen.getByText('Add Task'));

  const newTask = await screen.findByText(newTaskTitle);

  // Assert
  expect(newTask).toBeVisible();
});

// TODO other tests include:
// 1.  When the API is down, the app should display a message
