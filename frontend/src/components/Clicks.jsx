import React, { useState } from "react";

const Clicks = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);

    // Make an API request to save the new count
    fetch("/api/clicks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        count: count + 1,
        // Add other attributes here, like author and created_at
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
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
