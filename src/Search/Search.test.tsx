import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const mockSendSearchUp = vi.fn();

beforeEach(() => {
  mockSendSearchUp.mockClear();
  localStorage.clear();
});

test('Search render field and button, and error button', () => {
  render(<Search sendSearchUp={() => {}} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  const searchElement = screen.getByRole('button', { name: /Search/i });
  const errorBtnElement = screen.getByRole('button', { name: /Error button/i });

  expect(searchElement).toBeDefined();
  expect(errorBtnElement).toBeDefined();
  expect(searchElement).not.toBeDisabled();

  expect(searchElement.getAttribute('disabled')).toBeNull();
  expect(errorBtnElement.getAttribute('disabled')).toBeNull();
});

test('click Search calls sendSearchUp with currend value of searchString', async () => {
  render(<Search sendSearchUp={mockSendSearchUp} />);
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  await userEvent.clear(input);
  await userEvent.type(input, 'bulbasaur');
  await userEvent.click(searchButton);

  expect(mockSendSearchUp).toHaveBeenCalledWith('bulbasaur');
});

test('click Error button throws end error', async () => {
  const consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(vi.fn());

  const { container } = render(
    <ErrorBoundary>
      <Search sendSearchUp={mockSendSearchUp} />
    </ErrorBoundary>
  );

  const errorButton = screen.getByRole('button', { name: /error/i });
  await userEvent.click(errorButton);

  expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
  expect(container).toHaveTextContent(/something went wrong/i);
  consoleErrorSpy.mockRestore();
});
test('save searchString into localStorage on Search click', async () => {
  render(<Search sendSearchUp={mockSendSearchUp} />);
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  await userEvent.clear(input);
  await userEvent.type(input, 'pikachu');
  await userEvent.click(searchButton);

  expect(localStorage.getItem('searchInput')).toBe('pikachu');
});
