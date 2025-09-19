import { NativeModules, Platform } from "react-native";
import { fetchAllCurrencies } from "./api";

describe("fetchAllCurrencies", () => {
  it("returns mock data on iOS", async () => {
    Platform.OS = "ios";
    const data = await fetchAllCurrencies();
    expect(data.length).toBeGreaterThan(0);
  });

  it("calls native module on Android", async () => {
    Platform.OS = "android";
    NativeModules.CurrenciesModule = {
      fetchAllCurrencies: jest.fn().mockResolvedValue([{ id: "BTC" }]),
    };

    const data = await fetchAllCurrencies();
    expect(NativeModules.CurrenciesModule.fetchAllCurrencies).toHaveBeenCalled();
    expect(data[0].id).toBe("BTC");
  });
});
