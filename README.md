# jest-mock-react-noop

Mock React components to noops with Jest.

This helps emulate shallow rendering you remember from `enzyme`
but with `@testing-library/react` instead.

You can use `jest.mock` to re-define `react`,
providing the original implementation as well
as an argument indicating which component(s)
to target.
Any component not targeted will be replaced with
one that returns `null`.

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
