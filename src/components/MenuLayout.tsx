import { useContext, type ReactNode } from 'react';
import ThemeButton from './ThemeButton/ThemeButton';
import { ThemeContext } from '../app/context';

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
      </header>
      <main>{children}</main>
    </div>
  );
}
