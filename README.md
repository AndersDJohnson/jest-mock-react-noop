# jest-mock-react-noop

```tsx
import * as React from "react";
import { render } from "@testing-library/react";
import { App } from "../App";

jest.mock("react", () =>
  // @ts-ignore
  require("jest-mock-react-noop").default(
    jest.requireActual("react"),
    'App'
  )
);

describe("App", () => {
  test("works", () => {
    const { debug } = render(<App />);

    console.log(debug());
  });
});
```

```ts
require("jest-mock-react-noop").default(
  jest.requireActual("react"),
  /App/
)
```

```ts
require("jest-mock-react-noop").default(
  jest.requireActual("react"),
  // `name` is the component name/string
  // `type` is the function/constructor or tag name string
  (name, type) => return ['App', '
)
```
