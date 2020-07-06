import React from 'react';
import { render, fireEvent, cleanup } from './test-utils';
import '@testing-library/jest-dom';
import App from '../containers/App';

afterEach(cleanup);

describe('App', () => {
  test('should renderi main app', () => {
    expect(render(<App />)).toMatchSnapshot();
  });

  test('should render services buttons', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('Services');
  });

  test('should render Landing page properly', () => {
    const { container } = render(<App />);
    expect(container.innerHTML).toMatch('Taking care of your loved ones.');
  });

  test('should render service page', () => {
    const { container, getByTestId } = render(<App />);
    fireEvent.click((getByTestId('ServiceButton')));
    expect(container.innerHTML).toMatch('Check the differents services tha we offer.');
  });
});
