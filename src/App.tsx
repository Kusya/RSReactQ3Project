import './App.css';
import PokemonSearchPage from './features/PokemonSearchPage/PokemonSearchPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { useState } from 'react';
import { ThemeContext } from './app/context';
import ThemeButton from './components/ThemeButton/ThemeButton';
import DetailsWrapper from './features/PokemonDetails/DetailsWrapper';

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
                <Route path="/details/:name" element={<DetailsWrapper />} />
                <Route path="details" element={<div></div>} />
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
