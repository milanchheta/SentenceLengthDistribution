//file for input area

//import statements
import React, { useState } from "react";

//Function for input component
const InputField = ({ setOutputText, setOutputGraph, setProcessing }) => {
  const [input, setInput] = useState(""); //state to store input url
  const [error, setError] = useState(false);

  //action trigger on enter key
  const onEnter = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onSubmit(event);
    }
  };

  function validateURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return pattern.test(str);
  }

  //action for on submit
  const onSubmit = async (event) => {
    event.preventDefault();

    if (input.trim() !== "" && validateURL) {
      setProcessing(true);
      setError(false);
      setOutputGraph("");
      setOutputText("");
      //Check for cached results with current input url
      let cached_results = await fetch(
        "https://us-central1-milan-chheta.cloudfunctions.net/get_cache_results?inputURL=" +
          input,
        { mode: "cors" }
      );
      cached_results = JSON.parse(await cached_results.text());
      if (Object.keys(cached_results).length !== 0) {
        console.log("cached results are shown");
        setOutputGraph(cached_results["output_graph"]);
        setOutputText(cached_results["output_distribution"]);
        setProcessing(false);
      } else {
        let distribution_output = await fetch(
          "https://us-central1-milan-chheta.cloudfunctions.net/text_processing?inputURL=" +
            input,
          { mode: "cors" }
        );
        if (distribution_output.status === 200) {
          distribution_output = await distribution_output.text();
          setOutputText(JSON.parse(distribution_output));

          let graph_output = await fetch(
            "https://us-central1-milan-chheta.cloudfunctions.net/plot_graph",
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: distribution_output,
            }
          );

          if (graph_output.status === 200) {
            graph_output = await graph_output.text();
            let data = {
              input_url: input,
              output_distribution: JSON.parse(distribution_output),
              output_graph: graph_output,
            };
            setOutputGraph(graph_output);
            setProcessing(false);
            let set_cache_results = await fetch(
              "https://us-central1-milan-chheta.cloudfunctions.net/set_cache_results",
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            if (set_cache_results.status === 200) {
              console.log("cached");
            }
            console.log(set_cache_results.status);
          } else {
            setError(true);
            setProcessing(false);
          }
        } else {
          setError(true);
          setProcessing(false);
        }
      }
    } else {
      setOutputGraph("");
      setOutputText("");
      setError(true);
    }
  };
  return (
    <div className="InputField row  ">
      <div className="col">
        {error && (
          <span style={{ color: "red" }}>
            Error occured! Try another input url.
          </span>
        )}
        <div className="p-1 my-5 bg-light rounded rounded-pill shadow-sm mb-4 border border-primary mx-5">
          <div className="input-group p-1 ">
            <input
              type="text"
              placeholder="Enter a URL for text processing..."
              aria-describedby="button-addon1"
              className="form-control border-0 bg-light"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => onEnter(e)}
              id="inputURL"
              name="inputURL"
              list="egURL"
            />
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
