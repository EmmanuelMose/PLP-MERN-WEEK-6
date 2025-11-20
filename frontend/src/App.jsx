import React, { lazy, Suspense } from "react";
const BugForm = lazy(() => import("./components/BugForm/BugForm"));
const BugList = lazy(() => import("./components/BugList/BugList"));
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Bug Tracker</h1>
        <BugForm onBugAdded={(bug) => console.log("New bug added", bug)} />
        <BugList />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
