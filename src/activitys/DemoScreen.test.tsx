import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import DemoScreen from "./DemoScreen";

const mockStore = configureStore([]);


describe("DemoScreen", () => {
  it("renders title correctly", () => {
    const store = mockStore({ app: { currencies: [] } });
    render(
      <Provider store={store}>
        <DemoScreen />
      </Provider>
    );

    expect(screen.getByText("Currencies")).toBeTruthy();
  });

  it("updates search text", () => {
    const store = mockStore({ app: { currencies: [] } });
    render(
      <Provider store={store}>
        <DemoScreen />
      </Provider>
    );

    fireEvent.changeText(
      screen.getByPlaceholderText("Search currency or symbol"),
      "Bitcoin"
    );

    expect(screen.getByDisplayValue("Bitcoin")).toBeTruthy();
  });
});
