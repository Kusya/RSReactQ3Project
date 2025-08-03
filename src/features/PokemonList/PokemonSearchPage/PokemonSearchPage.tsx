import Search from '../../../components/Search/Search';
import CardList from '../CardList/CardList';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../../hooks/useLocalStorage';

export default function PokemonSearchPage() {
  const [searchData, setSearchData] = useLocalStorage('searchInput', '');

  return (
    <>
      <header>
        <ErrorBoundary>
          <Search searchStr={searchData} sendSearchUp={setSearchData} />
        </ErrorBoundary>
      </header>
      <main>
        <CardList searchString={searchData} />
      </main>
    </>
  );
}
