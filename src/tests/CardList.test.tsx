import { screen } from '@testing-library/react';
import CardList from './CardList';
import { server } from '../../../tests/mocks/server';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../tests/testUtils';
import SelectedMenu from '../SelectedItemsMenu';
import userEvent from '@testing-library/user-event';
import saveAs from 'file-saver';

import { describe, it, expect } from 'vitest';
describe('Card List Tests', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('show table with loaded data if searchString not defined', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="" />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    const bulba = await screen.findByText('bulbasaur');
    const squir = await screen.findByText('squirtle');

    expect(bulba).toBeInTheDocument();
    expect(squir).toBeInTheDocument();
  });

  test('show table with founded data if searchString is defined', async () => {
    renderWithProviders(
      <BrowserRouter>
        <CardList searchString="char" />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();

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

    const unselectBtn = await screen.getByRole('button', {
      name: /Unselect All/,
    });

    await userEvent.click(unselectBtn);

    expect(screen.queryByText(/Items selected/)).not.toBeInTheDocument();
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
});
