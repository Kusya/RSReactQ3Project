import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';

const mockSendSearchUp = vi.fn();

beforeEach(() => {
  mockSendSearchUp.mockClear();
  localStorage.clear();
});

test('Search renders textbox', () => {
  render(<Search searchStr="" sendSearchUp={() => {}} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

test('Search renders button', () => {
  render(<Search searchStr="" sendSearchUp={() => {}} />);
  const searchElement = screen.getByRole('button', { name: /Search/i });
  expect(searchElement).toBeInTheDocument();
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
