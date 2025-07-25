import { useState } from 'react';
import Search from '../components/Search/Search';
import TableView from '../components/TableView/TableView';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

export default function PokemonSearchPage() {
  const [searchData, setSearchData] = useState(
    localStorage.getItem('searchInput') || ''
  );

  const handleSearchData = (data: string) => {
    setSearchData(data);
    localStorage.setItem('searchInput', data);
  };

  return (
    <>
      <header>
        <ErrorBoundary>
          <Search searchStr={searchData} sendSearchUp={handleSearchData} />
        </ErrorBoundary>
      </header>
      <main>
        <TableView searchString={searchData} />
      </main>
    </>
  );
}
