import React, { useState } from "react";

const InputField = ({ setOutputText, setOutputGraph, setProcessing }) => {
  const [input, setInput] = useState("");

  const onEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onSubmit(event);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    fetch(
      "https://us-central1-milan-chheta.cloudfunctions.net/text_processing?inputURL=" +
        input,
      { mode: "cors" }
    )
      .then(function (response) {
        return response.text();
      })
      .then(function (text) {
        setOutputText(JSON.parse(text));
        fetch(
          "https://us-central1-milan-chheta.cloudfunctions.net/plot_graph",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: text,
          }
        )
          .then(function (response) {
            return response.text();
          })
          .then(function (text) {
            setOutputGraph(text);
            setProcessing(false);
          })
          .catch(function (error) {
            setProcessing(false);
            console.log("Request failed", error);
          });
      })
      .catch(function (error) {
        setProcessing(false);
        console.log("Request failed", error);
      });
  };
  return (
    <div className="InputField row  ">
      <div className="col">
        <h2>Enter a URL for text processing:</h2>

        <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4 border border-primary">
          <div className="input-group p-1 ">
            <input
              type="input"
              placeholder="What're you searching for?"
              aria-describedby="button-addon1"
              className="form-control border-0 bg-light"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => onEnter(e)}
              id="inputURL"
              name="inputURL"
              list="egURL"
            />{" "}
            <datalist id="egURL" className="bg-light">
              <option value="http://www.gutenberg.org/files/63677/63677-0.txt" />
              <option value="http://www.gutenberg.org/files/63675/63675-0.txt" />
              <option value="http://www.gutenberg.org/files/63669/63669-0.txt" />
              <option value="http://www.gutenberg.org/files/63663/63663-0.txt" />
            </datalist>
            <div className="input-group-append">
              <button
                id="button-addon1"
                type="submit"
                className="btn btn-link text-primary"
                onClick={(e) => onSubmit(e)}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputField;
