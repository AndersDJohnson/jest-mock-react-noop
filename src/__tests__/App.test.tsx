import * as React from "react";
import { render } from "@testing-library/react";
import { App } from "../App";

jest.mock("react", () =>
  // @ts-ignore
  require("..").default(jest.requireActual("react"))
);

describe("App", () => {
  test("works", () => {
    const { queryByTestId } = render(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument()
  });
});
