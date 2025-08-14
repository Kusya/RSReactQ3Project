import { useContext, type ReactNode } from 'react';
import ThemeButton from './ThemeButton/ThemeButton';
import { ThemeContext } from '../shared/context';
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
        <nav className="flex justify-end p-1">
          <ThemeButton sendThemeUp={props.sendThemeUp} />
          <Link to="/about" className="px-4">
            About
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
