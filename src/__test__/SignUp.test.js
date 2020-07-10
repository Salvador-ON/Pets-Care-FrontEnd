import React from 'react';
import axios from 'axios';
import {
  render, fireEvent, cleanup, screen, waitForElement,
} from './test-utils';
import '@testing-library/jest-dom';
import App from '../containers/App';

afterEach(cleanup);

describe('Sign up', () => {
  axios.post.mockResolvedValueOnce({
    data: {
      logged_in: 'LOGGED_IN',
      user: {
        name: 'Jhon',
        role: 'admin',
        id: '1',
      },
    },
  });

  axios.get.mockResolvedValueOnce({
    data: {
      logged_in: 'LOGGED_IN',
      user: {
        name: 'Jhon',
        role: 'admin',
      },
    },
  });

  test('should render sign up page', () => {
    const { container, getByTestId } = render(<App />);
    fireEvent.click((getByTestId('ServiceButton')));
    fireEvent.click((getByTestId('signup')));
    expect(container.innerHTML).toMatch('Create your account to request and manage your appointments.');
  });

  test('should render empty field validation error', () => {
    const { container, getByTestId } = render(<App />);
    fireEvent.click((getByTestId('signup')));
    fireEvent.click((getByTestId('SubmitSignButton')));
    expect(container.innerHTML).toMatch('empty field');
  });

  test('should render dashboard after signup', async () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click((getByTestId('signup')));
    const inputNode = screen.getByLabelText('Email address');
    const inputNoden = screen.getByLabelText('Name');
    const inputNodep = screen.getByLabelText('Password');
    const inputNodepc = screen.getByLabelText('Password Confirmation');
    const inputNodepph = screen.getByLabelText('Phone');
    fireEvent.change(inputNode, { target: { value: 'm@m.com' } });
    fireEvent.change(inputNodep, { target: { value: '123456' } });
    fireEvent.change(inputNodepc, { target: { value: '123456' } });
    fireEvent.change(inputNoden, { target: { value: 'jhon' } });
    fireEvent.change(inputNodepph, { target: { value: '12345678' } });
    fireEvent.click((getByTestId('SubmitSignButton')));

    const dashboard = await waitForElement(() => getByText('Welcome'));
    expect(dashboard.innerHTML).toMatch('Welcome');
  });
});
