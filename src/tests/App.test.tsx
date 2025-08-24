import { screen, fireEvent } from '@testing-library/react';
import App from './../App';
import { renderWithProviders } from './testUtills';

beforeEach(() => {
  const portalRoot = document.createElement('div');
  portalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(portalRoot);
});

// Clean up after each test
afterEach(() => {
  const portalRoot = document.getElementById('modal-root');
  if (portalRoot) {
    document.body.removeChild(portalRoot);
  }
});
describe('App Component', () => {
  test('renders both buttons and UserGrid', () => {
    renderWithProviders(<App />);
    expect(screen.getByText('Authorize Controlled')).toBeInTheDocument();
    expect(screen.getByText('Authorize Uncontrolled')).toBeInTheDocument();
    expect(screen.getByTestId('user-grid')).toBeInTheDocument();
  });

  test.skip('opens controlled modal when "Authorize Controlled" is clicked', () => {
    renderWithProviders(<App />);
    fireEvent.click(screen.getByText('Authorize Controlled'));
    expect(screen.getByTestId('modal')).toHaveTextContent('Controlled');
  });

  test.skip('opens uncontrolled modal when "Authorize Uncontrolled" is clicked', () => {
    renderWithProviders(<App />);
    fireEvent.click(screen.getByText('Authorize Uncontrolled'));
    expect(screen.getByTestId('modal')).toHaveTextContent('Uncontrolled');
  });

  test.skip('closes modal when "Close" button is clicked', () => {
    renderWithProviders(<App />);
    fireEvent.click(screen.getByText('Authorize Controlled'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
