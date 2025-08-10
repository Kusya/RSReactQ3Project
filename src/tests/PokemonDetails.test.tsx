import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { server } from './mocks/server';
import DetailsWrapper from './../features/PokemonDetails/DetailsWrapper';
import { renderWithProviders } from './testUtils';
import { http, HttpResponse } from 'msw';
import { POKEMON_URL } from '../app/constants';

const renderWithRouter = (name: string = 'pikachu') => {
  return renderWithProviders(
    <MemoryRouter initialEntries={[`/pokemon/${name}`]}>
      <Routes>
        <Route path="/pokemon/:name" element={<DetailsWrapper />} />
        <Route
          path="/details"
          element={<div data-testid="close-target">Details List</div>}
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('PokemonDetails', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('shows loading state initially', () => {
    renderWithRouter();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('loads and displays pokemon data', async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /pikachu/i })
      ).toBeInTheDocument();
    });
    expect(screen.getByText('Height: 4')).toBeInTheDocument();
    expect(screen.getByText('Weight: 60')).toBeInTheDocument();
    expect(screen.getByText('speed: 90')).toBeInTheDocument();
    expect(screen.getByText('attack: 55')).toBeInTheDocument();
  });

  test('navigates to /details when "Close" is clicked', async () => {
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /Close/i })).toBeInTheDocument();
    });
    const closeLink = screen.getByRole('link', { name: /Close/i });
    await userEvent.click(closeLink);
    expect(screen.getByTestId('close-target')).toBeInTheDocument();
  });

  test('shows error message when Pokémon not found', async () => {
    server.use();
    renderWithRouter('999');
    await waitFor(() => {
      expect(screen.getByText('something went wrong')).toBeInTheDocument();
    });
  });
});

describe('Pokemon details query tests', () => {
  const spy = vi.fn();
  afterEach(() => spy.mockClear());

  test('uses cache and does not refetch immediately', async () => {
    let callCount = 0;
    const originalHandler = http.get(`${POKEMON_URL}pokemon/pikachu`, () => {
      spy();
      callCount++;
      return HttpResponse.json({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: { front_default: 'https://...' },
        stats: [{ base_stat: 90, stat: { name: 'speed' } }],
      });
    });
    server.use(originalHandler);

    renderWithRouter();
    await screen.findByText(/pikachu/i);
    expect(spy).toHaveBeenCalledTimes(callCount);
    expect(callCount).toBe(1);

    renderWithRouter();
    expect(spy).toHaveBeenCalledTimes(callCount);
    expect(callCount).toBe(1);
  });

  test('manual refetch calls for api', async () => {
    let callCount = 0;
    const originalHandler = http.get(`${POKEMON_URL}pokemon/pikachu`, () => {
      spy();
      callCount++;
      return HttpResponse.json({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: { front_default: 'https://...' },
        stats: [{ base_stat: 90, stat: { name: 'speed' } }],
      });
    });
    server.use(originalHandler);

    renderWithRouter();
    await screen.findByText(/pikachu/i);
    expect(callCount).toBe(2);
    expect(spy).toHaveBeenCalledTimes(callCount);

    renderWithRouter();
    expect(spy).toHaveBeenCalledTimes(callCount);
    expect(callCount).toBe(2);
    const refetchButton = screen.getByRole('button', { name: /refresh/i });
    await userEvent.click(refetchButton);

    await waitFor(() => expect(callCount).toBe(6));
  });
});
