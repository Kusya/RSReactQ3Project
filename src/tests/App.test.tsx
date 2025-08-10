import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('App Tests', () => {
  test('show about page', async () => {
    render(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    await userEvent.click(aboutLink);

    expect(screen.getByText(/author/i)).toBeInTheDocument();
  });
  test('go back to main page', async () => {
    render(<App />);

    const defaultLink = screen.getByRole('link', { name: /Go Back/i });
    await userEvent.click(defaultLink);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
  test('theme button presents on page', async () => {
    render(<App />);
    const img = screen.getByAltText('Theme logo');
    expect(img).toBeInTheDocument();
  });
});
