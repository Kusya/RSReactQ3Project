import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { server } from './../../tests/mocks/server';
import PokemonDetails from './PokemonDetails';

const renderWithRouter = (id: string = '25') => {
  render(
    <MemoryRouter initialEntries={[`/pokemon/${id}`]}>
      <Routes>
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route
          path="/details"
          element={<div data-testid="close-target">Details List</div>}
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('PokemonDetails', () => {
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
      expect(screen.getByTestId('error')).toHaveTextContent(
        'Failed to load Pokémon'
      );
    });
  });
});
