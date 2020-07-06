import React from 'react';
import axios from 'axios';
import {
  render, fireEvent, cleanup, screen, waitForElement,
} from './test-utils';
import '@testing-library/jest-dom';
import App from '../containers/App';

afterEach(cleanup);

describe('Sign in', () => {
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

  test('should render sign in page', () => {
    const { container, getByTestId } = render(<App />);
    fireEvent.click((getByTestId('ServiceButton')));
    fireEvent.click((getByTestId('signin')));
    expect(container.innerHTML).toMatch('Access your account to request and manage your appointments.');
  });

  test('should render empty field validation error', () => {
    const { container, getByTestId } = render(<App />);
    fireEvent.click((getByTestId('signin')));
    fireEvent.click((getByTestId('SubmitLoginButton')));
    expect(container.innerHTML).toMatch('empty field');
  });

  test('should render dashboard after sign in', async () => {
    const { getByTestId, getByText } = render(<App />);
    fireEvent.click((getByTestId('signin')));
    const inputNode = screen.getByLabelText('Email address');
    const inputNodep = screen.getByLabelText('Password');
    fireEvent.change(inputNode, { target: { value: 'm@m.com' } });
    fireEvent.change(inputNodep, { target: { value: '123456' } });
    fireEvent.click((getByTestId('SubmitLoginButton')));

    const dashboard = await waitForElement(() => getByText('Welcome'));
    expect(dashboard.innerHTML).toMatch('Welcome');
  });
});
