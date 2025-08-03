import { useContext } from 'react';
import { ThemeContext } from './../../app/context';
import sunLogo from './../../assets/sun-icon.svg';
import moonLogo from './../../assets/moon-icon.svg';

interface ThemeButtonProps {
  sendSearchUp: (data: string) => void;
}

export default function ThemeButton(props: ThemeButtonProps) {
  const theme = useContext(ThemeContext);
  const toggleTheme = () => {
    const toggled = theme == 'dark' ? 'light' : 'dark';
    props.sendSearchUp(toggled);
  };
  const logo = theme == 'dark' ? sunLogo : moonLogo;

  return (
    <>
      <div className={theme}>
        <button onClick={toggleTheme}>
          <img src={logo} className="logo" alt="Vite logo" />
        </button>
      </div>
    </>
  );
}
