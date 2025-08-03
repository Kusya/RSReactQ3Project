import { useContext } from 'react';
import { ThemeContext } from './../../app/context';
import sunLogo from './../../assets/sun-icon.svg';
import moonLogo from './../../assets/moon-icon.svg';
import CustomButton from '../CustomButton/CustomButton';

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
        <CustomButton handleClick={toggleTheme}>
          <img src={logo} className="logo" alt="Vite logo" />
        </CustomButton>
      </div>
    </>
  );
}
