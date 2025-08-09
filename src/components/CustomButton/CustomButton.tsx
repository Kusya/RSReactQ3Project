import { useContext, type ReactNode } from 'react';
import { ThemeContext } from './../../app/context';
import './CustomButton.css';

interface CustomButtonProps {
  children?: ReactNode;
  handleClick: () => void;
}

export default function CustomButton({
  children,
  ...props
}: CustomButtonProps) {
  const theme = useContext(ThemeContext);
  const onClick = () => {
    props.handleClick();
  };
  const btnClassName = theme + '-button';

  return (
    <button className={btnClassName} onClick={onClick}>
      {children}
    </button>
  );
}
