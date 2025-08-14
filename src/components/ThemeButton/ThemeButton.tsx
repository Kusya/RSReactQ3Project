import { useContext } from 'react';
import { ThemeContext } from './../../shared/context';
import sunLogo from './../../assets/sun-icon.svg';
import moonLogo from './../../assets/moon-icon.svg';
import CustomButton from '../CustomButton/CustomButton';

interface ThemeButtonProps {
  sendThemeUp: (data: string) => void;
}

export default function ThemeButton(props: ThemeButtonProps) {
  const theme = useContext(ThemeContext);
  const toggleTheme = () => {
    const toggled = theme == 'dark' ? 'light' : 'dark';
    props.sendThemeUp(toggled);
  };
  const logo = theme == 'dark' ? sunLogo : moonLogo;

  return (
    <>
      <div className={theme}>
        <CustomButton handleClick={toggleTheme}>
          <img src={logo} className="logo" alt="Theme logo" />
        </CustomButton>
      </div>
    </>
  );
}
