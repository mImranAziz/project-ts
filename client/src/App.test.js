import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import App from './App';

test('Renders login page', () => {
  render(<App />);
  const loginHeader = screen.queryAllByText(/Login/i);
  const username = screen.getByText(/Username/i);
  const password = screen.getByText(/Password/i);
  expect(username).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginHeader.length).toBe(2);
});

test('Logs in successfully', () => {
  const { getByLabelText, getByText } = render(<App />);

  const userInput = getByLabelText('Username:');
  const passwordInput = getByLabelText('Password:');
  fireEvent.change(userInput, { target: { value: 'admin' } });
  fireEvent.change(passwordInput, { target: { value: 'p' } });

  const submitButton = screen.getByRole('button');
  fireEvent.click(submitButton);

  const successMessage = getByText('Welcome to the Store');
  expect(successMessage).toBeInTheDocument();
});

test('Redirects user to login if user tries to open a page directly', () => {
  const history = createMemoryHistory();
  history.push('/bad/route');
  render(<App />);
  const loginHeader = screen.queryAllByText(/Login/i);
  const username = screen.getByText(/Username/i);
  expect(username).toBeInTheDocument();
  expect(loginHeader.length).toBe(2);
});

