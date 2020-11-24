import React, { useState } from "react";

import OutputArea from "./components/OutputArea";
import InputField from "./components/InputField";

function App() {
  const [outputText, setOutputText] = useState("");
  const [outputGrpah, setOutputGraph] = useState("");
  const [processing, setProcessing] = useState(false);

  return (
    <div className="App container-fluid d-flex h-100 flex-column">
      <InputField
        setOutputText={setOutputText}
        setOutputGraph={setOutputGraph}
        setProcessing={setProcessing}
      />
      <OutputArea
        outputText={outputText}
        processing={processing}
        outputGrpah={outputGrpah}
      />
    </div>
  );
}

export default App;
