
import "@testing-library/jest-native/extend-expect";

import { NativeModules } from "react-native";

// Mock your TurboModule
NativeModules.CurrenciesModule = {
    /* eslint-env jest */
    fetchAllCurrencies: jest.fn(() =>
        Promise.resolve([{ code: "USD", name: "US Dollar" }])
    ),
};
