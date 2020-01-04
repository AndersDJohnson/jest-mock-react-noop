import * as React from "react";

function Other() {
  return <div data-testid="other">Other!</div>;
}

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Other />
    </div>
  );
}

export { App, Other };
