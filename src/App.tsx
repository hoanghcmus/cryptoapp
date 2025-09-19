// global.css includes Tailwind directives; import it at runtime if available.
try {
  require('../global.css');
} catch (e) {
  // ignore in test environment where CSS imports are not handled
}

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DemoScreen from './activitys/DemoScreen';
import { persistor, store } from './state/store';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <DemoScreen />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
