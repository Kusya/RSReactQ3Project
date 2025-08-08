import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { server } from './../../tests/mocks/server';
import DetailsWrapper from './DetailsWrapper';
import { renderWithProviders } from '../../tests/testUtils';

const renderWithRouter = (name: string = 'pikachu') => {
  renderWithProviders(
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
      expect(
        screen.getByText('Pokemon name has not been specified')
      ).toBeInTheDocument();
    });
  });
});
