import * as React from "react";
import { render } from "@testing-library/react";
import { App } from "../App";

jest.mock("react", () =>
  // @ts-ignore
  require("..").default(/App/)
);

describe("App", () => {
  test("works", () => {
    const { debug, queryByTestId } = render(<App />);

    debug();

    expect(queryByTestId("other")).not.toBeInTheDocument()
  });
});
