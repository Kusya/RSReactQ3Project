import { render, screen } from '@testing-library/react';
import Search from './Search';

test('Search render field and button, and error button', () => {
  render(<Search sendSearchUp={() => {}} />);
  const searchElement = screen.getByRole('button', { name: /Search/i });
  const errorBtnElement = screen.getByRole('button', { name: /Error button/i });

  expect(searchElement).toBeDefined();
  expect(errorBtnElement).toBeDefined();
  expect(searchElement).not.toBeDisabled();

  expect(searchElement.getAttribute('disabled')).toBeNull();
  expect(errorBtnElement.getAttribute('disabled')).toBeNull();
});
