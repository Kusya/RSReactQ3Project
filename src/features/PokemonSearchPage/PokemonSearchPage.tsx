import Search from '../../components/Search/Search';
import CardList from '../PokemonList/CardList/CardList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Outlet } from 'react-router-dom';
import './../PokemonList/CardList/CardList.css';

export default function PokemonSearchPage() {
  const [searchData, setSearchData] = useLocalStorage('searchInput', '');

  return (
    <ErrorBoundary>
      <div className="card-list-layout">
        <div>
          <Search searchStr={searchData} sendSearchUp={setSearchData} />
          <CardList searchString={searchData} />
        </div>
        <Outlet />
      </div>
    </ErrorBoundary>
  );
}
