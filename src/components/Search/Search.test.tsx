import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

const mockSendSearchUp = vi.fn();

beforeEach(() => {
  mockSendSearchUp.mockClear();
  localStorage.clear();
});

test('Search render field and button, and error button', () => {
  render(<Search searchStr="" sendSearchUp={() => {}} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  const searchElement = screen.getByRole('button', { name: /Search/i });

  expect(searchElement).toBeDefined();
  expect(searchElement).not.toBeDisabled();

  expect(searchElement.getAttribute('disabled')).toBeNull();
});

test('click Search calls sendSearchUp with currend value of searchString', async () => {
  render(<Search searchStr="" sendSearchUp={mockSendSearchUp} />);
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  await userEvent.clear(input);
  await userEvent.type(input, 'bulbasaur');
  await userEvent.click(searchButton);

  expect(mockSendSearchUp).toHaveBeenCalledWith('bulbasaur');
});
