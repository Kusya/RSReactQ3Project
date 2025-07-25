import { render, screen } from '@testing-library/react';
import PokemonSearchPage from './PokemonSearchPage';
import userEvent from '@testing-library/user-event';

test('PokemonSearchPage render check', () => {
  render(<PokemonSearchPage />);

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByText(/search/i)).toBeInTheDocument();
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('updating searchString and pass it into TableView', async () => {
  render(<PokemonSearchPage />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'char');

  const char = await screen.findByText('charmander');
  expect(char).toBeInTheDocument();
});

test('save searchString into localStorage on Search click', async () => {
  render(<PokemonSearchPage />);
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  await userEvent.clear(input);
  await userEvent.type(input, 'pikachu');
  await userEvent.click(searchButton);

  expect(localStorage.getItem('searchInput')).toBe('pikachu');
});
