# jest-mock-react-noop
# ⚛️:construction::goat:

Mock React components to noops with Jest.

This helps emulate shallow rendering you remember from [`enzyme`](https://airbnb.io/enzyme/)
but with [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro) instead.

You can use [`jest.mock`](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options)
to re-define `react`, providing an argument indicating which component(s) to target.
Any component not targeted will be replaced with
one that returns a placeholder `div`.
The argument can be a string or regex matched against the component
display name, or else a function that receives two arguments:
the component display name,
and the component function/constructor or tag name string.

You can query for placeholder `div`s using the following query functions
(similar to [`@testing-library`'s query functions](https://testing-library.com/docs/dom-testing-library/api-queries) functions):
* `getByNoop`
* `getAllByNoop`
* `queryByNoop`
* `queryAllByNoop`

```tsx
import "@testing-library/jest-dom";
import * as React from "react";
import { renderWithNoop } from "jest-mock-react-noop";
import { App } from "../App";

jest.mock("react", () =>
  require("jest-mock-react-noop").default('App')
);

describe("App", () => {
  test("works", () => {
    const { queryByNoop } = renderWithNoop(<App />);

    // Assert that a nested component is rendered only as a noop.
    expect(queryByNoop('Other')).toBeInTheDocument();
  });
});
```

You can match components by name with string:

```ts
require("jest-mock-react-noop").default('App')
```

Or with regular expression:

```ts
require("jest-mock-react-noop").default(/App/)
```

Or with a function returning a `boolean` (which also gives you access to the component constructor):

```ts
require("jest-mock-react-noop").default(
  // `name` is the component name/string
  // `type` is the function/constructor or tag name string
  (name, type) => return ['App', 'MyComponent'].includes(name)
)
```

If you prefer to configure `queries` manually and use the native `render` instead of our `renderWithNoop`,
you can import either `noopQueries` (with type `NoopQueries`) or `noopQueriesWithDefaults` (with type and `NoopQueriesWithDefaults`, which includes the defaults from `@testing-library/react`).

```tsx
import { render, queries } from "@testing-library/react";
import { noopQueries, NoopQueriesWithDefaults} from "..";

describe("App", () => {
  test("works", () => {
    const { queryByNoop, queryByTestId } = render<NoopQueriesWithDefaults>(<App />, {
      queries: {
        ...queries,
        ...noopQueries
      }
    });
  });
});
```

```tsx
import { render } from "@testing-library/react";
import { noopQueriesWithDefaults, NoopQueriesWithDefaults} from "..";

describe("App", () => {
  test("works", () => {
    const { queryByNoop, queryByTestId } = render<NoopQueriesWithDefaults>(<App />, {
      queries: noopQueriesWithDefaults
    });
  });
});
```
