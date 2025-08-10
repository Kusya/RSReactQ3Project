import { screen, waitFor } from '@testing-library/react';
import CardList from '../features/PokemonList/CardList/CardList';
import { server } from './mocks/server';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './testUtils';
import { http, HttpResponse } from 'msw';
import { describe, expect } from 'vitest';
import { POKEMON_URL } from '../app/constants';
import userEvent from '@testing-library/user-event';

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

describe('Card list query tests', () => {
  test('uses cache and does not refetch immediately', async () => {
    const spy = vi.fn();
    let callCount = 0;
    const originalHandler = http.get(
      `${POKEMON_URL}pokemon?limit=1000&offset=0`,
      () => {
        spy();
        callCount++;
        return HttpResponse.json({
          results: [
            { name: 'pikachu', url: POKEMON_URL + 'pokemon/25/ ' },
            { name: 'bulbasaur', url: POKEMON_URL + 'pokemon/1/ ' },
          ],
        });
      }
    );
    server.use(originalHandler);

    const { rerender } = renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );

    await screen.findByText(/pikachu/i);
    expect(spy).toHaveBeenCalledTimes(callCount);
    expect(callCount).toBe(1);

    rerender(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    expect(spy).toHaveBeenCalledTimes(callCount);
    expect(callCount).toBe(1);
  });

  test('manual refetch calls for api', async () => {
    const spy = vi.fn();
    let callCount = 0;
    const originalHandler = http.get(
      `${POKEMON_URL}pokemon?limit=1000&offset=0`,
      () => {
        spy();
        callCount++;
        return HttpResponse.json({
          results: [
            { name: 'pikachu', url: POKEMON_URL + 'pokemon/25/ ' },
            { name: 'bulbasaur', url: POKEMON_URL + 'pokemon/1/ ' },
          ],
        });
      }
    );
    server.use(originalHandler);

    const { rerender } = renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );

    await screen.findByText(/pikachu/i);
    expect(callCount).toBe(2);
    expect(spy).toHaveBeenCalledTimes(callCount);

    rerender(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    expect(spy).toHaveBeenCalledTimes(callCount);

    const refetchButton = screen.getByRole('button', { name: /refresh/i });
    await userEvent.click(refetchButton);

    await waitFor(() => expect(callCount).toBe(4));
  });
});
