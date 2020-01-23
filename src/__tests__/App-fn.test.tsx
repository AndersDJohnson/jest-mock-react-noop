import * as React from "react";
import { renderWithNoop } from "..";
import { App } from "../App";

jest.mock("react", () => ({
    ...jest.requireActual('react'),
  createElement: jest.fn()
}));

// @ts-ignore
React.createElement.mockImplementation(require('..').default(name => name === 'App').createElement);

describe("App", () => {
  test("works", () => {
    const { queryByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    expect(queryByNoop( 'Other')).toBeInTheDocument();
  });
});
