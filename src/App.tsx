// global.css includes Tailwind directives; import it at runtime if available.
try {
  require('../global.css');
} catch (e) {
  // ignore in test environment where CSS imports are not handled
}

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DemoScreen from './activitys/DemoScreen';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DemoScreen />
    </QueryClientProvider>
  );
};

export default App;
