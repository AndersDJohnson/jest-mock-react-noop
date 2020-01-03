import * as React from "react";
import getDisplayName from 'react-display-name';
import { ComponentClass, FC } from "react";

const makeNoop = (name: string) => {
  const noop = () => null;
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

export default jestMockReactNoop;
