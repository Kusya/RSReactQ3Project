import { screen } from '@testing-library/react';
import CardList from '../features/PokemonList/CardList/CardList';
import { server } from './mocks/server';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './testUtils';
import { describe, expect } from 'vitest';

describe('Card List Tests', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('show loading state', () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('show loaded data in cardList if searchString not defined', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    const bulba = await screen.findByText('bulbasaur');
    const squir = await screen.findByText('squirtle');

    expect(bulba).toBeInTheDocument();
    expect(squir).toBeInTheDocument();
  });

  test('show loaded data in cardList if searchString is defined', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="char" />
      </BrowserRouter>
    );

    const charm = await screen.findByText('charmander');
    const squir = screen.queryByText('squirtle');

    expect(charm).toBeInTheDocument();
    expect(squir).not.toBeInTheDocument();
  });

  test('updated a table on updated searchString', async () => {
    const { rerender } = renderWithProviders(
      <BrowserRouter>
        <CardList searchString="char" />
      </BrowserRouter>
    );
    const charm = await screen.findByText('charmander');
    const squir = await screen.queryByText('squirtle');

    expect(charm).toBeInTheDocument();
    expect(squir).not.toBeInTheDocument();

    rerender(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );

    const bulbasaur = await screen.findByText('bulbasaur');
    const charmander = await screen.findByText('charmander');

    expect(bulbasaur).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
  });
});
