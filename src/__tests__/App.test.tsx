import * as React from "react";
import { render, queries } from "@testing-library/react";
import { noopQueriesWithDefaults, noopQueries, renderWithNoop, NoopQueriesWithDefaults} from "..";
import { App } from "../App";

jest.mock("react", () => ({
    ...jest.requireActual('react'),
  createElement: jest.fn()
}));

// @ts-ignore
React.createElement.mockImplementation(require('..').default('App').createElement);

describe("App", () => {
  test("works with custom queries", () => {
    const { queryByNoop, queryByTestId } = render<NoopQueriesWithDefaults>(<App />, {
      queries: {
          ...queries,
          ...noopQueries
      }
    });

    expect(queryByTestId("other")).not.toBeInTheDocument();
    expect(queryByNoop('Other')).toBeInTheDocument();
  });

  test("works with custom queries with defaults", () => {
    const { queryByNoop, queryByTestId } = render<NoopQueriesWithDefaults>(<App />, {
      queries: noopQueriesWithDefaults
    });

    expect(queryByTestId("other")).not.toBeInTheDocument();
    expect(queryByNoop('Other')).toBeInTheDocument();
  });

  test("works with render wrap", () => {
    const { queryByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    expect(queryByNoop('Other')).toBeInTheDocument();
  });

  test("works with query not found", () => {
    const { queryByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    const queried = queryByNoop('Nope');
    expect(queried).toBeNull();
  });

  test("works with queryAll", () => {
    const { queryAllByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    const queried = queryAllByNoop('Other');
    expect(Array.isArray(queried) ? queried[0] : null).toBeInTheDocument();
  });

  test("works with queryAll not found", () => {
    const { queryAllByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    const queried = queryAllByNoop('Nope');
    expect(queried).toHaveLength(0);
  });

  test("works with getAll", () => {
    const { queryAllByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    const queried = queryAllByNoop('Other');
    expect(queried).toHaveLength(1);
  });

  test("throws with getAll not found", () => {
    const { getAllByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    expect(() => {
      getAllByNoop('Nope');
    }).toThrow('oop');
  });

  test("works with", () => {
    const { getByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    const queried = getByNoop('Other');
    expect(queried).toBeInTheDocument();
  });

  test("throws with get not found", () => {
    const { getByNoop, queryByTestId } = renderWithNoop(<App />);

    expect(queryByTestId("other")).not.toBeInTheDocument();
    expect(() => {
      getByNoop('Nope');
    }).toThrow('oop');
  });
});
