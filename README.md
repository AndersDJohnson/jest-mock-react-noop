# jest-mock-react-noop

> Mock React components to noops with Jest.

⚛️:construction::goat:

Remember shallow rendering from [`enzyme`](https://airbnb.io/enzyme/)?
Wish you could have it with [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro)?
Now you can!

Use [`jest.mock`](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options)
to re-define `react`, providing `jest-mock-react-noop` with an argument indicating the component(s) under test.
Any component not under test will be replaced with one that returns a placeholder empty `div`
with a `data-jest-mock-react-noop` attribute whose value is that component's name.

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

Sometimes `jest.mock` as above won't work, e.g., with `ts-jest` you might get this error:

```
TypeError: require(...).default is not a function
```

If so, you can try this:

```ts
jest.mock("react", () => ({
  ...jest.requireActual('react'),
createElement: jest.fn()
}));

// @ts-ignore
React.createElement.mockImplementation(require('jest-mock-react-noop').default('App').createElement);
```
