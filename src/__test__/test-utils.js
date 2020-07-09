import React from 'react';
import { render as rtlRender } from '@testing-library/react'; // eslint-disable-line import/no-extraneous-dependencies
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../reducers';

function render(
  ui,
  {
    store = createStore(allReducers),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) { // eslint-disable-line react/prop-types
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react'; // eslint-disable-line import/no-extraneous-dependencies

export { render };
