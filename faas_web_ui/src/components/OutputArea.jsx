import React from "react";
import ReactLoading from "react-loading";
import "./style.css";
const OutputArea = ({ outputText, outputGrpah, processing }) => {
  console.log(processing);
  return (
    <div className="OutputArea  mx-auto">
      {(processing || outputGrpah) && (
        <>
          <div className="row">
            <div className="col">
              <h2>Graphical Output - Histogram</h2>
            </div>
          </div>

          {outputGrpah ? (
            <>
              <div className="row">
                <div className="col">
                  <div
                    className="col float-left"
                    style={{ width: "800px" }}
                    dangerouslySetInnerHTML={{ __html: outputGrpah }}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="row ">
              <div className="col m-auto">
                <ReactLoading
                  type="spin"
                  className="m-auto"
                  color="#00aaff"
                  height={100}
                  width={100}
                />
              </div>
            </div>
          )}
        </>
      )}

      {(processing || outputText) && (
        <>
          <div className="row mt-5">
            <div className="col">
              <h2>Tabular Output</h2>
            </div>
          </div>
          {outputText ? (
            <div className="row ">
              <div className="col">
                <table>
                  <thead>
                    <tr>
                      <th>Length of Sentences</th>
                      <th>Frequency of lengths</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(outputText).map((key, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{key}</td>
                          <td>{outputText[key]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="row ">
              <div className="col">
                <ReactLoading
                  className="m-auto"
                  type="spin"
                  color="#00aaff"
                  height={100}
                  width={100}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OutputArea;
