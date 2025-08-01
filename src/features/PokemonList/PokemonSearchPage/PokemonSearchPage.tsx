import Search from '../../../components/Search/Search';
import CardList from '../CardList/CardList';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../../hooks/useLocalStorage';

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
        <CardList searchString={searchData} />
      </main>
    </>
  );
}
