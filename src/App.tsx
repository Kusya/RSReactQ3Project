import './App.css';
import PokemonSearchPage from './features/PokemonList/PokemonSearchPage/PokemonSearchPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import NotFound from './pages/NotFound';
import PokemonDetails from './features/PokemonList/PokemonDetails/PokemonDetails';
import { useState } from 'react';
import { ThemeContext } from './app/context';
import ThemeButton from './components/ThemeButton/ThemeButton';

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <>
      <ThemeContext value={theme}>
        <Router>
          <div className={theme}>
            <ThemeButton sendSearchUp={setTheme} />
            <Routes>
              <Route path="/" element={<PokemonSearchPage />}>
                <Route path="/details/:id" element={<PokemonDetails />} />
                <Route path="details" element={<div>...</div>} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ThemeContext>
    </>
  );
}

export default App;
