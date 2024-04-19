import React, { useState } from "react";
import api from "../api";

const Clicks = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);

    // Make an API request to save the new count
    api
      .post("/api/clicks/", {
        count: count + 1,
        // Add other attributes here, like author and created_at
      })
      .then((response) => console.log(response.data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="fit">
      <h1>Clicksers</h1>
      <button onClick={handleClick}>Click Me</button>
      <p>Number of Clicks: {count}</p>
    </div>
  );
};

export default Clicks;
