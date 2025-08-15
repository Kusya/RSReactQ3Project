import './App.css';
import PokemonSearchPage from './features/PokemonSearchPage/PokemonSearchPage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { useState } from 'react';
import { ThemeContext } from './shared/context';
import DetailsWrapper from './features/PokemonDetails/DetailsWrapper';
import MenuLayout from './components/MenuLayout';
import { Provider } from 'react-redux';
import { store } from './shared/store';

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <Provider store={store}>
      <ThemeContext value={theme}>
        <Router>
          <MenuLayout sendThemeUp={setTheme}>
            <Routes>
              <Route path="/" element={<PokemonSearchPage />}>
                <Route path="/details/:name" element={<DetailsWrapper />} />
                <Route path="details" element={<div></div>} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MenuLayout>
        </Router>
      </ThemeContext>
    </Provider>
  );
}

export default App;
