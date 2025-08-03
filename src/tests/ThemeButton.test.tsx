import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeContext } from '../app/context';
import ThemeButton from '../components/ThemeButton/ThemeButton';

type Theme = 'light' | 'dark';

const renderWithTheme = (
  theme: Theme,
  sendSearchUp: (theme: string) => void
) => {
  return render(
    <ThemeContext.Provider value={theme}>
      <ThemeButton sendSearchUp={sendSearchUp} />
    </ThemeContext.Provider>
  );
};

describe('ThemeButton', () => {
  const sendSearchUp = vi.fn();

  beforeEach(() => {
    sendSearchUp.mockClear();
  });

  it('renders moon logo and light-button class in light theme', () => {
    renderWithTheme('light', sendSearchUp);

    const img = screen.getByAltText('Vite logo');
    expect(img).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toHaveClass('light-button');
    expect(button.closest('div')).toHaveClass('light');
  });

  it('renders sun logo and dark-button class in dark theme', () => {
    renderWithTheme('dark', sendSearchUp);

    const img = screen.getByAltText('Vite logo');
    expect(img).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toHaveClass('dark-button');
    expect(button.closest('div')).toHaveClass('dark');
  });

  it('calls sendSearchUp with "dark" when toggling from light', async () => {
    renderWithTheme('light', sendSearchUp);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(sendSearchUp).toHaveBeenCalledTimes(1);
    expect(sendSearchUp).toHaveBeenCalledWith('dark');
  });

  it('calls sendSearchUp with "light" when toggling from dark', async () => {
    renderWithTheme('dark', sendSearchUp);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(sendSearchUp).toHaveBeenCalledTimes(1);
    expect(sendSearchUp).toHaveBeenCalledWith('light');
  });

  it('renders the image inside the button', () => {
    renderWithTheme('light', sendSearchUp);

    const img = screen.getByAltText('Vite logo');
    const button = screen.getByRole('button');

    expect(button).toContainElement(img);
  });
});
