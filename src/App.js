import { useState } from "react";
import "./App.css";
import Calculator from "./Components/Calculator/Calculator";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [result, setResult] = useState("");
  return (
    <div className="App">
      <Navbar result={result} />
      <div className="calculator">
        <Calculator result={result} setResult={setResult} />
      </div>
    </div>
  );
}

export default App;
