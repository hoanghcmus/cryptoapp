import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";
import { Currency } from "../../data-types/crypto";


export interface Spec extends TurboModule {
  fetchAllCurrencies(): Promise<Currency[]>;
}

// 👇 This enforces type-safe access to the module
export default TurboModuleRegistry.getEnforcing<Spec>("CurrenciesModule");
