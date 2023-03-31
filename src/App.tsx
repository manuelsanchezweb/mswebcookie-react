import "./App.css";
import Cookie from "./assets/components/Cookie";
import Debug from "./assets/components/Debug";

function App() {
  return (
    <div className="App">
      <h1>Cookie Banner with React and TypeScript</h1>
      <Cookie />
      <Debug open={true} />
    </div>
  );
}

export default App;
