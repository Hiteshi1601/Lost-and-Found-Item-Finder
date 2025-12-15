import React from "react";
import { useLocation } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();

  if (!state) return <h2 style={{ textAlign: "center" }}>No result available</h2>;

  return (
    <div
      style={{
        padding: 40,
        textAlign: "center",          // <<--- everything centered
      }}
    >
      <h2>Comparison Result</h2>

      {/* Image section centered */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 60,
          marginTop: 30,
        }}
      >
        <div>
          <h3>User Image</h3>
          <img
            src={state.userPreview}
            alt="User"
            style={{ width: 200, borderRadius: 10 }}
          />
        </div>

        <div>
          <h3>CCTV Image</h3>
          <img
            src={state.cctvPreview}
            alt="CCTV"
            style={{ width: 200, borderRadius: 10 }}
          />
        </div>
      </div>

      <h3 style={{ marginTop: 30 }}>
        Similarity: <span>{state.similarity}</span>
      </h3>

      <h2 style={{ color: state.matched ? "green" : "red" }}>
        {state.matched ? "Matched ✔" : "Not Matched ✘"}
      </h2>
    </div>
  );
}