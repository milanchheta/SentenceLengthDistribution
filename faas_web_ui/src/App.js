//Entry file for frontend

//import statements
import React, { useState } from "react";
import OutputArea from "./components/OutputArea";
import InputField from "./components/InputField";

//Entry funtion for frontend
function App() {
  const [outputText, setOutputText] = useState(""); //state for output distribution text
  const [outputGraph, setOutputGraph] = useState(""); //state for output distribution graph
  const [processing, setProcessing] = useState(false);

  return (
    <div className="App container-fluid d-flex h-100 flex-column">
      {/* component for input */}
      <InputField
        setOutputText={setOutputText}
        setOutputGraph={setOutputGraph}
        setProcessing={setProcessing}
      />

      {/* component for output */}
      <OutputArea
        outputText={outputText}
        processing={processing}
        outputGraph={outputGraph}
      />
    </div>
  );
}

export default App;
