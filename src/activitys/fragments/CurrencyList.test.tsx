import React from "react";
import { render, screen } from "@testing-library/react-native";
import CurrencyList from "./CurrencyList";

describe("CurrencyList", () => {
  it("renders currencies", () => {
    const currencies = [
      { id: "BTC", name: "Bitcoin", symbol: "BTC" },
      { id: "ETH", name: "Ethereum", symbol: "ETH" },
    ];

    render(<CurrencyList currencies={currencies} />);

    expect(screen.getByText("Bitcoin")).toBeTruthy();
    expect(screen.getByText("Ethereum")).toBeTruthy();
  });
});
