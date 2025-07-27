import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from './About';
import NotFound from './NotFound';

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
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );

  expect(screen.getByText(/404/i)).toBeInTheDocument();
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
