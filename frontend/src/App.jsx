import BugForm from "./components/BugForm";
import BugList from "./components/BugList";
import ErrorBoundary from "./components/ErrorBoundary";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <ErrorBoundary>
      <h1>Bug Tracker</h1>
      <BugForm onBugAdded={() => setRefresh(!refresh)} />
      <BugList key={refresh} />
    </ErrorBoundary>
  );
}

export default App;
