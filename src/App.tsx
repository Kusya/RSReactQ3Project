import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import PokemonSearchPage from './features/PokemonList/PokemonSearchPage/PokemonSearchPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import NotFound from './pages/NotFound';
import PokemonDetails from './features/PokemonList/PokemonDetails/PokemonDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PokemonSearchPage />}>
            <Route path="/details/:id" element={<PokemonDetails />} />
            <Route path="details" element={<div>...</div>} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </Router>
  );
}

export default App;
