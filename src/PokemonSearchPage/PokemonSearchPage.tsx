import { Component } from 'react';
import Search from '../Search/Search';
import TableView from '../TableView/TableView';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

interface PokePageProps {
  searchString: string;
}

export default class PokemonSearchPage extends Component<PokePageProps> {
  constructor(props) {
    super(props);
    const searchInput = String(localStorage.getItem('searchInput'));
    this.state = { searchString: searchInput };

    this.handleSearchData = this.handleSearchData.bind(this);
  }

  handleSearchData(data: string) {
    this.setState({ searchString: data });
  }

  state = {
    searchString: '',
  };

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
