/* eslint-disable no-undef */

// Mock Native Module for api.test.ts
jest.mock('./src/native/CurrenciesModule', () => ({
    fetchAllCurrencies: jest.fn(),
}));

// Mock [Redux, React Query, Hook, EmptyState] for DemoScreen.test.tsx
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
    Provider: ({ children }) => children,
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

jest.mock('./src/state/hooks/app', () => ({
    ...jest.requireActual('./src/state/hooks/app'),
    useCurrencyList: jest.fn(),
}));

jest.mock('./src/components/EmptyState', () => () => <></>); // ✅ returns a functional component
