import { screen } from '@testing-library/react';
import CardList from '../features/PokemonList/CardList/CardList';
import { server } from './mocks/server';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './testUtils';
import SelectedMenu from '../features/PokemonList/SelectedItemsMenu';
import userEvent from '@testing-library/user-event';
import saveAs from 'file-saver';

import { describe, expect } from 'vitest';
describe('Selected Menu Tests', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test('renders nothing when no items are selected', () => {
    renderWithProviders(<SelectedMenu />);

    expect(screen.queryByText(/Items selected/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Unselect All/ })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Download/ })
    ).not.toBeInTheDocument();
  });
  test('renders selected count and buttons when items are selected', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    const bulbasaur = await screen.findByText('bulbasaur');
    expect(bulbasaur).toBeInTheDocument();

    const checkboxes = await screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(screen.getByText(/Items selected: 1/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect All/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/ })
    ).toBeInTheDocument();
  });

  test('renders nothing in selectedMenu when items are unselected', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    const bulbasaur = await screen.findByText('bulbasaur');
    expect(bulbasaur).toBeInTheDocument();

    const checkboxes = await screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(screen.getByText(/Items selected: 1/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Unselect All/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Download/ })
    ).toBeInTheDocument();

    await userEvent.click(checkboxes[0]);
    expect(screen.queryByText(/Items selected/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Unselect All/ })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Download/ })
    ).not.toBeInTheDocument();
  });

  test('Unselect All button unselects all the items', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    const bulbasaur = await screen.findByText('bulbasaur');
    expect(bulbasaur).toBeInTheDocument();

    const checkboxes = await screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    const unselectBtn = await screen.getByRole('button', {
      name: /Unselect All/i,
    });
    await userEvent.click(unselectBtn);

    expect(screen.queryByText(/Items selected/i)).not.toBeInTheDocument();
  });
});
describe('DownloadButton', () => {
  beforeEach(() => {
    vi.mock('file-saver', () => {
      return {
        default: vi.fn(),
      };
    });
  });

  it('check that saveAs method has been called', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    const bulbasaur = await screen.findByText('bulbasaur');
    expect(bulbasaur).toBeInTheDocument();
    const checkboxes = await screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);

    expect(screen.getByText(/Items selected: 1/)).toBeInTheDocument();

    const downloadBtn = await screen.getByRole('button', {
      name: /Download/,
    });
    expect(downloadBtn).toBeInTheDocument();
    await userEvent.click(downloadBtn);

    expect(saveAs).toHaveBeenCalledTimes(1);
  });
});
