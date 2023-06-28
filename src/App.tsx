import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import ApplicationNavigator from './navigators/Application';
import { CountryProvider } from './services/CountryContext';
import ThemeContext from './services/ThemeContext';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';

return (
  <Provider store={store}>
    <ThemeContext.Provider value={theme}>
      <CountryProvider>
        <ApplicationNavigator />
      </CountryProvider>
      </ThemeContext.Provider>
      </Provider>
)};

export default App;
