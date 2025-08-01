import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { server } from '../../../mocks/server';
import { BrowserRouter } from 'react-router-dom';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('show table with loaded data if searchString not defined', async () => {
  render(
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
  render(
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
  const { rerender } = render(
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
