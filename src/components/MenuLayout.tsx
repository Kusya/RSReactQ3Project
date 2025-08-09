import { useContext, type ReactNode } from 'react';
import ThemeButton from './ThemeButton/ThemeButton';
import { ThemeContext } from '../app/context';
import { Link } from 'react-router-dom';

interface MenuLayoutComponentProps {
  children?: ReactNode;
  sendThemeUp: (data: string) => void;
}
export default function MenuLayout({
  children,
  ...props
}: MenuLayoutComponentProps) {
  const theme = useContext(ThemeContext);
  return (
    <div className={theme}>
      <header>
        <ThemeButton sendThemeUp={props.sendThemeUp} />
        <Link to="/about">About</Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
