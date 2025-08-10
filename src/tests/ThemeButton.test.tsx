import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeContext } from '../app/context';
import ThemeButton from '../components/ThemeButton/ThemeButton';

type Theme = 'light' | 'dark';

const renderWithTheme = (
  theme: Theme,
  sendThemeUp: (theme: string) => void
) => {
  return render(
    <ThemeContext.Provider value={theme}>
      <ThemeButton sendThemeUp={sendThemeUp} />
    </ThemeContext.Provider>
  );
};

describe('ThemeButton', () => {
  const sendThemeUp = vi.fn();

  beforeEach(() => {
    sendThemeUp.mockClear();
  });

  it('renders moon logo and light-button class in light theme', () => {
    renderWithTheme('light', sendThemeUp);

    const img = screen.getByAltText('Theme logo');
    expect(img).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toHaveClass('light-button');
    expect(button.closest('div')).toHaveClass('light');
  });

  it('renders sun logo and dark-button class in dark theme', () => {
    renderWithTheme('dark', sendThemeUp);

    const img = screen.getByAltText('Theme logo');
    expect(img).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toHaveClass('dark-button');
    expect(button.closest('div')).toHaveClass('dark');
  });

  it('calls sendSearchUp with "dark" when toggling from light', async () => {
    renderWithTheme('light', sendThemeUp);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(sendThemeUp).toHaveBeenCalledTimes(1);
    expect(sendThemeUp).toHaveBeenCalledWith('dark');
  });

  it('calls sendSearchUp with "light" when toggling from dark', async () => {
    renderWithTheme('dark', sendThemeUp);
    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(sendThemeUp).toHaveBeenCalledTimes(1);
    expect(sendThemeUp).toHaveBeenCalledWith('light');
  });

  it('renders the image inside the button', () => {
    renderWithTheme('light', sendThemeUp);

    const img = screen.getByAltText('Theme logo');
    const button = screen.getByRole('button');

    expect(button).toContainElement(img);
  });
});
