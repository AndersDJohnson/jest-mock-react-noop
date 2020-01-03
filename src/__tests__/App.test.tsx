import * as React from "react";
import { render } from "@testing-library/react";
import { App } from "../App";

jest.mock("react", () => ({
  ...jest.requireActual("react")
}));

describe("App", () => {
  test("works", () => {
    const { debug } = render(<App />);

    console.log(debug());
  });
});
