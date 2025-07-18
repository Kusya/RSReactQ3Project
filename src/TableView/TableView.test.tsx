import { render, screen } from '@testing-library/react';
import TableView from './TableView';
import { server } from '../mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('show table with loaded data if searchString not defined', async () => {
  render(<TableView searchString="" />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  const bulba = await screen.findByText('bulbasaur');
  const squir = await screen.findByText('squirtle');

  expect(bulba).toBeInTheDocument();
  expect(squir).toBeInTheDocument();
});

test('show table with founded data if searchString is defined', async () => {
  render(<TableView searchString="char" />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  const charm = await screen.findByText('charmander');
  const squir = screen.queryByText('squirtle');

  expect(charm).toBeInTheDocument();
  expect(squir).not.toBeInTheDocument();
});
