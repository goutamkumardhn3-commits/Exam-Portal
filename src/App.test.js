import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the login screen and opens the candidate screen', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ message: 'Login successful' })
  });

  render(<App />);

  expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'candidate@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password' }
  });
  fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

  await waitFor(() => {
    expect(screen.getByText(/online examination portal/i)).toBeInTheDocument();
    expect(screen.getByText(/candidate@example.com/i)).toBeInTheDocument();
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://loginbackends-nyzo.onrender.com/login',
    expect.objectContaining({ method: 'POST' })
  );
});

test('registers a candidate and returns to the login screen', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 201,
    json: async () => ({ message: 'Registration successful' })
  });

  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /create an account/i }));
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'New Candidate' }
  });
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'new@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/^password$/i), {
    target: { value: 'password123' }
  });
  fireEvent.change(screen.getByLabelText(/confirm password/i), {
    target: { value: 'password123' }
  });
  fireEvent.click(screen.getByRole('button', { name: /create account/i }));

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/registration successful/i);
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'https://loginbackends-nyzo.onrender.com/register',
    expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        name: 'New Candidate',
        email: 'new@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      })
    })
  );
});
