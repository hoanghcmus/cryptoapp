import '../global.css';
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
