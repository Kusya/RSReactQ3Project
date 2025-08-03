import { screen } from '@testing-library/react';
import PokemonSearchPage from '../features/PokemonList/PokemonSearchPage/PokemonSearchPage';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './testUtils';

test('PokemonSearchPage render check', () => {
  renderWithProviders(
    <BrowserRouter>
      <PokemonSearchPage />
    </BrowserRouter>
  );

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByText(/search/i)).toBeInTheDocument();
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('updating searchString and pass it into CardList', async () => {
  renderWithProviders(
    <BrowserRouter>
      <PokemonSearchPage />
    </BrowserRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'char');

  const char = await screen.findByText('charmander');
  expect(char).toBeInTheDocument();
});

test('save searchString into localStorage on Search click', async () => {
  renderWithProviders(
    <BrowserRouter>
      <PokemonSearchPage />
    </BrowserRouter>
  );
  const input = screen.getByRole('textbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  await userEvent.clear(input);
  await userEvent.type(input, 'pikachu');
  await userEvent.click(searchButton);

  expect(localStorage.getItem('searchInput')).toBe('pikachu');
});
