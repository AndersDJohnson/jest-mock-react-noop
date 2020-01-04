import * as React from "react";
import { render } from "@testing-library/react";
import { queryByNoop, makeQueryByNoop } from "..";
import { App } from "../App";

jest.mock("react", () => ({
    ...jest.requireActual('react'),
  createElement: jest.fn()
}));

// @ts-ignore
React.createElement.mockImplementation(require('..').default('App').createElement);

describe("App", () => {
  test("works", () => {
    const { debug, container, queryByTestId } = render(<App />);
    const myQueryByNoop = makeQueryByNoop(container);

    debug();

    expect(queryByTestId("other")).not.toBeInTheDocument();
    expect(queryByNoop(container, 'Other')).toBeInTheDocument();
    expect(myQueryByNoop('Other')).toBeInTheDocument();
  });
});
