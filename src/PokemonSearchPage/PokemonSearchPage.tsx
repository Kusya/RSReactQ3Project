import { Component } from 'react';
import Search from '../Search/Search';
import TableView from '../TableView/TableView';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export default class PokemonSearchPage extends Component {
  state = {
    searchString: localStorage.getItem('searchInput') || '',
  };

  handleSearchData = (data: string) => this.setState({ searchString: data });

  render() {
    return (
      <>
        <header>
          <ErrorBoundary>
            <Search sendSearchUp={this.handleSearchData} />
          </ErrorBoundary>
        </header>
        <main>
          <TableView searchString={this.state.searchString} />
        </main>
      </>
    );
  }
}
