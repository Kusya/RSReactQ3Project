import Search from '../../components/Search/Search';
import CardList from '../PokemonList/CardList/CardList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function PokemonSearchPage() {
  const [searchData, setSearchData] = useLocalStorage('searchInput', '');

  return (
    <ErrorBoundary>
      <header>
        <Search searchStr={searchData} sendSearchUp={setSearchData} />
      </header>
      <main>
        <CardList searchString={searchData} />
      </main>
    </ErrorBoundary>
  );
}
