import * as React from "react";
import getDisplayName from 'react-display-name';
import { ComponentClass, FC } from "react";
import {
  render,
  queries as reactQueries, Query, Queries, RenderOptions
} from "@testing-library/react";

const makeNoop = (name: string) => {
  const noop = () => <div data-jest-mock-react-noop={name} />;
  noop.displayName = name;
  return noop;
};

const jestMockReactNoop = (
  fn: string | RegExp | ((name: string, type: string | FC | ComponentClass) => boolean | undefined),
  react: typeof React = jest.requireActual("react")
) => ({
  ...react,
  createElement(...args: Parameters<typeof React.createElement>) {
    const type = args[0];
    const name = getDisplayName(type);
    if (typeof type !== 'string') {
      let matches;
      if (typeof fn === 'string') {
        matches = fn === name;
      } else if (fn instanceof RegExp) {
        matches = fn.test(name);
      } else if (typeof fn === 'function') {
        matches = fn(name, type);
      }
      if (!matches) {
        return react.createElement(makeNoop(name));
      }
    }
    return react.createElement(...args);
  }
});

const makeQueryByNoop = (container: HTMLElement) => (name: string) =>
  container.querySelector(`[data-jest-mock-react-noop="${name}"]`) as HTMLElement | null;

const makeQueryAllByNoop = (container: HTMLElement) => (name: string) =>
  Array.from(container.querySelectorAll(`[data-jest-mock-react-noop="${name}"]`) as NodeListOf<HTMLElement>);

const queryByNoop: Query = (container: HTMLElement, name: string) => makeQueryByNoop(container)(name);

const queryAllByNoop: Query = (container: HTMLElement, name: string) => makeQueryAllByNoop(container)(name);

const makeGetByNoop = (container: HTMLElement) => (name: string) => {
  const selector = `[data-jest-mock-react-noop="${name}"]`;
  const elements = container.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  if (elements?.length === 0) {
    throw new Error(`Unable to find an element by: ${selector}`)
  }
  if (elements?.length > 1) {
    throw new Error(`Found multiple elements by: ${selector}`)
  }
  return elements[0];
};

const makeGetAllByNoop = (container: HTMLElement) => (name: string) => {
  const selector = `[data-jest-mock-react-noop="${name}"]`;
  const elements = container.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  if (elements?.length === 0) {
    throw new Error(`Unable to find an element by: ${selector}`)
  }
  return Array.from(elements);
};

const getByNoop: Query = (container: HTMLElement, name: string) => makeGetByNoop(container)(name);

const getAllByNoop: Query = (container: HTMLElement, name: string) => makeGetAllByNoop(container)(name);

const noopQueries = {
  queryByNoop,
  queryAllByNoop,
  getByNoop,
  getAllByNoop
};

const noopQueriesWithDefaults = {
    ...reactQueries,
    ...noopQueries
};

type NoopQueries = typeof noopQueries;

type NoopQueriesWithDefaults = typeof noopQueriesWithDefaults;

const renderWithNoop = <Q extends Queries = typeof reactQueries>(ui: React.ReactElement, options?: RenderOptions<Q>) => render<Q & NoopQueries>(ui,
  {
    ...options,
      queries: {
          ...noopQueriesWithDefaults,
          ...(options ? options.queries : undefined),
      } as Q & NoopQueries
});

export { jestMockReactNoop, renderWithNoop, NoopQueries, NoopQueriesWithDefaults, noopQueries, noopQueriesWithDefaults };

export default jestMockReactNoop;
