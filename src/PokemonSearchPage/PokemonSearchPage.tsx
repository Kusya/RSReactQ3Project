import { Component } from 'react';
import Search from '../Search/Search';
import TableView from '../TableView/TableView';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export default class PokemonSearchPage extends Component {
  render() {
    //todo: there should be separate box for search component. maybe some saved values should goes to search params.
    // values saved into localStorage
    return (
      <>
        <ErrorBoundary>
          <Search />
        </ErrorBoundary>
        <TableView />
      </>
    );
  }
}
