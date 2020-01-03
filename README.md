# jest-mock-react-noop

Mock React components to noops with Jest.

This helps emulate shallow rendering you remember from `enzyme`
but with `@testing-library/react` instead.

You can use `jest.mock` to re-define `react`,
providing an argument indicating which component(s)
to target.
Any component not targeted will be replaced with
one that returns `null`.
The argument can be a string or regex matched against the component
display name, or else a function that receives two arguments:
the component display name,
and the component function/constructor or tag name string.

```tsx
import * as React from "react";
import { render } from "@testing-library/react";
import { App } from "../App";

jest.mock("react", () =>
  require("jest-mock-react-noop").default('App')
);

describe("App", () => {
  test("works", () => {
    const { debug } = render(<App />);

    debug();
  });
});
```

```ts
require("jest-mock-react-noop").default(/App/)
```

```ts
require("jest-mock-react-noop").default(
  // `name` is the component name/string
  // `type` is the function/constructor or tag name string
  (name, type) => return ['App', 'MyComponent'].includes(name)
)
```
