import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

test('ErrorBoundary render with some content', () => {
  render(
    <ErrorBoundary>
      <div>Some content</div>
    </ErrorBoundary>
  );
  expect(screen.getByText('Some content')).toBeInTheDocument();
});

test('ErrorBoundary render with error', () => {
  const ComponentWithError = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary>
      <ComponentWithError />
    </ErrorBoundary>
  );
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
