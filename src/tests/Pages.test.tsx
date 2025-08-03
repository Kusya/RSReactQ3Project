import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from './../pages/About';
import NotFound from './../pages/NotFound';
import { renderWithProviders } from './testUtils';

test('PokemonSearchPage render check', () => {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );

  expect(screen.getByText(/author/i)).toBeInTheDocument();
  expect(screen.getByText(/react course/i)).toBeInTheDocument();
});

test('PokemonSearchPage render check', () => {
  renderWithProviders(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );

  expect(screen.getByText(/404/i)).toBeInTheDocument();
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
