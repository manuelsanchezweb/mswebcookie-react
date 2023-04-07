import "./App.css";
import Cookie from "./assets/components/Cookie";
import Debug from "./assets/components/Debug";

function App() {
  return (
    <div className="page">
      <h1 className="page-title">Cookie Banner with React and TypeScript</h1>
      <Cookie />
      <Debug />
    </div>
  );
}

export default App;
