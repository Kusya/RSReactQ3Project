import Search from '../../components/Search/Search';
import TableView from '../../components/TableView/TableView';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function PokemonSearchPage() {
  const [searchData, setSearchData] = useLocalStorage('searchInput', '');

  const handleSearchData = (data: string) => {
    setSearchData(data);
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
