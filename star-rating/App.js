// https://codesandbox.io/s/star-rating-lk3nv9

import { useState } from "react";

export default function StarRating() {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const isMarked = (index) => index < (hover || rating);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>RATING</h1>
      <div style={{ display: "flex" }}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => setRating(index + 1)}
            onMouseEnter={() => setHover(index + 1)}
            onMouseLeave={() => setHover(null)}
            style={{
              cursor: "pointer",
              fontSize: "300%",
              color: isMarked(index) ? "yellow" : "black"
            }}
          >
            {isMarked(index) ? <>&#9733;</> : <>&#9734;</>}
          </span>
        ))}
      </div>
    </div>
  );
}
