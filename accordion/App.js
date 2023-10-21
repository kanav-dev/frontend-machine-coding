import { useState } from "react";
import faqData from "./data";

export default function Accordion() {
  const [activeState, setActiveState] = useState({});
  const [isMultipleOpen, setIsMultipleOpen] = useState(true);

  const handleClick = (id) => {
    setActiveState((prevActiveState) => ({
      ...(isMultipleOpen && prevActiveState),
      [id]: !prevActiveState[id]
    }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Accordion</h1>
      <input
        type="checkbox"
        id="multipleOpen"
        onChange={(e) => setIsMultipleOpen(e.target.checked)}
        checked={isMultipleOpen}
        style={{ marginBottom: "30px" }}
      />
      <label htmlFor="multipleOpen">Is multiple open accordion allowed?</label>
      <div style={{ width: "80%", margin: "auto" }}>
        {faqData.map(({ id, que, ans }) => (
          <div
            key={id}
            style={{
              border: "1px solid black",
              padding: "10px 20px",
              marginBottom: "20px",
              textAlign: "left"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <b>{que}</b>
              <div
                onClick={() => handleClick(id)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "grey",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <b>{activeState[id] ? "-" : "+"}</b>
              </div>
            </div>
            {activeState[id] && (
              <p style={{ marginTop: "15px", marginBottom: "10px" }}>{ans}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
