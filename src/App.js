import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { ApiService } from "./api";

function App() {
  const inputRef = useRef(null);
  const [state, setThisState] = useState({
    inputVal: "",
    historyData: [],
  });
  const setState = (nv) => setThisState((ov) => ({ ...ov, ...nv }));

  const loadHistory = () => {
    ApiService.get("/io")
      .then((res) => {
        console.log("res", res);
        setState({ historyData: res });
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(() => {
    loadHistory();
  }, []);

  const onSubmit = () => {
    let error;
    console.log("val => ", state.inputVal);
    if (!state.inputVal) error = "Required";

    setState({ error });
    if (!error) {
      // Post to backend
      ApiService.post("/io", { inputVal: state.inputVal })
        .then((res) => {
          console.log("res", res);
          setState({ inputVal: "" });
          inputRef.current.value = "";
          loadHistory();
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };
  return (
    <div className="App width-control">
      <div className="flex-col">
        <label>Enter your password</label>
        <br />
        <input
          ref={inputRef}
          type="text"
          value={state.inputval}
          onChange={(e) => {
            setState({ inputVal: e.target.value, error: null });
          }}
        />
        {state.error && (
          <p style={{ display: "contents", margin: 0, color: "red" }}>
            Enter valid input
          </p>
        )}
        <br />
        <button onClick={() => onSubmit()}>Submit</button>
        <br />
        <br />
        <br />
        <div>History</div>
        {state.historyData.map((hD, i) => {
          return (
            <div>
              {i + 1}. input:{hD.input}
              <br />
              output:{hD.output},
              <br />
              createdAt:{new Date(hD.created_at).toDateString()}
              <br />
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
