import 'react-native';
import React from 'react';
import App from './App';

import { render } from '@testing-library/react-native';

it('App renders correctly', () => {
  const component = (
      <App />
  );

  render(component);

  expect(component).toBeDefined();
});
