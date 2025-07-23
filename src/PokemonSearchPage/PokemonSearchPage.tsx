import { useState } from 'react';
import Search from '../Search/Search';
import TableView from '../TableView/TableView';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export default function PokemonSearchPage() {
  //todo: specifi searchstr only in there or only in Search component
  const [searchData, setSearchData] = useState(
    localStorage.getItem('searchInput') || ''
  );

  const handleSearchData = (data: string) => setSearchData(data);

  return (
    <>
      <header>
        <ErrorBoundary>
          <Search sendSearchUp={handleSearchData} />
        </ErrorBoundary>
      </header>
      <main>
        <TableView searchString={searchData} />
      </main>
    </>
  );
}
