import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PokemonSearchPage from './PokemonSearchPage/PokemonSearchPage';

function App() {
  return (
    <>
      <div>
        <PokemonSearchPage></PokemonSearchPage>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  );
}

export default App;
