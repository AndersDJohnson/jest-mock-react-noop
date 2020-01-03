# jest-mock-react-noop

```tsx
import * as React from "react";
import { render } from "@testing-library/react";
import { App } from "../App";

jest.mock("react", () =>
  // @ts-ignore
  require("jest-mock-react-noop").default(jest.requireActual("react"))
);

describe("App", () => {
  test("works", () => {
    const { debug } = render(<App />);

    console.log(debug());
  });
});
```
