import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ControlledForm from './../components/ControlledForm';
import { renderWithProviders } from './testUtills';
import { server } from './mock/server';

describe('ControlledForm integration', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('submits valid form data and updates Redux store', async () => {
    renderWithProviders(<ControlledForm onClose={() => {}} />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/enter your name/i), 'Alice');
    await user.type(screen.getByPlaceholderText(/enter your age/i), '30');
    await user.type(
      screen.getByPlaceholderText(/enter email/i),
      'alice@mail.com'
    );
    await user.type(
      screen.getByPlaceholderText(/^enter password$/i),
      'Password1!'
    );
    await user.type(
      screen.getByPlaceholderText(/enter the same password/i),
      'Password1!'
    );
    await user.click(screen.getByLabelText(/female/i));
    await user.click(screen.getByLabelText(/accept terms/i));
    await waitFor(() => {
      expect(screen.getByLabelText(/country:/i)).toBeInTheDocument();
    });

    await user.type(screen.getByLabelText(/country:/i), 'Belarus');
    await user.click(screen.getByRole('button', { name: /submit/i }));
  });

  it('renders validation errors when submitting empty form', async () => {
    renderWithProviders(<ControlledForm onClose={() => {}} />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findAllByText(/required/i)).not.toHaveLength(0);
  });
});
