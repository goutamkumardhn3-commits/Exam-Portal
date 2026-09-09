import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the login screen and opens the candidate screen', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      user: { email: 'candidate@example.com' },
      token: 'test-token'
    })
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
});
